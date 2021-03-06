import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
            ['/user/'+1]); //убрать
        }

  goCatalogPage() {
            this.router.navigate(
              ['/catalog']);
          }

  goRegistrationPage() {
              this.router.navigate(
                ['/registration']);
            }
  goAuthorizationPage() {
                this.router.navigate(
                  ['/authorization']);
              }

  goFilmPage() {
                  this.router.navigate(
                    ['/film']);
                }

  chatIsOpen = false;

    openChat(): void {
      this.chatIsOpen = true;
    }

    closeChat(): void {
      this.chatIsOpen = false;
    }
}
