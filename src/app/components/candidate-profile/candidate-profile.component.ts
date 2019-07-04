import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'candidate-profile-component',
    templateUrl: './candidate-profile.component.html',
    styleUrls: ['./candidate-profile.component.scss']
})

export class CandidateProfileComponent implements OnInit {

    @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();
    @Input() var: number;

    constructor(

    ) {

    }

    ngOnInit() {

    }





}
