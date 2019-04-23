import { UserProfile } from './user_profile';
import { UserPreferences } from './user_preferences';

export class User {
    id: number; 
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    address: string = '';
    type: string;
    profile: UserProfile; 
    preferences: UserPreferences; 

    constructor(data?: any) {
       
        if (data) {
            this.id = data.id; 
            this.username = data.username;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.password = data.password;
            this.address = data.address;
            this.type = data.type;

            if(data.profile){
                this.profile = new UserProfile(data.profile);
            }
            else{
                this.profile = new UserProfile();
            }

            if(data.preferences){
                this.preferences = new UserPreferences(data.preferences);
            }
            else{
                this.preferences = new UserPreferences();
            }
        }
        else{
            this.preferences = new UserPreferences();
            this.profile = new UserProfile();
        }
    }
}
