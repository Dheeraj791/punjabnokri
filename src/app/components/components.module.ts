import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RatingComponent } from './rating/rating.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ScheduleFilterPage } from './schedule-filter/schedule-filter';

@NgModule({
    declarations: [
        RatingComponent,
        HeaderComponent,
        ScheduleFilterPage
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        RatingComponent,
        HeaderComponent,
        ScheduleFilterPage
    ],
    entryComponents: [
        ScheduleFilterPage
    ]
})
export class HyrSkillsModule { }
