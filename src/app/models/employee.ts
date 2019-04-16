
export class Employee {
    username: string = '';
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    address: string = '';

    constructor(data?: any) {
        if (data) {
            this.username = data.username;
            this.firstname = data.firstname;
            this.lastname = data.lastname;
            this.email = data.email;
            this.address = data.address;
            this.address = data.address;
        }
    }
}
