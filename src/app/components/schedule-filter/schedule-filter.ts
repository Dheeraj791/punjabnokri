import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
})
export class ScheduleFilterPage implements AfterViewInit {

  minimumScore: number = 50;
  maxdistance: number = 50;

  constructor(
    public confData: ConferenceData,
    public modalCtrl: ModalController
  ) {

  }

  ngAfterViewInit() {
    const excludedTrackNames = [];
  }

  applyFilters(){

  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  onIncrement() {
    if (this.minimumScore < 100) {
      this.minimumScore++;
    }
  }

  onDecrement() {
    if (this.minimumScore > 0) {
      this.minimumScore--;
    }
  }

  resetFilters(){
    
  }
}
