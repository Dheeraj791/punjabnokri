import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

declare var window;

/* Add firebase logging */
@Injectable()
export class LogService {
	private env = environment;

	public logLevels = {
		trace: 0,
		debug: 1,
		warn: 2,
		critical: 3
	}

	constructor(
		private storage: Storage
	) {

	}

	private stringify(msg: any) {
		if (!msg) {
			return '';
		}

		if (typeof msg !== 'string') {
			msg = JSON.stringify(msg, null, 2);
		}

		return msg;
	}



	user(userId: string) {
		if (window.cordova) {
			//this.firebase.setUserId(userId);
		}
	}

	trace(msg: any, payload?: any) {
		if (payload) {
			msg += '\n' + this.stringify(payload);
		}

		if (this.env.logLevel <= this.logLevels.trace) {
			console.log(this.stringify(msg));
		}
	}

	debug(msg: any, payload?: any) {

		if (payload) {
			msg += '\n' + this.stringify(payload);
		}

		if (this.env.logLevel <= this.logLevels.debug) {
			console.log(this.stringify(msg));
		}
	}

	warn(msg: any, payload?: any) {
		if (payload) {
			msg += '\n' + this.stringify(payload);
		}

		if (this.env.logLevel <= this.logLevels.warn) {
			console.log(this.stringify(msg));
		}
	}

	critical(msg: any, payload?: any) {
		if (payload) {
			msg += '\n' + this.stringify(payload);
		}

		if (this.env.logLevel <= this.logLevels.critical) {
			console.error(this.stringify(msg));
		}
	}

	error(msg: string) {
		this.critical(msg);
		this.storage.get('log-error').then(error => {
			let errorLog = <string[]>error || [];
			this.storage.set('log-error', errorLog);
			errorLog.push(msg);
			if (window.cordova) {
				//this.firebase.logError(msg);
			}
		});
	}

	event(eventName: string, data?: any) {
		this.debug('EVENT: ' + eventName, data);

		data = data || {};

		if (window.cordova) {
			//this.firebase.logEvent(eventName, data)
			//	.catch(error => console.error('Error logging event: ' + error.message));
		}
	}
}