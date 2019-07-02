import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'page-terms',
    templateUrl: 'terms.html'

})
export class Terms {

    constructor(
        private modalController: ModalController
    ) {


    }

    dismiss() {
        this.modalController.dismiss();
    }

}
