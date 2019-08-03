import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { JobPosting } from '../../models/job-posting';
import { Router } from '@angular/router';

@Component({
    selector: 'job-posting-component',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss']
})

export class JobPostingComponent implements OnInit {
    @Input() jobPosting: JobPosting;
    @Input() enableActions: boolean = false; 

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {

    }

    ngOnInit() {

    }


    onInterested() {
        this.apiService.put('jobposting/interested/' + this.jobPosting.id, { interested: true }).subscribe(
            (result: any) => {
               this.jobPosting.interested = true;
               this.onGoBacktoMatches();
            },
            (error: any) => {

            }
        );

    }

    onNotInterested() {
        this.apiService.put('jobposting/interested/' + this.jobPosting.id, { interested: false }).subscribe(
            (result: any) => {
                this.jobPosting.interested = false;
                this.onGoBacktoMatches();
            },
            (error: any) => {

            }
        );

    }

    onGoBacktoMatches(){
        this.router.navigateByUrl('/app/tabs/matches');
    }

    swipeEvent($event){
        console.log($event);
    }

}
