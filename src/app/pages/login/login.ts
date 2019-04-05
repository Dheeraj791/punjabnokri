import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';

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

  constructor(
    public userData: UserData,
    public router: Router,
    private storage: Storage
  ) {
    this.user = new User;
  }

  onNgInit() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
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
