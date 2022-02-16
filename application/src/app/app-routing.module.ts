import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ShouldLoginComponent } from './should-login.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: 'browse-menu', //redirect to home later??
      pathMatch: 'full',
    },
    {
      path: 'browse-menu',
      loadChildren: () =>
        import('./browse-menu/browse-menu.module').then(
          (m) => m.BrowseMenuPageModule
        ),
    },
    {
      path: 'view-order',
      loadChildren: () =>
        import('./view-order/view-order.module').then(
          (m) => m.ViewOrderPageModule
        ),
    },
    {
      path: 'account',
      loadChildren: () =>
        import('./account/account.module').then((m) => m.AccountPageModule),
    },
    {
      path: 'employee',
      loadChildren: () =>
        import('./features/employee/employee.module').then(
          (m) => m.EmployeeModule
        ),
      //data: {role: 'Manager'},
    },
    {
      path: 'position',
      loadChildren: () =>
        import('./features/position/position.module').then(
          (m) => m.PositionModule
        ),
      //data: {role: 'Manager'},
    },
    {
      path: 'admin',
      loadChildren: () =>
        import('./features/admin/admin.module').then((m) => m.AdminModule),
      //data: {role: 'Manager'},
    },
    {
      path: 'appetizers',
      loadChildren: () =>
        import('./features/appetizers/appetizers.module').then(
          (m) => m.AppetizersModule
        ),
    },
    {
      path: 'main_course',
      loadChildren: () =>
        import('./features/main_course/main-course.module').then(
          (m) => m.Main_CourseModule
        ),
    },
    {
      path: 'dessert',
      loadChildren: () =>
        import('./features/dessert/dessert.module').then((m) => m.DesertModule),
    },
    {
      path: 'manager',
      loadChildren: () =>
        import('./features/manager/manager.module').then(
          (m) => m.ManagerModule
        ),
    },
    {
      path: 'about',
      loadChildren: () =>
        import('./about/about.module').then((m) => m.AboutModule),
    },
  ]),

  { path: 'should-login', component: ShouldLoginComponent },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
