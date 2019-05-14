import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();

  constructor(  private modalCtrl : ModalController) { 
  
  }

  ngOnInit() {

  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
    }
  }

  updateListing($event){
    console.log("ionChange emitted: ",$event.value);
    this.searchStringUpdated.emit();
  }

}
