import { Experience } from './experience';
import { Skill } from './skill';
import { UserProfile } from './user_profile';

export class Candidate {
    id: number;
    username: string = '';
    name: string = ''; 
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    address: string = '';
    type: string;
    score: number;
    interested: boolean;
    experience: Experience[];
    skills: Skill[];
    profile: UserProfile; 

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
            this.score = data.score;
            this.interested = data.interested;

            if (data.experience) {
                this.experience = data.experience;
            }
            if (data.skills) {
                this.skills = data.skills;
            }

            if (data.profile) {
                this.profile = new UserProfile(data.profile);
            } else {
                this.profile = new UserProfile();
            }
        } else{
                this.id = null;
                this.name = '';
                this.username = '';
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.password = '';
                this.address = '';
                this.score = null;
                this.interested = null;
                this.profile = new UserProfile;
        }
    }

    public static initializeArray(objects: any): Candidate[] {

        const results: Candidate[] = [];

        for (let i = 0; i < objects.length; i++) {
            const obj = new Candidate(objects[i]);
            results.push(obj);
        }

        return results;
    }
}
    



