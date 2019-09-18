import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { ErrorService } from '../../services/error.service';
import { AuthService } from '../../services/auth.service';

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
    private api: ApiService,
    private errorService: ErrorService,
    private authService: AuthService
  ) {
    this.user = new User;
    /*
    this.authService.Authenticator.subscribe((authenticated: boolean) => {
		  if(authenticated){
        this.router.navigateByUrl('/app/tabs/matches');
      }
    });

    this.authService.isAuthenticated().then(isLoggedIn => {
      if(isLoggedIn){
        this.router.navigateByUrl('/app/tabs/matches');
      }
    });
    */
    
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
        (result: any) => {
          if (result.access_token) {
            this.authService.authenticate(result.access_token);
          }
        },
        (error: any) => {
          this.errorService.showAlert('Error', error.message);
        }
      );


      //this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router
      .navigateByUrl('/create');
  }
}
