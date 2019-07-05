import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

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
  loggedIn: boolean;
  user: User;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.loggedIn = false;

    this.userService.getUser().then(user => {
      this.user = user;
    });
  }

  startApp() {

    if (!this.loggedIn) {
      this.router.navigateByUrl('/create');
    } else {
      let type;
      if (this.user.type) {
        type = this.user.type;
      } else {
        type = this.selectedType;
        if (type === 'jobseeker') {
          this.router
            .navigateByUrl('/signup-jobseeker');
        } else {
          this.router
            .navigateByUrl('/signup-employer');
        }
      }

    }

  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.authService.isAuthenticated().then(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });

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

  onLogout() {
    this.authService.logout().then(res => {
      this.router.navigateByUrl('/login');
    }
    );

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
