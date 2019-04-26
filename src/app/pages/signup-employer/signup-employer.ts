import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { User } from '../../models/user';
import { JobPosting } from '../../models/job-posting';
import { Business } from '../../models/business';
import { Skill } from '../../models/skill';
import { SkillData } from '../../providers/skills';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'page-signup-employer',
  templateUrl: 'signup-employer.html',
  styleUrls: ['./signup-employer.scss'],
})
export class SignupEmployerPage {
  user: User;
  submitted = false;
  passwordConfirm: string;
  confirm: boolean = false;
  emailValidate: boolean = false;
  passwordValidate: boolean = false;
  passwordConfirmValidate: boolean = false;
  receivePromotions: boolean = false; 
  step: number = 1;
  experienceEntries: any;
  industries: any;
  rating: number = 0;
  selectedType: string;
  jobPosting: JobPosting;
  business: Business;

  categoryStep: number = 0;
  skills: Skill[];
  skillsCategories: any;
  selectedSkills: any;
  selectedSkillCategory: any;

  constructor(
    public router: Router,
    public userData: UserData,
    private storage: Storage,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService,
    private errorService: ErrorService,
    private skillData: SkillData
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

  
  }

  ionViewWillEnter() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );

    this.jobPosting = new JobPosting;
    this.business = new Business;
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let password = this.user.password;
      this.apiService.post('users', this.user).subscribe(
        (result: any) => {
          this.userService.setUser(result.data);
          this.apiService.authenticate(result.data.email, password).subscribe(
            (result: any) => {
              if (result.access_token) {
                this.authService.authenticate(result.access_token);
                this.onNextStep();
              }
            },
            (error: any) => {
              this.errorService.showAlert('Error', error.message);
            }
          );

        },
        (error: any) => {
          this.errorService.showAlert('Error', error.message);
        }
      );
    }

  }

  onBusinessUpdate() {

    this.apiService.post('business', { business: this.business }).subscribe(
      (data: any) => {
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );
  }


  onJobPostingUpdate() {

    this.apiService.post('jobposting', { jobposting: this.jobPosting }).subscribe(
      (result: any) => {
        this.jobPosting = result.data; 
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
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
    if (this.step < 10) {
      this.step++;
    }

  }


  onPreviousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  onNextCategoryStep() {
    if (this.categoryStep < (this.skillsCategories.length - 1)) {
      if(this.validateExperience()){
        this.categoryStep++;
        this.loadCategoryContent()
      }
      else{
        alert("Please rate all of the skills on the screen.");
      } 
    
    }
    else {
      this.onNextStep();
    }
  }

  onPreviousCategoryStep() {
    if (this.categoryStep > 0) {
      this.categoryStep--;
      this.loadCategoryContent()
    }
    else {
      this.onPreviousStep();
    }
  }

  loadCategoryContent() {
    let categoryId = this.skillsCategories[this.categoryStep];
    this.selectedSkills = this.skillData.getSkillsByCategory(this.skills, categoryId);
    this.selectedSkillCategory = this.skillData.getCategoryNameOnSkills(this.selectedSkills);
  }

  onExperienceSubmit() {

    this.apiService.post('users/experience', { experienceEntries: this.experienceEntries }).subscribe(
      (data: any) => {
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

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

  validateExperience() {
    let validate = true;
    this.selectedSkills.forEach(selectedSkill => {
      if (selectedSkill['value'] === null) {
        validate = false;
      }
    });

    return validate;
  }

  ratingChange($event, i) {
    this.skills[i]['value'] = $event;
  }


}
