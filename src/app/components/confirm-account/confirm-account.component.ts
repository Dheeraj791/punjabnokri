import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'confirm-account',
    templateUrl: './confirm-account.component.html',
    styleUrls: ['./confirm-account.component.scss']
})

export class ConfirmAccount implements OnInit {
    sentCode: boolean = false;
    user: User;
    code: string;
    openConfirm: boolean = false;

    @Output() codeSubmitted: EventEmitter<any> = new EventEmitter();
    constructor(
        private apiService: ApiService,
        private errorService: ErrorService,
        private userService: UserService
    ) {
        this.userService.getUser().then((user: User) => {
            this.user = user;
        });
    }

    ngOnInit() {

    }

    onResend() {
        this.apiService.post('users/resendconfirm', {}).subscribe(
            (result: any) => {
                this.sentCode = true;
                this.errorService.showAlert('Success', 'Please check your inbox for the confirmation link.');
            },
            (error: any) => {
                this.errorService.showAlert('Error', error.message);
            }

        );
    }

    onSubmit() {
        if (this.code === '') {
            return;
        }
        this.codeSubmitted.emit();
        this.apiService.post('users/confirmcode', { code: this.code }).subscribe(
            (result: any) => {
                this.user.status = 'approved';
                this.userService.setUser(this.user);
                this.codeSubmitted.emit(true);
                this.errorService.showAlert('Success', 'Your account has been confirmed.');
            },
            (error: any) => {
                this.errorService.showAlert('Error', error.message);
            }

        );
    }

    onOpenConfirm() {
        this.openConfirm = !this.openConfirm;
    }

}
