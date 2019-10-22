
export class UserProfile {

    fullTime: boolean;
    partTime: boolean;
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    weekend: boolean;
    desiredSalary: number;
    desiredSalaryMin: number;
    desiredSalaryMax: number;
    activelySeekingWork: boolean;
    address: string;
    why: string;

    constructor(data?: any) {
        if (data) {
            this.fullTime = data.fullTime;
            this.partTime = data.partTime;
            this.morning = data.morning;
            this.afternoon = data.afternoon;
            this.evening = data.evening;
            this.weekend = data.weekend;
            this.desiredSalary = data.desiredSalary;
            this.desiredSalaryMin = data.desiredSalaryMin;
            this.desiredSalaryMax = data.desiredSalaryMax;
            this.activelySeekingWork = data.activelySeekingWork;
            this.why = data.why;
            this.address = data.address;
        } else {
            this.fullTime = false;
            this.partTime = false;
            this.morning = false;
            this.afternoon = false;
            this.evening = false;
            this.weekend = false;
            this.desiredSalary = null;
            this.desiredSalaryMin = null;
            this.desiredSalaryMax = null;
            this.activelySeekingWork = false;
            this.why = '';
            this.address = '';
        }
    }
}
