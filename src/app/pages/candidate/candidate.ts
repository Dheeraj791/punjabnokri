import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'page-candidate',
  templateUrl: 'candidate.html',
  styleUrls: ['./candidate.scss']
})
export class CandidatePage {
  skills: Array<string>;
  loaded: boolean = false;
  candidate: User;
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
    this.apiService.get('candidate/' + this.profileId, {}).subscribe(
      (result: any) => {
        this.loaded = true;
        this.candidate = new User(result.data);
      },
      (error: any) => {

      }
    );
  }

  onMoreInfo() {

  }


}

