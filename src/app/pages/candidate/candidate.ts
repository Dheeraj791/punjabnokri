import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPosting} from '../../models/job-posting';


@Component({
  selector: 'page-candidate',
  templateUrl: 'candidate.html',
  styleUrls: ['./candidate.scss']
})
export class CandidatePage {
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

  ionViewDidEnter(){

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

  onMoreInfo(){
    
  }

  onInterested(){
    this.apiService.put('jobposting/' + this.profileId, {interested: true}).subscribe(
      (result: any) => {
        this.jobPosting = new JobPosting(result.data);
      },
      (error: any) => {

      }
    );

  }

  onNotInterested(){
    this.apiService.put('jobposting/' + this.profileId, {interested: false}).subscribe(
      (result: any) => {
        this.jobPosting = new JobPosting(result.data);
      },
      (error: any) => {

      }
    );

  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

}

