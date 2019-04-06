import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Subject } from 'rxjs';
//import { DeviceService } from './device.service';


@Injectable()
export class AuthService {

	Authenticator = new Subject();
	redirectUrl: string;

	constructor(
		private storage: Storage
	) {

	}

	authenticate(accessToken, minutes = 20) {
		this.storage.set('accessToken', accessToken);
		/* expires in ten minutes */
		this.storage.set('isAuthenticated', true);
		this.Authenticator.next(true);
	}

	checkAuthetication() {
		this.Authenticator.next(true);
	}

	logout() {
		//this.deviceService.deregister();

		this.storage.set('accessToken', null);
		this.storage.set('user', null);
		this.storage.set('isAuthenticated', false);
		this.Authenticator.next(false);
	}

	isAuthenticated(): boolean {
		return this.storage.get('isAuthenticated') ? true : false;
	}
}
