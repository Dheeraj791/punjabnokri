import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-candidate',
  templateUrl: 'candidate.html',
  styleUrls: ['./candidate.scss']
})
export class CandidatePage {
  skills: Array<string>;

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


  ionViewDidEnter(){
   
  }

  onMoreInfo(){
    
  }

}

