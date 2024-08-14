import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrapesJsService } from '../../services/grapesjs.service';

@Component({
  selector: 'app-view-demo',
  standalone: true,
  imports: [],
  templateUrl: './view-demo.component.html',
  styleUrl: './view-demo.component.scss',
})
export class ViewDemoComponent implements OnInit {
  pageId: string | null = null;
  page: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private grapesjsService: GrapesJsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pageId = params.get('id');
      if (this.pageId) {
        this.loadPage(this.pageId);
      }
    });
  }
  loadPage(id: string): void {
    const page = this.grapesjsService.getPageById(id);
    if (page) {
      this.page = page.content;
    }
  }
}
