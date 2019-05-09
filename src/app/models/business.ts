
export class Business {

    id: number; 
    headOfficeAddress: string = '';
    telephone: string = '';
    name: string = '';
    whyJoin: string = '';
    about: string = '';

    constructor(data?: any) {
        if (data) {
            this.id = data.id; 
            this.headOfficeAddress = data.username;
            this.telephone = data.firstname;
            this.name = data.lastname;
            this.whyJoin = data.why_join;
            this.about = data.address;
        }
    }
}
