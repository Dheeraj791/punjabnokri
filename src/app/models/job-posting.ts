
export class JobPosting {

    id:number; 
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
    address:string;

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
        }
    }
}