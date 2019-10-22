import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
  styleUrls: ['./business.scss']
})
export class BusinessPage {
  skills: Array<string>;
  loaded: boolean;

  constructor(
    public platform: Platform
  ) {
    this.skills = [
      'Skill 1',
      'Skill 2',
      'Skill 3',
      'Skill 4',
      'Skill 5',
    ];
  }


  ionViewDidEnter() {

  }

  onMoreInfo() {

  }

}

