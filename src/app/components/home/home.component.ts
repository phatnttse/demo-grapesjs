import { Component, OnInit } from '@angular/core';
import { GrapesJsService } from '../../services/grapesjs.service';
import { Router, RouterModule } from '@angular/router';
import { Page } from '../../models/page.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pages: Page[] = [];
  openCreatePage: boolean = false;
  openEditPage: boolean = false;
  loading: boolean = true;
  createPageUrl: SafeResourceUrl | null = null;
  editPageUrl: SafeResourceUrl | null = null;

  constructor(
    private grapesjsService: GrapesJsService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pages = this.grapesjsService.getPages();
  }

  editPage(id: string) {
    this.router.navigate([`/edit-page/${id}`]);
  }

  viewPage(id: string) {
    this.router.navigate([`/view-demo/${id}`]);
  }

  openCrPage() {
    this.openCreatePage = true;
    this.loading = true;
    this.createPageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://grapesjs-editor.vercel.app/create-page'
    );
  }

  closeCreatePage() {
    this.openCreatePage = false;
  }

  onIframeLoad() {
    this.loading = false;
    const iframe = document.querySelector(
      '.full-screen-iframe'
    ) as HTMLIFrameElement;
    if (iframe) {
      iframe.style.display = 'block';
    }
  }
  openEdPage(id: string) {
    this.openEditPage = true;
    this.loading = true;
    this.editPageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://grapesjs-editor.vercel.app/edit-page/${id}`
    );
  }
  closeEditPage() {
    this.openEditPage = false;
  }
}
