import { Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'page-page-privacy',
  templateUrl: 'privacy.html'
 
})
export class Privacy {

  constructor(
   private modalController: ModalController
  ) { 


  }


  dismiss() {
    this.modalController.dismiss();
  }

}
