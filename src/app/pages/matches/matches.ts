import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { User } from '../../models/user';
import { JobPosting } from '../../models/job-posting';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';

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
  jobPostings: JobPosting[] = [];
  activeJobPostings: JobPosting[] = [];
  totalMatches: number = 0;
  activeCount: number;

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
    private loadingController: LoadingController,
    private apiService: ApiService
  ) {

    this.userService.getUser().then((user: User) => {
      this.user = user;
    });

    this.userService.watcher.subscribe((user: User) => {
      this.user = user;
    });
  }


  ionViewDidEnter() {
    this.activeMatches = this.matches;
    //load matches here

    if (this.user.type === 'employer') {

    }
    else {
      this.apiService.get('jobposting').subscribe(
        (result: any) => {
          this.jobPostings = JobPosting.initializeArray(result.data);
          this.activeJobPostings = this.jobPostings;
          this.activeCount = this.activeJobPostings.length;
          this.totalMatches = this.jobPostings.length;
          this.isLoaded = true;
        },
        (error: any) => {
          this.isLoaded = true;
        }
      );
    }



    this.apiService.get('candidates').subscribe(
      (result: any) => {

      },
      (error: any) => {
        this.isLoaded = true;
      }
    );

  }

  updateListing() {

    if (this.segment === 'interested') {
      this.activeJobPostings = this.jobPostings.filter(item => {
        return item.interested == true;
      });
    } else if (this.segment === 'notinterested') {
      this.activeJobPostings = this.jobPostings.filter(item => {
        return item.interested === false;
      });
    } else {
      this.activeJobPostings = this.jobPostings;
    }

    this.activeCount = this.activeJobPostings.length;


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

  onFilterString($event) {
    console.log($event);
    /*
    * Integrate search string logic
    */

  }

}

