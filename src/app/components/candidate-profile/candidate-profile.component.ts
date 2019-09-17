import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Candidate } from '../../models/candidate';

@Component({
    selector: 'candidate-profile-component',
    templateUrl: './candidate-profile.component.html',
    styleUrls: ['./candidate-profile.component.scss']
})

export class CandidateProfileComponent implements OnInit {

    @Input() user: Candidate;
    @Input() userId: number;
    @Input() enableActions: boolean = false; 

    constructor(
        private apiService: ApiService
    ) {

    }

    ngOnInit() {
        if (this.userId) {
            this.apiService.get('user/' + this.userId).subscribe(
                (result: any) => {
                    this.user = new Candidate(result.data);
                },
                (error: any) => {

                }
            );
        }
    }

    onInterested() {
        this.apiService.put('candidate/' + this.user.id, { interested: true }).subscribe(
            (result: any) => {

            },
            (error: any) => {

            }
        );

    }

    onNotInterested() {
        this.apiService.put('candidate/' + this.user.id, { interested: false }).subscribe(
            (result: any) => {

            },
            (error: any) => {

            }
        );

    }
}
