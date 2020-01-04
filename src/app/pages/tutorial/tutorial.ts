import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
                          
export class TutorialPage {
  showSkip = true;
  selectedType: string ;
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
    private userService: UserService,
    private logService: LogService
  )
  
  {
    this.loggedIn = false;
    this.selectedType = 'jobseeker';
  }

    startApp() {

    if (this.loggedIn) {
      if (this.user) {
        if (this.user.type === 'jobseeker') {
          this.router
            .navigateByUrl('/signup-jobseeker');
        } else {
          this.router
            .navigateByUrl('/signup-employer');
        }
      } else {
        this.router
          .navigateByUrl('/login');
      }
    } else {
      this.router.navigateByUrl('/create');
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

    this.menu.enable(false);

    this.storage.get('user_type').then(res => {
      if (res) {
        this.selectedType = res;
        console.log('tutorial user----->', this.selectedType);
      }
    }
    );

    this.userService.getUser().then(user => {
      this.user = user; 
    });
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  changeUserType($event) {
    this.selectedType = $event;
  }
  
}