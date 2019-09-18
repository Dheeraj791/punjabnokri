import { Business } from './business';
import { Experience } from './experience';
import { Skill } from './skill';

export class JobPosting {

    id: number;
    title: string;
    fullTime: boolean;
    partTime: boolean;
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    weekend: boolean;
    minSalary: string;
    maxSalary: string;
    startDate: string;
    address: string;
    interested: boolean;
    score: number = 50;
    description: string;
    business: Business;
    experience: Experience[];
    skills: Skill[];

    constructor(data?: any) {
        if (data) {
            this.id = data.id || null;
            this.title = data.title;
            this.fullTime = data.fullTime;
            this.partTime = data.partTime;
            this.morning = data.morning;
            this.afternoon = data.afternoon;
            this.evening = data.evening;
            this.weekend = data.weekend;
            this.minSalary = data.minSalary;
            this.maxSalary = data.maxSalary;
            this.address = data.address;
            if (data.startDate) {
                this.startDate = new Date(data.startDate).toISOString();
            }
            this.score = data.score;
            this.interested = data.interested;
            this.description = data.description;
            if (data.experience) {
                this.experience = data.experience;
            }
            if (data.skills) {
                this.skills = data.skills;
            }
        } else {
            this.title = '';
            this.fullTime = null;
            this.partTime = null;
            this.morning = null;
            this.afternoon = null;
            this.evening = null;
            this.weekend = null;
            this.minSalary = null;
            this.maxSalary = null;
            this.description = '';
            this.interested = false;
            this.address = '';
            this.experience = [];
            this.skills = [];
        }
    }

    public static initializeArray(objects: any): JobPosting[] {

        const results: JobPosting[] = [];

        for (let i = 0; i < objects.length; i++) {
            const obj = new JobPosting(objects[i]);
            results.push(obj);
        }

        return results;
    }

    public addExperience() {
        const experience = new Experience();
        this.experience.push(experience);
    }
}
