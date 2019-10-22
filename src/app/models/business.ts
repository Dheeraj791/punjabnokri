import { JobPosting } from './job-posting';

export class Business {

    id: number;
    headOfficeAddress: string;
    telephone: string;
    name: string;
    whyJoin: string;
    about: string;
    jobPosting: JobPosting;
    jobPostings: JobPosting[];
    title: string;
    description: SVGAnimatedString;
    score: number;

    constructor(data?: any) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.description = data.description;
            this.headOfficeAddress = data.headOfficeAddress;
            this.telephone = data.telephone;
            this.name = data.name;
            this.whyJoin = data.whyJoin;
            this.about = data.about;
            if (data.jobPosting) {
                this.jobPosting = new JobPosting(data.jobPosting);
            } else {
                this.jobPosting = new JobPosting;
            }
            this.score = data.score;
        } else {
            this.headOfficeAddress = '';
            this.telephone = '';
            this.name = '';
            this.whyJoin = '';
            this.about = '';
            this.jobPosting = new JobPosting;
        }
    }
}
