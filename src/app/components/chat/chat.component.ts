import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {


    chatStringsJobSeeker: Array<string> = [
        'Hey! I\'m Lauren from HyrSkills.',
        'Now let’s create your profile!',
        'To find your perfect job, we need to ask you a few questions … Oh, and don’t worry, we don’t need your resume.',
        'As you know, we focus on the things that matter like your skills, experience, availability, and salary expectations.'
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
    hideLoadMore: boolean = true;
    interval: any;
    moreInterval: any;
    finished: boolean = false;

    constructor(

    ) {

    }

    ngOnInit() {
        if (this.type == 'employer') {
            this.chatStrings = this.chatStringsEmployer;
            this.maxMessage = 5;
        }
        else {
            this.chatStrings = this.chatStringsJobSeeker;
            this.maxMessage = 4;
        }
        this.interval = setInterval(() => {
            if (this.currentMessage < this.maxMessage) {
                this.currentMessage++;
            }
            else {
                clearInterval(this.interval);
                clearInterval(this.moreInterval);
                this.finished = true;
                this.hideLoadMore = true; 
                

            }
        }, 3000);

        this.moreInterval = setInterval(() => {
            this.hideLoadMore = !this.hideLoadMore;
        }, 1500);
    }

    onFinish(){
       this.chatFinished.emit();
    }


}
