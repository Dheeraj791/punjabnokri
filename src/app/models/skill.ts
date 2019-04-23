
export class Skill {
    id: number;
    name: string;
    categoryName: string;
    categoryId: number;
    value: number; 

    constructor(data?: any) {

        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.categoryId = data.category_id;
            this.categoryName = data.category_name;
            this.value = data.value; 
           
        }
    }

    public static initializeArray(objects: any): Skill[] {

		let results: Skill[] = [];

		for (let i = 0; i < objects.length; i++) {
			let obj = new Skill(objects[i]);
			results.push(obj);
		}

		return results;
	}

}


export class SkillCategory {
    id: number; 
    name: string;
    order:number; 

    constructor(data?: any) {
        this.id = data.id; 
        this.name = data.name; 
        this.order = data.order; 
        
    }

}
