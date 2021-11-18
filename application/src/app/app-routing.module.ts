import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.TabsPageModule)
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.TabsPageModule),
    data: { roles: [Role.Staff] }
},
{
    path: 'login',
    component: LoginComponent
},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
