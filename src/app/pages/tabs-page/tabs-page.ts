import { Component } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  appPages = [
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  user: User;

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {


  }

  updateListing() {

  }

  openTutorial() {
    this.router.navigate(['tutorial']);
  }

  editProfile() {
    this.userService.getUser().then(user => {
      this.user = user;
      if (this.user.type === 'jobseeker') {
        this.router
          .navigateByUrl('/signup-jobseeker');
      } else {
        this.router
          .navigateByUrl('/signup-employer');
      }
    }
    );

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
