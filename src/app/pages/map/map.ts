import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas') mapElement: ElementRef;
  mapData: any = [
    {
      "name": "Monona Terrace Convention Center",
      "lat": 43.071584,
      "lng": -89.38012,
      "center": true
    },
    {
      "name": "Ionic HQ",
      "lat": 43.074395,
      "lng": -89.381056
    },
    {
      "name": "Afterparty - Brocach Irish Pub",
      "lat": 43.07336,
      "lng": -89.38335
    }
  ];

  constructor(
    public platform: Platform
    ) {}

  async ngAfterViewInit() {
    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );
    
      const mapEle = this.mapElement.nativeElement;

      const map = new googleMaps.Map(mapEle, {
        center: this.mapData.find((d: any) => d.center),
        zoom: 16
      });

      this.mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new googleMaps.Marker({
          position: markerData,
          map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });

  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}
