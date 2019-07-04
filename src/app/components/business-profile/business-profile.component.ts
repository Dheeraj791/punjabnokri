import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'business-profile-component',
    templateUrl: './business-profile.component.html',
    styleUrls: ['./business-profile.component.scss']
})

export class BusinessProfileComponent implements OnInit {

    @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();
    @Input() var: number;

    constructor(

    ) {

    }

    ngOnInit() {

    }





}
