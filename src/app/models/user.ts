import { UserProfile } from './user_profile';
import { UserPreferences } from './user_preferences';
import { Business } from './business';
import { JobPosting } from './job-posting';

export class User {
    id: number;
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    address: string = '';
    type: string;
    profile: UserProfile;
    preferences: UserPreferences;
    status: string = 'unconfirmed';
    business: Business;
    jobPosting: JobPosting;

    constructor(data?: any) {

        if (data) {
            this.id = data.id;
            this.username = data.username;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.password = data.password;
            this.address = data.address;
            this.type = data.type;
            this.status = data.status;

            if (data.profile) {
                this.profile = new UserProfile(data.profile);
            } else {
                this.profile = new UserProfile();
            }

            if (data.preferences) {
                this.preferences = new UserPreferences(data.preferences);
            } else {
                this.preferences = new UserPreferences();
            }
            this.business = data.business;
            this.jobPosting = data.jobPosting;
        } else {
            this.preferences = new UserPreferences();
            this.profile = new UserProfile();
            this.business = new Business;
            this.jobPosting = new JobPosting;
        }
    }
}
