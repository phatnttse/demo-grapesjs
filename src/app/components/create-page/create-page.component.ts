import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-tailwind';
import { GrapesJsService } from '../../services/grapesjs.service';
import { Router } from '@angular/router';
import { Page } from '../../models/page.model';

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
})
export class CreatePageComponent implements OnInit {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;

  editor: any;

  constructor(
    private grapesjsService: GrapesJsService,
    private router: Router
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
  }

  createPage() {
    const data = this.editor.getHtml();
    const page: Page = {
      id: Math.random().toString(),
      title: 'New Page - ' + Math.random(),
      content: data,
    };
    this.grapesjsService.createPage(page);
    this.router.navigate(['']);
  }
}
