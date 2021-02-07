import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app111';

  constructor( private router: Router) {
    }

  goHomePage() {
      this.router.navigate(
        ['/home']);
    }

  goUserPage() {
          this.router.navigate(
            ['/user']);
        }

  goCatalogPage() {
            this.router.navigate(
              ['/catalog']);
          }
}
