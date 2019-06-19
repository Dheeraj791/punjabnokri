import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RatingComponent } from './rating/rating.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ScheduleFilterPage } from './schedule-filter/schedule-filter';
import { ConfirmAccount } from './confirm-account/confirm-account.component';

@NgModule({
    declarations: [
        RatingComponent,
        HeaderComponent,
        ChatComponent,
        ScheduleFilterPage,
        ConfirmAccount
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        RatingComponent,
        HeaderComponent,
        ChatComponent,
        ScheduleFilterPage,
        ConfirmAccount
    ],
    entryComponents: [
        ScheduleFilterPage,
        ConfirmAccount
    ]
})
export class HyrSkillsModule { }
