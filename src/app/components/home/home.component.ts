import { Component, OnInit } from '@angular/core';
import { GrapesJsService } from '../../services/grapesjs.service';
import { Router, RouterModule } from '@angular/router';
import { Page } from '../../models/page.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pages: Page[] = [];

  constructor(
    private grapesjsService: GrapesJsService,
    private router: Router
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
}
