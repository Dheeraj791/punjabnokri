import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { User } from '../../models/user';
import { Skill } from '../../models/skill';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
import { LogService } from '../../services/log.service';

import { SkillData } from '../../providers/skills';
import { ModalController } from '@ionic/angular';
import { AutoCompleteComponent } from '../../components/address-autocomplete/address-autocomplete.component';


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
  temp: User;
  @ViewChild('textarea') myInput: ElementRef;

  constructor(
    public router: Router,
    public userData: UserData,
    private storage: Storage,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService,
    private errorService: ErrorService,
    private logService: LogService,
    private skillData: SkillData,
    private modalCtrl: ModalController
  ) {

    this.userService.getUser().then(user => {
      this.user = user;
      this.loaded = true;
    });

    this.userService.watcher.subscribe((user: User) => {
      this.user = user;
    });

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
    this.apiService.get('skills/user').subscribe(
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

    this.storage.get('profile_step_jobseeker').then(res => {
      if (res) {
        this.step = res;
      }
    }
    );

    this.userService.getUser().then(user => {
      this.user = user;
      this.loaded = true;
    });
    this.loadSkills();
  }


  onProfileUpdate() {

    if (this.user.profile.desiredSalaryMin > this.user.profile.desiredSalaryMax) {
      this.errorService.showAlert('Error', 'Max salary must exceed minimum salary.');
    }

    const profile = this.user.profile;
    profile['user_id'] = this.user.id;
    this.apiService.post('users/profile', profile).subscribe(
      (result: any) => {
        this.user = new User(result.data);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );
  }

  onPurposeUpdate() {

    this.apiService.post('users/purpose', { why: this.user.profile.why }).subscribe(
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

    this.apiService.post('users/experience', { experience: this.user.experience }).subscribe(
      (result: any) => {
        this.user = new User(result.data);
        this.onNextStep();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

  }

  onSkillSubmit() {

    this.apiService.post('users/skills', { skills: this.selectedSkills }).subscribe(
      (result: any) => {
        this.user = new User(result.data);
        this.onNextCategoryStep();
        this.loadSkills();
      },
      (error: any) => {
        this.errorService.showAlert('Error', error.message);
      }
    );

  }

  onNextStep() {
    if (this.step < this.stepTotalNumber) {
      this.step++;
      this.storage.set('profile_step_jobseeker', this.step);
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
      this.loadCategoryContent();
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
    this.user.addExperience();
  }

  onRemoveExperience(i) {
    this.user.experience.splice(i, 1);
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

  async onAddressClick() {

    const modal = await this.modalCtrl.create({
      component: AutoCompleteComponent,
      componentProps: {
        'addressStr': this.user.profile.address
      }
    });

    await modal.present();

    await modal.onDidDismiss().then((formData) => {
      try {
        this.user.profile.address = formData.data.location.description;
      }
      catch (err) {
        this.logService.debug('Address never returned');
      }
    });

  }

}
