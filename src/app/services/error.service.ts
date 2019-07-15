import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorService {
    constructor(
        public alertCtrl: AlertController
    ) {

    }

    async showAlert(header, message, buttonText = 'OK', handler?: Function) {

        const buttons = [{
            text: buttonText,
            handler: null
        }];

        if (handler) {
            buttons[0].handler = handler;
        }

        const alert = await this.alertCtrl.create({
            header: header,
            subHeader: message,
            buttons: buttons
        });

        await alert.present();
    }

	/*
	* Usage:
	*	alert.onDidDismiss((data) => {
	*		console.log('Yes/No', data);
	*	});
	*/

    async showConfirm(header, message, okText, cancelText) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: [
                {
                    text: cancelText,
                    role: 'cancel',
                    handler: () => {
                        alert.dismiss(false);
                        return false;
                    }
                },
                {
                    text: okText,
                    handler: () => {
                        alert.dismiss(true);
                        return false;
                    }
                }
            ]
        });
        await alert.present();
    }
}