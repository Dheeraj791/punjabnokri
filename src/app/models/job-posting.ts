
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
    interested:boolean = false; 
    score:number = 50; 
    description: string; 

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
            this.description =  data.description;
        }
    }

    public static initializeArray(objects: any): JobPosting[] {

		let results: JobPosting[] = [];

		for (let i = 0; i < objects.length; i++) {
			let obj = new JobPosting(objects[i]);
			results.push(obj);
		}

		return results;
	}
}
