import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {


    chatStringsJobSeeker: Array<string> = [
        'Hey! I\'m Lauren from HyrSkills.',
        'As you know, we focus on the things that matter like your skills, experience, availability, and salary expectations.',
        'To find your perfect job, we need to ask you a few questions … Oh, and don’t worry, we don’t need your resume.',
        'Now let’s create your profile!'
    ];

    chatStringsEmployer: Array<string> = [
        'Hi, I\'m Lauren. Welcome to HyrSkills.',
        'We are excited to help you hire your next employee!',
        'And… we know you deserve better! So let us do the hard work.',
        'By focusing on skills and experience, we find the candidate that meets your need.',
        'So… If you’re ready, let\'s get started!'
    ];

    chatStrings: any = [];
    currentMessage = 0;
    maxMessage = 0;
    @Input() type: string;
    @Output() chatFinished = new EventEmitter();
    showLoadMore: boolean = true;
    interval: any;
    moreInterval: any;
    finished: boolean = false;

    constructor(
        private storage: Storage
    ) {

    }

    ionViewDidEnter() {
       
    }


    ngOnInit(){
        this.storage.get('user_type').then(res => {
            if (this.type === 'employer') {
                this.chatStrings = this.chatStringsEmployer;
                this.maxMessage = 5;
                this.showChatMessage(1500);
                this.showChatMessage(3500);
                this.showChatMessage(5500);
                this.showChatMessage(7500, true);


            } else {
                this.chatStrings = this.chatStringsJobSeeker;
                this.maxMessage = 4;
                this.showChatMessage(1500);
                this.showChatMessage(3500);
                this.showChatMessage(5500, true);

            }
        });
    }

    showChatMessage(timerInterval, last = false) {
        setTimeout(
            () => {
                this.currentMessage++;
                if (this.maxMessage - 2 < this.currentMessage) {
                    this.finished = true;
                }
            }, timerInterval);

        if (!last) {
            setTimeout(() => { this.toggleLoadMore(true); }, timerInterval + 500);
            setTimeout(() => { this.toggleLoadMore(false); }, timerInterval + 1900);
        }
    }

    toggleLoadMore(show) {
        this.showLoadMore = show;
    }

    onFinish() {
        this.chatFinished.emit();
    }

}
