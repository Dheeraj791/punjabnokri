import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { Events } from '@ionic/angular';

@Injectable()
export class UserService {

	watcher = new Subject();

	constructor(
		private storage: Storage
	) {

	}

	getUser(): User {
		this.storage.get('user').then(user => {
			return new User(user);;
		})
		return null;

	}

	setUser(user: User) {
		this.storage.set('user', user);
		this.watcher.next(user);
		return;
	}
}
