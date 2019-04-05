import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
  styleUrls: ['./matches.scss']
})
export class MatchesPage {

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  matches: any = [
    {
      name: 'Business 1',
      interested: false
    },
    {
      name: 'Business 2',
      interested: false
    },
    {
      name: 'Business 3',
      interested: false
    },
    {
      name: 'Business 4',
      interested: true
    },
    {
      name: 'Business 5',
      interested: true
    },
    {
      name: 'Business 6',
      interested: true
    },
    {
      name: 'Business 7',
      interested: false
    },
    {
      name: 'Business 8',
      interested: false
    }

  ];
  activeMatches: any = [];

  constructor(
    public platform: Platform
  ) { }


  ionViewDidEnter(){
    this.activeMatches = this.matches;
  }

  updateListing() {

    if (this.segment == 'interested') {
      this.activeMatches = this.matches.filter(item => {
        return item.interested == true;
      });
    }
    else if (this.segment == 'notinterested') {
      this.activeMatches = this.matches.filter(item => {
        return item.interested == false;
      });
    }
    else {
      this.activeMatches = this.matches;
    }
  }
}

