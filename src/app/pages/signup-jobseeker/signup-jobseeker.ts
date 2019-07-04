import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { User } from '../../models/user';
import { Skill } from '../../models/skill';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';

import { SkillData } from '../../providers/skills';

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
  receivePromotions: boolean = false;
  step: number = 1;
  stepTotalNumber: number = 7;
  experienceEntries: any;
  industries: any;
  rating: number = 0;
  selectedType: string;

  /*
  * Category related
  */
  categoryStep: number = 0;
  skills: Skill[];
  skillsCategories: any;
  selectedSkills: any;
  selectedSkillCategory: any;

  start: boolean = false;
  loaded: boolean = false;

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

    this.userService.getUser().then(user => {
      this.user = user;
      this.loaded = true;
    });
    this.user = new User;

    this.experienceEntries = [
      {
        'id': null,
        'category_id': null,
        'numberYears': 0,
        'title': '',
        'industry': ''
      },
      {
        'id': null,
        'category_id': null,
        'numberYears': 0,
        'title': '',
        'industry': ''
      },
      {
        'id': null,
        'category_id': null,
        'numberYears': 0,
        'title': '',
        'industry': ''
      }
    ];

    this.industries = [
      'Retail',
      'Hospitality',
      'Business Services'
    ];
    /*
    this.userService.watcher.subscribe((user: User) => {
      this.loadSkills();
    });
    */
  }

  loadSkills() {
    this.apiService.get('skills').subscribe(
      (result: any) => {
        this.skills = Skill.initializeArray(result.data);
        this.skillsCategories = this.skillData.getCategories(this.skills);
        this.loadCategoryContent();
      },
      (error: any) => {

      }
    );
  }

  ionViewWillEnter() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );
    this.loadSkills();
  }


  onProfileUpdate() {

    if (this.user.profile.maxDesiredSalary < this.user.profile.minDesiredSalary) {
      this.errorService.showAlert('Error', 'Max salary must exceed minimum salary.');
    }

    const profile = this.user.profile;
    profile['user_id'] = this.user.id;
    this.apiService.post('users/profile', profile).subscribe(
      (data: any) => {
        this.userService.setUser(data.result);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );
  }

  onPurposeUpdate() {

    this.apiService.post('users/purpose', { why: this.user.profile.why }).subscribe(
      (data: any) => {
        this.userService.setUser(data.result);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

  }


  onExperienceSubmit() {

    this.apiService.post('users/experience', { experienceEntries: this.experienceEntries }).subscribe(
      (data: any) => {
        this.userService.setUser(data.result);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

  }

  onSkillSubmit() {

    this.apiService.post('users/skills', { skills: this.selectedSkills }).subscribe(
      (data: any) => {
        this.userService.setUser(data.result);
        this.onNextCategoryStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

  }

  onNextStep() {
    if (this.step < this.stepTotalNumber) {
      this.step++;
    }
  }


  onPreviousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  resetCategorySteps() {
    this.categoryStep = 0;
  }

  onNextCategoryStep() {
    if (this.categoryStep < (this.skillsCategories.length - 1)) {
      this.categoryStep++;
      this.loadCategoryContent()
      /*
        if (this.validateExperience()) {
          this.categoryStep++;
          this.loadCategoryContent()
        }
        else {
          this.errorService.showAlert('Error', "Please rate all of the skills on the screen.");

        }
      */

    } else {
      this.onNextStep();
    }
  }

  onPreviousCategoryStep() {
    if (this.categoryStep > 0) {
      this.categoryStep--;
      this.loadCategoryContent()
    } else {
      this.onPreviousStep();
    }
  }

  loadCategoryContent() {
    const categoryId = this.skillsCategories[this.categoryStep];
    this.selectedSkills = this.skillData.getSkillsByCategory(this.skills, categoryId);
    this.selectedSkillCategory = this.skillData.getCategoryNameOnSkills(this.selectedSkills);
  }

  onAddExperience() {
    this.experienceEntries.push(
      {
        'id': null,
        'category_id': null,
        'numberYears': 0,
        'title': '',
        'industry': ''
      }
    );
  }

  onRemoveExperience(i) {
    this.experienceEntries.splice(i, 1);
  }

  onSeeMatches() {
    this.storage.set('complete', true);
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
    this.selectedSkills[i]['value'] = $event;
    const selectedSkill = this.selectedSkills[i];
    const index = this.skills.findIndex(skill => skill.id === selectedSkill.id);
    this.skills[index]['value'] = $event;
  }

  onReset() {
    this.step = 1;
  }

}
