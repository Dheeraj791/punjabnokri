import { UserProfile } from './user_profile';
import { UserPreferences } from './user_preferences';
import { Business } from './business';
import { JobPosting } from './job-posting';

export class User {
    id: number;
    username: string = '';
    name: string = ''; 
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
    experience: Experience[];
    skills: Skill[];

    constructor(data?: any) {

        if (data) {
            this.id = data.id;
            this.name = data.firstName + ' ' + data.lastName;
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
            this.business = new Business(data.business) || new Business;

            if (data.experience) {
                this.experience = data.experience;
            }
            if (data.skills) {
                this.skills = data.skills;
            }
        } else {
            this.preferences = new UserPreferences();
            this.profile = new UserProfile();
            this.business = new Business;
            this.experience = [];
            this.skills = [];
        }
    }

    public static initializeArray(objects: any): User[] {

        const results: User[] = [];

        for (let i = 0; i < objects.length; i++) {
            const obj = new User(objects[i]);
            results.push(obj);
        }

        return results;
    }

    public addExperience() {
        const experience = new Experience();
        this.experience.push(experience);
    }

    public addExperiencebyNumber(iteration: number) {
        for (let i = 0; i < iteration; i++) {
            this.addExperience();
        }
    }
}


export class Experience {
    id: number;
    categoryId: null;
    numberYears: number;
    title: string;
    industry: string;
}


export class Skill {


}
