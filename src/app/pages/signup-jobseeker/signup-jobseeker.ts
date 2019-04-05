import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signup-jobseeker',
  templateUrl: 'signup-jobseeker.html',
  styleUrls: ['./signup-jobseeker.scss'],
})
export class SignupJobseekerPage {
  user: User;
  submitted = false;
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
    private storage: Storage
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

  onNgInit() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );
  }

  onSignup(form: NgForm) {
    this.submitted = true;


    if (form.valid) {
      this.userData.signup(this.user.email);
      //this.router.navigateByUrl('/app/tabs/schedule');
    }
    this.onNextStep();
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

  onRemoveExperience(i){
    this.experienceEntries.splice(i, 1);
  }

  onSeeMatches() {
    this.router.navigateByUrl('/app/tabs/matches');
  }

  someFunction($event) {

  }


}
