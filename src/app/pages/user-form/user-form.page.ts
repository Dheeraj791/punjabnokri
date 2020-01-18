import { Component, NgZone, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PhotoService } from "src/app/services/photo.service";
import { AutoCompleteComponent } from "../../components/address-autocomplete/address-autocomplete.component";
import { ModalController } from "@ionic/angular";
import { UserData } from "../../providers/user-data";
import { User } from "../../models/user";
import { LogService } from "../../services/log.service";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { ErrorService } from "../../services/error.service";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Storage } from "@ionic/storage";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError
} from "@ionic-native/geolocation/ngx";

declare var google;

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.page.html",
  styleUrls: ["./user-form.page.scss"]
})
export class UserFormPage {
  currentImage: any;
  map: any;
  user: User;
  imageResponse: any;
  options: any;
  fileUrl: any = null;
  respData: any;
  userType: string;
  start: boolean;

  submitted = false;
  password: string;
  passwordConfirm: string;
  confirm: boolean = false;
  emailValidate: boolean = false;
  passwordValidate: boolean = false;
  passwordConfirmValidate: boolean = false;
  selectedType: any;
  loaded: boolean = false;
  geooptions: GeolocationOptions;
  currentPos: Geoposition;
  autocompleteItems;
  autocomplete: string;
  GoogleAutocomplete: any;
  latitude: number = 0;
  longitude: number = 0;

  constructor(
    public photoService: PhotoService,
    private modalCtrl: ModalController,
    private logService: LogService,
    private imagePicker: ImagePicker,
    private storage: Storage,
    private userService: UserService,
    private router: Router,
    public userData: UserData,
    private errorService: ErrorService,
    private apiService: ApiService,
    private authService: AuthService,
    private geoLocation: Geolocation,
    private zone: NgZone
  ) {
    this.autocompleteItems = [];
    this.userService.getUser().then(user => {
      this.user = user;
      console.log(this.user);
      this.loaded = true;
    });

    this.userService.watcher.subscribe((user: User) => {
      this.user = user;
    });
  }

  ionViewDidEnter() {
    // this.getUserPosition();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = "";
    this.autocompleteItems = [];
  }
  ionViewWillEnter() {
    this.storage.get("user_type").then(res => {
      this.selectedType = res;
      this.photoService.loadSaved();
    });
    this.userService.getUser().then(user => {
      this.user = user;
      this.loaded = true;
    });
  }
  updateSearchResults(keyword) {
    console.log(keyword);
    if (this.autocomplete === "") {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions) {
            predictions.forEach(prediction => {
              this.autocompleteItems.push(prediction);
            });
          } else {
            this.autocompleteItems = [];
          }
          console.log(this.autocompleteItems);
        });
      }
    );
  }
  selectSearchResult(item) {
    this.autocomplete = item.description;
    this.autocompleteItems = [];
  }
  async onAddressClick() {
    const modal = await this.modalCtrl.create({
      component: AutoCompleteComponent,
      componentProps: {
        addressStr: this.user.profile.address
      }
    });

    await modal.present();

    await modal.onDidDismiss().then(formData => {
      this.user.profile.address = formData.data.location.description;
    });
  }
  onNext(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.user.address = this.autocomplete;
      if (this.user.type === "jobseeker") {
        this.router.navigateByUrl("/signup-jobseeker");
      } else {
        this.router.navigateByUrl("/signup-employer");
      }
    }
  }

  getImages() {
    this.options = {
      width: 200,
      quality: 25,
      outputType: 1
    };

    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          this.imageResponse.push("data:image/jpeg;base64," + results[i]);
        }
      },
      err => {
        alert(err);
      }
    );
  }

  onStart() {
    this.start = true;
  }

  changeUserType($event) {
    this.userType = $event;
  }
}
