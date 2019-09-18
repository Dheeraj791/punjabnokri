import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { User } from '../../models/user';
import { Candidate } from '../../models/candidate';
import { JobPosting } from '../../models/job-posting';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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
  candidates: Candidate[];
  activeCandidates: Candidate[];
  matches: any = [];
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
      this.apiService.get('candidates').subscribe(
        (result: any) => {
          this.candidates = Candidate.initializeArray(result.data);
          this.activeCandidates = this.candidates;
          this.activeCount = this.candidates.length;
          this.totalMatches = this.candidates.length;
          this.isLoaded = true;
        },
        (error: any) => {
          this.isLoaded = true;
        }
      );
    } else {
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
  }

  updateListing() {
    if (this.user.type === 'jobseeker') {
      if (this.segment === 'interested') {
        this.activeJobPostings = this.jobPostings.filter(item => {
          return item.interested === true;
        });
      } else if (this.segment === 'notinterested') {
        this.activeJobPostings = this.jobPostings.filter(item => {
          return item.interested === false;
        });
      } else {
        this.activeJobPostings = this.jobPostings;
      }
      this.activeCount = this.activeJobPostings.length;
    } else {
      if (this.segment === 'interested') {
        this.activeCandidates = this.candidates.filter(item => {
          return item.interested === true;
        });
      } else if (this.segment === 'notinterested') {
        this.activeCandidates = this.candidates.filter(item => {
          return item.interested === false;
        });
      } else {
        this.activeCandidates = this.candidates;
      }
      this.activeCount = this.activeCandidates.length;
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

  onFilterString($event) {
    console.log($event);
    /*
    * Integrate search string logic
    */

  }

}

