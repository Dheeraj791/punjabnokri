import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Subject } from 'rxjs';
//import { DeviceService } from './device.service';


@Injectable()
export class AuthService {

	Authenticator = new Subject();
	redirectUrl: string;

	constructor(
		private storage: Storage,
		private events: Events
	) {

	}

	authenticate(accessToken) {
		this.storage.set('accessToken', accessToken);

		this.storage.set('isAuthenticated', true).then(() => {
			this.events.publish('user:login');
			this.Authenticator.next(true);
		});
	}

	getToken(): Promise<string> {
		return this.storage.get('accessToken').then((value) => {
			return value;
		});
	}

	checkAuthetication() {
		this.Authenticator.next(true);
	}

	logout(): Promise<any> {
		//this.deviceService.deregister();
		this.storage.remove('accessToken');
		this.storage.remove('user');
		return this.storage.remove('isAuthenticated').then(() => {
			this.events.publish('user:logout');
		}).then(() => {
			this.Authenticator.next(false);
		});

	}

	isAuthenticated(): boolean {
		return this.storage.get('isAuthenticated') ? true : false;
	}

}
