import { JobPosting } from './job-posting';

export class Business {

    id: number;
    headOfficeAddress: string = '';
    telephone: string = '';
    name: string = '';
    whyJoin: string = '';
    about: string = '';
    jobPosting: JobPosting;
    jobPostings: JobPosting[];

    constructor(data?: any) {
        if (data) {
            this.id = data.id;
            this.headOfficeAddress = data.headOfficeAddress;
            this.telephone = data.telephone;
            this.name = data.name;
            this.whyJoin = data.whyJoin;
            this.about = data.about;
            this.jobPosting = new JobPosting(data.jobPosting) || new JobPosting();
        }
    }
}
