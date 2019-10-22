import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Business } from '../../models/business';

@Component({
    selector: 'business-profile-component',
    templateUrl: './business-profile.component.html',
    styleUrls: ['./business-profile.component.scss']
})

export class BusinessProfileComponent implements OnInit {

    @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();
    @Input() business: Business;
    enableActions: boolean;

    constructor(
        private apiService: ApiService
    ) {

    }
    ngOnInit() {

    }

    onInterested() {
        this.apiService.put('jobposting/' + this.business.id, { interested: true }).subscribe(
            (result: any) => {
                this.business = new Business(result.data);
            },
            (error: any) => {

            }
        );

    }

    onNotInterested() {
        this.apiService.put('jobposting/' + this.business.id, { interested: false }).subscribe(
            (result: any) => {
                this.business = new Business(result.data);
            },
            (error: any) => {

            }
        );

    }





}
