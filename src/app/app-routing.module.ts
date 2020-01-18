import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
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
    path: 'tutorial',
    loadChildren: './pages/tutorial/tutorial.module#TutorialModule'
  },
  {
    path: 'signup-jobseeker',
    loadChildren: './pages/signup-jobseeker/signup-jobseeker.module#SignUpJobseekerModule',
  },
  {
    path: 'signup-employer',
    loadChildren: './pages/signup-employer/signup-employer.module#SignUpEmployerModule',
  },
  {
    path: 'app',
    loadChildren: './pages/tabs-page/tabs-page.module#TabsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'user-form', 
    loadChildren: './pages/user-form/user-form.module#UserFormPageModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
