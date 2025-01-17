import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./components/home/home.component').then(
        (m) => m.HomeComponent
      );
    },
  },
  {
    path: 'view-demo/:id',
    loadComponent() {
      return import('./components/view-demo/view-demo.component').then(
        (m) => m.ViewDemoComponent
      );
    },
  },
  {
    path: 'edit-page/:id',
    loadComponent() {
      return import('./components/edit-page/edit-page.component').then(
        (m) => m.EditPageComponent
      );
    },
  },
  {
    path: 'create-page',
    loadComponent() {
      return import('./components/create-page/create-page.component').then(
        (m) => m.CreatePageComponent
      );
    },
  },
];
