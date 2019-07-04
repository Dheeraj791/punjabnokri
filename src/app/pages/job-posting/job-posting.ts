import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPosting } from '../../models/job-posting';


@Component({
  selector: 'page-job-posting',
  templateUrl: 'job-posting.html',
  styleUrls: ['./job-posting.scss']
})
export class JobPostingPage {
  skills: Array<string>;
  loaded: boolean = false;
  jobPosting: JobPosting;
  profileId: string;

  constructor(
    public platform: Platform,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {

  }

  ionViewDidEnter() {

    this.profileId = this.route.snapshot.paramMap.get('profileId');
    this.apiService.get('jobposting/' + this.profileId, {}).subscribe(
      (result: any) => {
        this.loaded = true;
        this.jobPosting = new JobPosting(result.data);
      },
      (error: any) => {

      }
    );
  }

  onMoreInfo() {

  }


}

