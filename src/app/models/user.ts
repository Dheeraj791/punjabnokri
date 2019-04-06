
export class User {
    username: string = '';
    firstname: string = '';
    lastname: string = '';
    email: string = '';
    password: string = '';
    address: string = '';
    userType: string;

    constructor(data?: any) {
        if (data) {
            this.username = data.username;
            this.firstname = data.firstname;
            this.lastname = data.lastname;
            this.email = data.email;
            this.password = data.password;
            this.address = data.address;
            this.address = data.address;
            this.userType = data.userType;
        }
    }
}
