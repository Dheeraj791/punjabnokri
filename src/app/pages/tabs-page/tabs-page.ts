import { Component } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService
  ) {


  }

  updateListing() {

  }

  openTutorial() {
    this.router.navigate(['tutorial']);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
