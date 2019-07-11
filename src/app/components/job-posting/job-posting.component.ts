import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { JobPosting } from '../../models/job-posting';

@Component({
    selector: 'job-posting-component',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss']
})

export class JobPostingComponent implements OnInit {
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
               
            },
            (error: any) => {

            }
        );

    }

    onNotInterested() {
        this.apiService.put('jobposting/' + this.jobPosting.id, { interested: false }).subscribe(
            (result: any) => {
                
            },
            (error: any) => {

            }
        );

    }

}
