import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions;
  submitted = false;
  user: User;
  selectedType: string;
  email: string;
  password: string;

  constructor(
    public userData: UserData,
    public router: Router,
    private storage: Storage,
    private api: ApiService
  ) {
    this.user = new User;
  }

  ionViewWillEnter() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.api.authenticate(this.email, this.password).subscribe(
        (data: any) => {
          if (data.access_token) {

          }
        },
        (error: any) => {


        }
      );


      //this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    if (this.selectedType == 'jobseeker') {
      this.router
        .navigateByUrl('/signup-jobseeker');
    }
    else {
      this.router
        .navigateByUrl('/signup-employer');
    }
  }
}
