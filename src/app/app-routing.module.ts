import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
  },
  {
    path: 'app',
    loadChildren: './pages/tabs-page/tabs-page.module#TabsModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'create',
    loadChildren: './pages/create/create.module#CreateModule'
  },
  {
    path: 'signup-jobseeker',
    loadChildren: './pages/signup-jobseeker/signup-jobseeker.module#SignUpJobseekerModule'
  },
  {
    path: 'signup-employer',
    loadChildren: './pages/signup-employer/signup-employer.module#SignUpEmployerModule'
  },
  {
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
