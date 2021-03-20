import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/user';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ProfileInfo} from 'src/app/req/profileInfo';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MatDialogModule} from "@angular/material/dialog";
import {Reg} from 'src/app/req/reg';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
user: User;
userId1 : number;
private subscription: Subscription;
displayedColumns: string[] = ['position', 'name', 'weight'];
dataSource = ELEMENT_DATA;
  constructor(private http: HttpClient, private api: ProfileInfo, private api1: Reg, private activateRoute: ActivatedRoute,  public dialog: MatDialog,  private router: Router) {
    this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
    this.subscription = new Subscription();
    this.userId1 = 0;
  }

  email = new FormControl('', [Validators.required, Validators.email, this.noWhitespaceValidator]);
  firstName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  lastName = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passFirst = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
  passSecond = new FormControl('', [Validators.required, this.noWhitespaceValidator]);

  getErrorMessageEmail() {
      if (this.email.hasError('required') || this.email.value.trim()=='') {
        return 'Поле обязательно для заполнения';
      }
      return this.email.hasError('email') ? 'Некорректный email' : '';
    }

    getErrorMessageFirstName() {
        if (this.firstName.hasError('required') || this.firstName.value.trim()=='') {
          return 'Поле обязательно для заполнения';
        }
        return '';
      }
      getErrorMessageLastName() {
            if (this.lastName.hasError('required') || this.lastName.value.trim()=='') {
              return 'Поле обязательно для заполнения';
            }
            return '';
          }
  getErrorMessagePassFirst() {
                     if (this.passFirst.hasError('required') || this.passFirst.value.trim()=='') {
                       return 'Поле обязательно для заполнения';
                     }
                     return '';
                   }

  getErrorMessagePassSecond() {
            if (this.passSecond.hasError('required') || this.passSecond.value.trim()=='') {
              return 'Поле обязательно для заполнения';
            }
            return '';
          }

  ngOnInit(): void {
  this.subscription = this.activateRoute.params.subscribe(params => {
        this.userId1 = params['id'];
        this.getUserData(this.userId1);
      });

  }
openDialog(){
    this.dialog.open(NotEq);
  }

  failRegistrationDialog(){
    this.dialog.open(FailRegistration);
    }

  noWhitespaceValidator(control: FormControl) {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
  }

sendUserData(){
  if (this.passSecond.value!=this.passFirst.value) {
                  this.openDialog();
                }

    if(this.passSecond.value==this.passFirst.value){
    this.api1.postCommand(this.firstName.value.trim(),this.lastName.value.trim(),this.passFirst.value,this.email.value.trim())
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

    goFilmPage() {
                        this.router.navigate(
                          ['/film']);
                      }

    goToProfile() {
            this.router.navigate(
              ['/user', this.user.userId]);
          }
  getUserData(userId: number){

      this.api.postCommand(userId)
          .subscribe((data: User) => {

            if( data == null){
              this.user = {"userId":0, "name": "", "birthday": "", "logoUrl": "", "description": "", "registrationDate": ""};
            }else{
            this.user = data;
            }
          });
    }
}

@Component({
  selector: 'notEquals',
  templateUrl: 'notEquals.html',
})
export class NotEq {
constructor(public dialogRef: MatDialogRef<NotEq>) {
  }
close(){
   this.dialogRef.close(true);
}
}


@Component({
  selector: 'failRegistration',
  templateUrl: 'failRegistration.html',
})
export class FailRegistration {
constructor(public dialogRef: MatDialogRef<FailRegistration>) {
  }
close(){
   this.dialogRef.close(true);
}
}
