
export class UserPreferences {
    language: string;
    timezone: string;
    notificationOn: boolean;
    promotionsOffersOns: boolean;

    constructor(data?: any) {
        if (data) {
            this.language =  data.language;
            this.timezone = data.timezone;
            this.notificationOn = data.notificationOn;
            this.promotionsOffersOns = data.promotionsOffersOns; 
        }
    }
}
