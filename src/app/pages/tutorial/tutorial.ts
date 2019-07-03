import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;
  selectedType: string = 'jobseeker';
  selectedTypes: any = {
    'employer': 'Job Seeker',
    'jobseeker': 'Employers'
  };

  @ViewChild('slides') slides: IonSlides;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage,
    private authService: AuthService
  ) {

  }

  startApp() {
    this.authService.isAuthenticated().then(isLoggedIn => {
   
      if (!isLoggedIn) {
        this.router.navigateByUrl('/create');
      }
      else {
        if (this.selectedType == 'jobseeker') {
          this.router
            .navigateByUrl('/signup-jobseeker')
            .then(() => /*this.storage.set('ion_did_tutorial', 'true') */ '');
        }
        else {
          this.router
            .navigateByUrl('/signup-employer')
            .then(() => /*this.storage.set('ion_did_tutorial', 'true') */ '');
        }
      }
    });
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

    this.storage.get('user_type').then(res => {
      if (res) {
        this.selectedType = res;
        this.storage.set('user_type', this.selectedType);
      }
    }
    );
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
      let user_type = (res === 'jobseeker' ? 'employer' : 'jobseeker');
      this.storage.set('user_type', user_type);
      this.selectedType = user_type;
    }
    );
  }
}
