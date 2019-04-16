
export class UserProfile {

    fullTime: boolean;
    partTime: boolean;
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    weekend: boolean;
    desiredSalary: number;
    activelySeekingWork: boolean; 
    why: string; 

    constructor(data?: any) {
        if (data) {
            this.fullTime = data.fullTime;
            this.partTime = data.partTime;;
            this.morning = data.morning;;
            this.afternoon = data.afternoon;
            this.evening = data.evening;;
            this.weekend = data.weekend;;
            this.desiredSalary = data.desiredSalary;
            this.activelySeekingWork = data.activelySeekingWork;
            this.why = data.why;
        }
    }
}
