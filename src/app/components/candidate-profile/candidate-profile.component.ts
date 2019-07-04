import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { JobPosting } from '../../models/job-posting';

@Component({
    selector: 'candidate-profile-component',
    templateUrl: './candidate-profile.component.html',
    styleUrls: ['./candidate-profile.component.scss']
})

export class CandidateProfileComponent implements OnInit {

    @Output() searchStringUpdated: EventEmitter<number> = new EventEmitter();
    @Input() jobPosting: JobPosting;

    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit() {

    }

    onInterested() {
        this.apiService.put('jobposting/' + this.jobPosting.id, { interested: true }).subscribe(
            (result: any) => {
                this.jobPosting = new JobPosting(result.data);
            },
            (error: any) => {

            }
        );

    }

    onNotInterested() {
        this.apiService.put('jobposting/' + this.jobPosting.id, { interested: false }).subscribe(
            (result: any) => {
                this.jobPosting = new JobPosting(result.data);
            },
            (error: any) => {

            }
        );

    }





}
