import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;
  selectedType: string = 'employee';

  @ViewChild('slides') slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {

  }

  startApp() {
    this.router
      .navigateByUrl('/signup')
      .then(() => /*this.storage.set('ion_did_tutorial', 'true') */ '');
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {

    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }


  onSignin() {
    this.router.navigateByUrl('/login');
  }

  onSwitchUserType() {

    this.storage.get('user_type').then(res => {
      let user_type = (res === 'employee' ? 'employer' : 'employee');
      this.storage.set('user_type', user_type);
      this.selectedType = user_type;
    }
    );
  }
}
