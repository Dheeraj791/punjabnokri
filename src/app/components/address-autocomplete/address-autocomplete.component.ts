import { Component, NgZone, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'address-autocomplete',
  templateUrl: './address-autocomplete.component.html'
})
export class AutoCompleteComponent {
  options: GeolocationOptions;
  currentPos: Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();

  map: any;
  autocompleteItems;
  autocomplete: string;
  GoogleAutocomplete: any;

  latitude: number = 0;
  longitude: number = 0;
  geo: any
  service: any;
  googleMaps: any;

  constructor(
    public modalCtrl: ModalController,
    private zone: NgZone,
    private geoLocation: Geolocation) {
    this.autocompleteItems = [];

  }

  ionViewDidEnter() {
    this.getUserPosition();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = '';
    this.autocompleteItems = [];
    
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.modalCtrl.dismiss(item);
    this.geo = item;
    this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearchResults(keyword) {
    console.log(keyword);
    if (this.autocomplete === '') {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          if (predictions) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
          else {
            this.autocompleteItems = [];
          }
          console.log(this.autocompleteItems);
        });

      });
  }

  selectSearchResult(item) {
    this.modalCtrl.dismiss({ location: item });
  }

  //convert Address string to lat and long
  geoCode(address: any) {
    let geocoder = new this.googleMaps.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
    });
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getUserPosition() {
    let options = {
      enableHighAccuracy: false
    };


    this.geoLocation.getCurrentPosition(options).then((position: Geoposition) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: latitude,
            lng: longitude
          },
          zoom: 5,
          tilt: 20
        },
        center: { lat: latitude, lng: longitude }
      };
      this.currentPos = position;

      //this.addMap(position.coords.latitude, position.coords.longitude);

    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  addMap(lat, long) {

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addMarker();
  }

  getPlaces() {
    this.service = this.service || new google.maps.places.PlacesService(document.createElement('div'));
    let request = {
      location: new google.maps.LatLng(this.currentPos.coords.latitude, this.currentPos.coords.longitude),
      radius: '200',
    };
    return new Promise((resolve, reject) => {
      this.service.nearbySearch(request, function (results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
          resolve(results.map(b => {
            return results;
          }));
        } else {
          reject(results);
        }
      });
    });
  }


}

