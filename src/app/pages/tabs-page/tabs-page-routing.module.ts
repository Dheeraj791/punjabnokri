import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: '../map/map.module#MapModule'
          }
        ]
      },
      {
        path: 'matches',
        children: [
          {
            path: '',
            loadChildren: '../matches/matches.module#MatchesModule'
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: '../about/about.module#AboutModule'
          }
        ]
      },
      {
        path: 'support',
        children: [
          {
            path: '',
            loadChildren: '../support/support.module#SupportModule'
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: '../account/account.module#AccountModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: 'candidate/:profileId',
            loadChildren: '../candidate/candidate.module#CandidateModule'
          },
          {
            path: 'business/:businessId',
            loadChildren: '../business/business.module#BusinessModule'
          },
          {
            path: 'job-posting/:jobPostingId',
            loadChildren: '../job-posting/job-posting.module#JobPostingModule'
          }
        ]
      }
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

