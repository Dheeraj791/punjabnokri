import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
    selector: 'social-component',
    templateUrl: './social.component.html',
    styleUrls: ['./social.component.scss']
})

export class SocialComponent implements OnInit {


    constructor(
        private loadingCtrl: LoadingController
    ) {

    }

    ngOnInit() {

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
}