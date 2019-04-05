import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html',
  styleUrls: ['./schedule-filter.scss'],
})
export class ScheduleFilterPage implements AfterViewInit {

  tracks: { name: string, isChecked: boolean }[] = [];
  trackNames: { name: string, isChecked: boolean }[] = [];

  constructor(
    public confData: ConferenceData,
    public modalCtrl: ModalController
  ) {

    this.trackNames = [
      { name: 'name1', isChecked: false },
      { name: 'name2', isChecked: false },
      { name: 'name3', isChecked: false },
      { name: 'name4', isChecked: false },
      { name: 'name5', isChecked: false },
      { name: 'name6', isChecked: false },
      { name: 'name7', isChecked: false },
      { name: 'name8', isChecked: false },
      { name: 'name9', isChecked: false },
      { name: 'name10', isChecked: false }
    ];
  }

  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = []; // this.navParams.data.excludedTracks;


    this.trackNames.forEach(trackName => {
      this.tracks.push({
        name: trackName.name,
        isChecked: (excludedTrackNames.indexOf(trackName) === -1)
      });
    });

  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
