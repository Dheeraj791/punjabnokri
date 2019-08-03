import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RatingComponent } from './rating/rating.component';
import { HeaderComponent } from './header/header.component';
import { HeaderPublicComponent } from './header-public/header-public.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ScheduleFilterPage } from './schedule-filter/schedule-filter';
import { ConfirmAccount } from './confirm-account/confirm-account.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { SocialComponent } from './social/social.component';
import { FilterPipe } from '../pipes/filter';

@NgModule({
    declarations: [
        FilterPipe,
        RatingComponent,
        HeaderComponent,
        HeaderPublicComponent,
        ChatComponent,
        ScheduleFilterPage,
        ConfirmAccount,
        SocialComponent,
        BusinessProfileComponent,
        CandidateProfileComponent,
        JobPostingComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        RatingComponent,
        HeaderComponent,
        HeaderPublicComponent,
        ChatComponent,
        ScheduleFilterPage,
        ConfirmAccount,
        SocialComponent,
        BusinessProfileComponent,
        CandidateProfileComponent,
        JobPostingComponent
    ],
    entryComponents: [
        ScheduleFilterPage,
        ConfirmAccount,
        SocialComponent,
        BusinessProfileComponent,
        CandidateProfileComponent,
        JobPostingComponent
    ]
})
export class HyrSkillsModule { }
