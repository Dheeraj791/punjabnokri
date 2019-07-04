import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { JobPosting } from '../../models/job-posting';

@Component({
    selector: 'job-posting-component',
    templateUrl: './job-posting.component.html',
    styleUrls: ['./job-posting.component.scss']
})

export class JobPostingComponent implements OnInit {

    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit() {

    }

}
