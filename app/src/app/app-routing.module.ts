import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-order', //redirect to home later??
    pathMatch: 'full'
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
    path: 'customer-login',
    loadChildren: () => import('./customer-login/customer-login.module').then( m => m.CustomerLoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
   path: 'create-new-menu-item-modal',
   loadChildren: () => import('./modals/create-new-menu-item-modal/create-new-menu-item-modal.module').then( m => m.CreateNewMenuItemModalPageModule)
 },
  {
    path: 'pay',
    loadChildren: () => import('./pay/pay.module').then( m => m.PayPageModule)
  }


  /*{
    path: 'edit-menu-modal',
    loadChildren: () => import('./edit-menu-modal/edit-menu-modal.module').then( m => m.EditMenuModalPageModule)
  },
  {
    path: 'create-new-menu-item',
    loadChildren: () => import('./modals/create-new-menu-item/create-new-menu-item.module').then( m => m.CreateNewMenuItemPageModule)
  },
  {
    path: 'create-new-menu-item-modal',
    loadChildren: () => import('./modals/create-new-menu-item-modal/create-new-menu-item-modal.module').then( m => m.CreateNewMenuItemModalPageModule)
  }
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
