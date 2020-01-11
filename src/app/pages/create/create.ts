import { Component } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Privacy } from '../static/privacy/privacy';
import { Terms } from '../static/terms/terms';
import { Events } from '@ionic/angular';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
  styleUrls: ['./create.scss']
})
export class CreatePage {

  submitted: boolean = false;
  user: User;
  password: string;
  passwordConfirm: string;
  confirm: boolean = false;
  emailValidate: boolean = false;
  passwordValidate: boolean = false;
  passwordConfirmValidate: boolean = false;
  receivePromotions: boolean = false;
  userType: string;
  confirmEmail: string;
  start: boolean = false;
  show: boolean = false;
  loading: HTMLIonLoadingElement =null;
  
  
    constructor(
    private platform: Platform,
    private apiService: ApiService,
    private userService: UserService,
    private authService: AuthService,
    private errorService: ErrorService,
    private storage: Storage,
    private router: Router,
    private modalController: ModalController,
    public  events: Events,
    public loadingCtrl: LoadingController,
    
  ) 
  
  {
    this.user = new User;
    this.userType = 'jobseeker';
  }

  ionViewWillEnter() {
    //this.start = false;
    this.user = new User;
    this.submitted = false;
    this.passwordConfirm = '';
    this.authService.logout();
    this.userService.setUser(this.user);
    this.storage.get('user_type').then(res => {
    this.userType = res;
    this.user.type = res;
    
    });

  }

  ionViewDidLeave() {
    this.start = true;
  }

  onSignup(form: NgForm) {

    this.submitted = true;
    if (form.valid) {
      this.presentLoadingDefault();
      const password = this.user.password;
      this.apiService.post('users', this.user).subscribe(
        (result: any) => {
          this.userService.setUser(result.data);
          this.apiService.authenticate(result.data.email, password).subscribe(
            (result: any) => {
              this.loading.dismiss();
              if (result.access_token) {
                this.authService.authenticate(result.access_token);
                if (this.user.type === 'jobseeker') {
                  this.router.navigateByUrl('/signup-jobseeker');   
                }
                else {
                  this.router.navigateByUrl('/signup-employer');
                }
              }
              else {
                this.errorService.showAlert('Error', 'Something went wrong. Please try again.');
              }
            },
            (error: any) => {
              this.loading.dismiss();
              this.errorService.showAlert('Error', error.message);
            }
          );
        },
        (error: any) => {
          this.loading.dismiss();
          this.errorService.showAlert('Error', error.message);
        }
      );
    }
   }

  validateEmail(value) {
    const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const RegularExp = new RegExp(reg);
    if (RegularExp.test(value)) {
      this.emailValidate = true;
      return true;
    }
    else {
      return false;
    }
  }

  validatePassword(value) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    const RegularExp = new RegExp(reg);
    if (RegularExp.test(value)) {
      this.passwordValidate = true;
      return true;
    }
    else {
      return false;
    }
  }


  onChangePassword() {
    const validate = this.validatePassword(this.user.password);
    if (validate) {
      this.passwordValidate = true;
    }
    else {
      this.passwordValidate = false;
    }
  }

  onChangeRepeat() {
    if (this.user.password === this.passwordConfirm) {
      this.passwordConfirmValidate = true;
    }
    else {
      this.passwordConfirmValidate = false;
    }
  }

  onChangeEmail($event) {
    const validate = this.validateEmail(this.user.email);

    if (validate) {
      this.emailValidate = true;
    }
    else {
      this.emailValidate = false;
    }
  }

  async onTerms() {
    const modal = await this.modalController.create({
      component: Terms
    });
    await modal.present();
  }

  async onPrivacy() {
    const modal = await this.modalController.create({
      component: Privacy
    });
    await modal.present();
  }

  changeUserType($event) {
    this.userType = $event;
   }

   async presentLoadingDefault() {
    let loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-ion-loader',
      message: 'Please wait...',
    });
    this.loading = loading;
    return await loading.present();
  }

  onStart() {
    this.start = true;
  }
}
