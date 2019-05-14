import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { ApiService } from '../../services/api.service';
import { ErrorService} from '../../services/error.service';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
})
export class ScheduleFilterPage implements AfterViewInit {

  minimumScore: number = 50;
  maxDistance: number = 50;

  constructor(
    public confData: ConferenceData,
    public modalCtrl: ModalController,
    private apiService: ApiService,
    private errorService: ErrorService
  ) {

  }

  ngAfterViewInit() {
    const excludedTrackNames = [];
  }

  applyFilters() {
    this.apiService.put('users/settings',
      {
        minimumScore: this.minimumScore,
        maxDistance: this.maxDistance
      }
    ).subscribe(
      (data: any) => {
        this.errorService.showAlert('Saved', "Your search defaults have been saved.");
      },
      (error: any) => {

      }
    );
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

  resetFilters() {
    this.minimumScore = 50;
    this.maxDistance = 50;
  }
}
