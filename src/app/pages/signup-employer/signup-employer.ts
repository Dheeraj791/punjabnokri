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



    this.userService.watcher.subscribe((user: User) => {
      this.user = user;
    });

    this.experienceEntries = [
      {
        'numberYears': 0,
        'title': '',
        'industry': ''
      },
      {
        'numberYears': 0,
        'title': '',
        'industry': ''
      },
      {
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
  }

  ionViewWillEnter() {
    this.storage.get('user_type').then(res => {
      this.selectedType = res;
    }
    );

    this.jobPosting = new JobPosting;
    this.business = new Business;
    this.userService.getUser().then(user => {
      this.user = user;
      this.loaded = true;
      this.loadSkills();
    });

  }

  loadSkills() {

    this.apiService.get('skills/jobposting', { jobPostingId: this.user.business.jobPosting.id }).subscribe(
      (result: any) => {
        this.skills = Skill.initializeArray(result.data);
        this.skillsCategories = this.skillData.getCategories(this.skills);
        this.loadCategoryContent();
      },
      (error: any) => {

      }
    );
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      const password = this.user.password;
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

    this.apiService.post('business', { business: this.user.business }).subscribe(
      (result: any) => {
        this.user = new User(result.data);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );
  }


  onJobPostingUpdate() {
    if (!this.user.business.jobPosting.title) {
      this.errorService.showAlert('Error', 'Please fill in the job title before proceeding.');
    }

    this.apiService.post('jobposting', { businessId: this.user.business.id, jobPosting: this.user.business.jobPosting }).subscribe(
      (result: any) => {
        this.user = new User(result.data);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );
  }

  onExperienceSubmit() {

    this.apiService.post('jobposting/experience',
      { experienceEntries: this.user.business.jobPosting.experience, jobPostingId: this.user.business.jobPosting.id }
    ).subscribe(
      (result: any) => {
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

  }

  onSkillSubmit() {

    this.apiService.post('jobposting/skills',
      { skills: this.selectedSkills, jobPostingId: this.user.business.jobPosting.id }
    ).subscribe(
      (data: any) => {
        this.loadSkills();
        this.onNextCategoryStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

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
      this.categoryStep++;
      this.loadCategoryContent();
      /*
        if (this.validateExperience()) {
          this.categoryStep++;
          this.loadCategoryContent()
        }
        else {
          alert("Please rate all of the skills on the screen.");
        }
      */
    } else {
      this.onNextStep();
    }
  }

  onPreviousCategoryStep() {
    if (this.categoryStep > 0) {
      this.categoryStep--;
      this.loadCategoryContent();
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
    this.user.business.jobPosting.addExperience();
  }

  onRemoveExperience(i) {
    this.user.business.jobPosting.experience.splice(i, 1);
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
