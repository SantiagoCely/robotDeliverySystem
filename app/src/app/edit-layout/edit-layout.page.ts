import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { CrudService } from '../services/crud.service';
import { RestLayout } from '../interfaces/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.page.html',
  styleUrls: ['./edit-layout.page.scss'],
})
export class EditLayoutPage implements OnInit, OnDestroy {
  restaurantLayout: RestLayout[]=[];
  layoutSubscription : Subscription;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.viewLayout()
    if (!this.ionicAuthService.isAdminLoggedIn()){
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  goHome() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('admin');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  viewLayout() {
    this.layoutSubscription = this.crudService.getLayout().subscribe(res => {
      this.restaurantLayout = res;
    });
  }

  changeAvailability(tableId: string, status: boolean) {
    this.crudService.changeAvailability(tableId, !status);
  }


  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
    this.layoutSubscription.unsubscribe();
  }
}
