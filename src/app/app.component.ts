import { Component, ViewEncapsulation } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { User } from './models/user';
import { ApiService} from './services/api.service';
import { AuthService } from './services/auth.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

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
    
  ) {

    this.initializeApp();
    this.checkForAuthentication();
    this.authService.Authenticator.subscribe((authenticated: boolean) => {
      this.checkForAuthentication();
      console.log('authenticator subscribe');
		});
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  checkForAuthentication() {
    this.authService.isAuthenticated().then(result =>  {
      if(result){
        this.apiService.get('users/me').subscribe(
          (result: any) => {
            const user = new User(result.data);
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
           
          }
        );
      }

    });

	}
}