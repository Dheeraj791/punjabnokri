import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { User } from '../../models/user';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-signup-jobseeker',
  templateUrl: 'signup-jobseeker.html',
  styleUrls: ['./signup-jobseeker.scss'],
})
export class SignupJobseekerPage {
  user: User;
  submitted = false;
  password: string;
  passwordConfirm: string;
  confirm: boolean = false;
  emailValidate: boolean = false;
  passwordValidate: boolean = false;
  passwordConfirmValidate: boolean = false;
  step: number = 1;
  experienceEntries: any;
  industries: any;
  rating: number = 0;
  skills: Array<string>;
  selectedType: string;

  constructor(
    public router: Router,
    public userData: UserData,
    private storage: Storage,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.user = new User;
    this.experienceEntries = [
      {
        "numberYears": 0,
        "title": "",
        "industry": ""
      },
      {
        "numberYears": 0,
        "title": "",
        "industry": ""
      },
      {
        "numberYears": 0,
        "title": "",
        "industry": ""
      }
    ];

    this.industries = [
      'Accommodation',
      "Restaurants",
      "Retail"
    ];

    this.skills = [
      'Skill 1',
      'Skill 2',
      'Skill 3',
      'Skill 4',
      'Skill 5',
      'Skill 6',
      'Skill 7',
      'Skill 8',
      'Skill 9',
      'Skill 10',
    ];
  }

  ionViewWillEnter() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let password = this.user.password;
      this.apiService.post('users', this.user).subscribe(
        (result: any) => {
          console.log(result);
          console.log(result.data);
          this.userService.setUser(result.data);
          this.apiService.authenticate(result.data.email, password).subscribe(
            (result: any) => {
              if (result.access_token) {
                this.authService.authenticate(result.access_token);
              }
            },
            (error: any) => {

            }
          );
          this.onNextStep();
        },
        (error: any) => {

        }
      );
    }

  }

  onProfileUpdate() {
    let profile = this.user.profile;
    profile['user_id'] = this.user.id;
    this.apiService.post('users/profile', profile).subscribe(
        (data: any) => {
          this.onNextStep();
        },
        (error: any) => {

        }
      );
  }

  onPurposeUpdate() {

    this.apiService.post('users/purpose', {why:this.user.profile.why }).subscribe(
        (data: any) => {
          this.onNextStep();
        },
        (error: any) => {

        }
      );
  }


  onExperienceSubmit() {
    
    this.apiService.post('users/experience', { }).subscribe(
        (data: any) => {
          this.onNextStep();
        },
        (error: any) => {

        }
      );
  }

  onSkillSubmit() {
    
    this.apiService.post('users/skills', { }).subscribe(
        (data: any) => {
          this.onNextStep();
        },
        (error: any) => {

        }
      );
  }

  validateEmail(value) {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var RegularExp = new RegExp(reg);
    if (RegularExp.test(value)) {
      this.emailValidate = true;
      return true;
    }
    else {
      return false;
    }
  }

  validatePassword(value) {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    var RegularExp = new RegExp(reg);
    if (RegularExp.test(value)) {
      this.passwordValidate = true;
      return true;
    }
    else {
      return false;
    }
  }


  onChangePassword() {
    let validate = this.validatePassword(this.user.password);
    if (validate) {
      this.passwordValidate = true;
    }
    else {
      this.passwordValidate = false;
    }
  }

  onChangeRepeat() {
    if (this.user.password == this.passwordConfirm) {
      this.passwordConfirmValidate = true;
    }
    else {
      this.passwordConfirmValidate = false;
    }
  }

  onChangeEmail($event) {

    let validate = this.validateEmail(this.user.email);

    if (validate) {
      this.emailValidate = true;
    }
    else {
      this.emailValidate = false;
    }
  }

  onNextStep() {
    if (this.step < 8) {
      this.step++;
    }

  }


  onPreviousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  onAddExperience() {
    this.experienceEntries.push(
      {
        "numberYears": 0,
        "title": "",
        "industry": ""
      }
    );
  }

  onRemoveExperience(i) {
    this.experienceEntries.splice(i, 1);
  }

  onSeeMatches() {
    this.router.navigateByUrl('/app/tabs/matches');
  }

  someFunction($event) {

  }


}
