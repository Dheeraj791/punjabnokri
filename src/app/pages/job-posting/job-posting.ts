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
  jobPostingId: string;

  constructor(
    public platform: Platform,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {

    

  }

  ionViewDidEnter() {

    this.jobPostingId = this.route.snapshot.paramMap.get('jobPostingId');
    this.apiService.get('jobposting/' + this.jobPostingId, {}).subscribe(
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

