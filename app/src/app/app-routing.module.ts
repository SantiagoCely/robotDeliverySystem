import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'browse-menu', //redirect to home later??
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'browse-menu',
    loadChildren: () => import('./browse-menu/browse-menu.module').then( m => m.BrowseMenuPageModule)
  },
  {
    path: 'view-order',
    loadChildren: () => import('./view-order/view-order.module').then( m => m.ViewOrderPageModule)
  },
  {
    path: 'admin-login',
    loadChildren: () => import('./admin-login/admin-login.module').then( m => m.AdminLoginPageModule)
  },
  {
    path: 'view-current-orders',
    loadChildren: () => import('./view-current-orders/view-current-orders.module').then( m => m.ViewCurrentOrdersPageModule)
  },
  {
    path: 'view-analytics',
    loadChildren: () => import('./view-analytics/view-analytics.module').then( m => m.ViewAnalyticsPageModule)
  },
  {
    path: 'edit-menu',
    loadChildren: () => import('./edit-menu/edit-menu.module').then( m => m.EditMenuPageModule)
  },
  {
    path: 'edit-layout',
    loadChildren: () => import('./edit-layout/edit-layout.module').then( m => m.EditLayoutPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'customer-login',
    loadChildren: () => import('./customer-login/customer-login.module').then( m => m.CustomerLoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
