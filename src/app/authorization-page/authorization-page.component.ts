import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {User} from 'src/app/user';
import {Autor} from 'src/app/req/autor';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {
  user: User;

  constructor(private http: HttpClient, private api: Autor, private activateRoute: ActivatedRoute, private router: Router, public dialog: MatDialog,) {
   this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
   }
noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
//Validators.email,Validators.required, this.noWhitespaceValidator
  email = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  pass = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  getErrorMessageEmail() {
    if (this.email.hasError('required') || this.email.value.trim() == '') {
      return 'Поле обязательно для заполнения';
    }
    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  getErrorMessagePass() {
      if (this.pass.hasError('required') || this.pass.value.trim() == '') {
        return 'Поле обязательно для заполнения';
      }
      return '';
    }

  ngOnInit(): void {
  }

  goToProfile() {
      this.router.navigate(
        ['/user', this.user.userId]);
    }

    failRegistrationDialog(){
      this.dialog.open(FailLogin);
      }


  sendUserData(){

      this.api.postCommand( this.email.value.trim(), this.pass.value)
          .subscribe((data: HttpResponse<User>) => {
            if( data.body == null){
              this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
            }else{
            this.user = data.body;
            }
            if (data.status == 200){
                            this.goToProfile();
                          }
          },

            (err) => {this.failRegistrationDialog();}
          );
    }
}

@Component({
  selector: 'failLogin',
  templateUrl: 'failLogin.html',
})
export class FailLogin {
constructor(public dialogRef: MatDialogRef<FailLogin>) {
  }
close(){
   this.dialogRef.close(true);
}
}
