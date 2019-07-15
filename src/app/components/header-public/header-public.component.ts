import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header-public-component',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})

export class HeaderPublicComponent implements OnInit {

  selectedType: string;
  selectedTypes: any = {
    'employer': 'Job Seeker',
    'jobseeker': 'Employers'
  };
  loggedIn: boolean;
  @Input() showHome: boolean = false;
  @Input() showLogin: boolean = false;
  @Output() userTypeChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private router: Router
  ) {
    this.selectedType = 'jobseeker';
  }

  ngOnInit() {
    this.authService.isAuthenticated().then(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });

  }


  onSwitchUserType() {

    this.storage.get('user_type').then(res => {
      const user_type = (res === 'jobseeker' ? 'employer' : 'jobseeker');
      this.selectedType = user_type;
      this.storage.set('user_type', user_type);
      this.userTypeChange.emit(user_type);
    }
    );
  }

  goHome(){
    this.router.navigate(['/tutorial']);
  }

  onLogout() {
    this.authService.logout().then(res => {
      this.router.navigateByUrl('/login');
    }
    );

  }


}
