import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

	watcher = new Subject();

	constructor(
		private storage: Storage
	) {

	}

	getUser(): Promise<User> {
		return this.storage.get('user').then(user => {
			return new User(user);
		});
	}

	setUser(user: User) {
		this.storage.set('user', user).then(user => {
			this.watcher.next(user);
		});
	}
}
