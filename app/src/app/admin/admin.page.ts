import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { CrudService } from '../services/crud.service';
import { UserRequest } from '../interfaces/user-requests';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  userRequests: UserRequest[] = [];
  requestSubscription : Subscription;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    if (!this.ionicAuthService.isAdminLoggedIn()){
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
    this.viewUserRequests();
  }

  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
    this.requestSubscription.unsubscribe();
}

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('browse-menu');
      })
      .catch(error => {
        console.log(error);
      })
  }



  viewUserRequests() {
    this.requestSubscription = this.crudService.getUserRequests().subscribe(res => {
      this.userRequests = res;
    });
  }

  acknowledgeRequest(id) {
    this.crudService.updateRequest(id);
  }

  goToCurrentOrders() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('view-current-orders');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  goToEditMenu() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('edit-menu');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  goToEditLayout() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('edit-layout');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }

  goToViewAnalytics() {
    if (this.ionicAuthService.isAdminLoggedIn()) {
      this.router.navigateByUrl('view-analytics');
    } else {
      console.log('Current user does not have admin priviledges')
      this.router.navigateByUrl('browse-menu');
    }
  }


}