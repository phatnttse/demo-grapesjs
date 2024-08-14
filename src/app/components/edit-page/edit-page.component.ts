import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GrapesJsService } from '../../services/grapesjs.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import grapesjs from 'grapesjs';
import 'grapesjs-tailwind';
import { Page } from '../../models/page.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent implements OnInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  editor: any;
  pageId: string | null = null;
  page: Page | null = null;

  constructor(
    private grapesjsService: GrapesJsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editor = grapesjs.init({
      container: this.editorContainer.nativeElement,
      plugins: ['grapesjs-tailwind'],
      pluginsOpts: {
        'grapesjs-tailwind': {
          /* plugin options */
        },
      },
      fromElement: true,
      height: '100%',
      width: 'auto',
      storageManager: false,
    });

    this.editor.BlockManager.add('f2-svg', {
      label: 'Custom-Logo-F2',
      content: `<div class="logo"><a routerlink="/" href="/"><img src="http://f2tech.asia/assets/images/logo-F2.png" alt="Logo F2 tech"></a></div>`,
      category: 'Custom',
    });

    this.route.paramMap.subscribe((params) => {
      this.pageId = params.get('id');
      if (this.pageId) {
        this.loadPage(this.pageId);
      }
    });
  }

  savePage(): void {
    const updatedPage: Page = {
      id: this.pageId || Math.random().toString(),
      title: this.page?.title || 'New Page - ' + Math.random(),
      content: this.editor.getHtml(),
    };
    const pages = JSON.parse(localStorage.getItem('pages') || '[]');
    const pageIndex = pages.findIndex(
      (page: any) => page.id === updatedPage.id
    );

    if (pageIndex !== -1) {
      pages[pageIndex] = updatedPage;
    } else {
      pages.push(updatedPage);
    }
    localStorage.setItem('pages', JSON.stringify(pages));
    this.toastr.success('Success', 'Page saved successfully', {
      timeOut: 3000,
      progressBar: true,
    });
  }

  loadPage(id: string): void {
    debugger;
    const page = this.grapesjsService.getPageById(id);
    if (page) {
      this.page = page;
      this.editor.setComponents(page.content);
    }
  }
}
