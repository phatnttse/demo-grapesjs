import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class GrapesJsService {
  localStorage?: Storage;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  createPage(page: Page): void {
    const pages = JSON.parse(localStorage.getItem('pages') || '[]');
    pages.push(page);
    localStorage.setItem('pages', JSON.stringify(pages));
  }

  getPages(): Page[] {
    return JSON.parse(localStorage.getItem('pages') || '[]');
  }
  getPageById(id: string): Page | undefined {
    const pages: Page[] = JSON.parse(localStorage.getItem('pages') || '[]');
    return pages.find((page) => page.id === id);
  }
}
