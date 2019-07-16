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
  @Input() showLogin: boolean = false;
  @Input() showHome: boolean = false;
  @Output() userTypeChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private router: Router
  ) {
    this.selectedType = 'jobseeker';
  }

  ngOnInit() {
    this.authService.Authenticator.subscribe((authenticated: boolean) => {
      this.loggedIn = authenticated;
    });
  }


  onSwitchUserType() {
    this.storage.get('user_type').then(res => {
      this.selectedType = (res === 'jobseeker' ? 'employer' : 'jobseeker');
      this.storage.set('user_type', this.selectedType);
      this.userTypeChange.emit(this.selectedType);
    }
    );
  }

  goHome() {
    this.router.navigate(['/tutorial']);
  }

  onLogout() {
    this.authService.logout().then(res => {
      this.router.navigateByUrl('/login');
    }
    );
  }

  onSignin() {
    this.router.navigateByUrl('/login');
  }

}
