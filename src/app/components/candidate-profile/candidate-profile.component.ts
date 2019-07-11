import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';

@Component({
    selector: 'candidate-profile-component',
    templateUrl: './candidate-profile.component.html',
    styleUrls: ['./candidate-profile.component.scss']
})

export class CandidateProfileComponent implements OnInit {

    @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();
    @Input() user: User;

    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit() {

    }


    onInterested() {
        this.apiService.put('jobposting/' + this.user.id, { interested: true }).subscribe(
            (result: any) => {
               
            },
            (error: any) => {

            }
        );

    }

    onNotInterested() {
        this.apiService.put('jobposting/' + this.user.id, { interested: false }).subscribe(
            (result: any) => {
                
            },
            (error: any) => {

            }
        );

    }





}
