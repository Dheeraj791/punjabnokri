import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

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
  user: User; 
  isLoaded: boolean = false; 

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
    public platform: Platform,
    private userService: UserService,
    private loadingController: LoadingController
  ) { 

    this.userService.getUser().then( User => {
      this.user = User; 
    }); 
  }


  ionViewDidEnter(){
    this.activeMatches = this.matches;
    //load matches here
    this.isLoaded = true; 
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

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingController.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
 
}

