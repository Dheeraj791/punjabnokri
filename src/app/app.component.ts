import { Component, ViewEncapsulation } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { User } from './models/user';
import { ApiService} from './services/api.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private apiService: ApiService,
    private storage: Storage,
    private router: Router
  ) {

    this.initializeApp();
    this.checkForAuthentication();

    this.authService.Authenticator.subscribe((authenticated: boolean) => {
			this.checkForAuthentication();
		});
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  checkForAuthentication() {

		if (this.authService.isAuthenticated()) {
			this.apiService.get('users/me').subscribe(
				(result: any) => {
					let user = new User(result.data);
					this.storage.set('user', user);
				},
				(error: any) => {
					if (error.status === 401) {
						this.authService.logout();
					} else {
						//this.modalService.showAlert(this.popup.title, this.popup.connect);
					}
				},
				() => {
					//has the user entered an access code yet?
				}
			);
    }
    else{
      this.router.navigateByUrl('/app/tabs/matches');
    }
	}
}
