import { Component } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
  ) {


  }

  updateListing() {

  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }


  openTutorial() {
    this.router.navigate(['tutorial']);
  }
}
