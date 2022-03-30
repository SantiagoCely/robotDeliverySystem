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
  userDetail: string;
  userRequests: UserRequest[] = [];
  requestSubscription : Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.ionicAuthService.userDetails().subscribe(response => {
      if (response) {
        if (response.uid !== 'viKs5b2K9Lhb8ZxQHaNyuMTPdoC3') {
          this.router.navigateByUrl('browse-menu');
          console.log('You do not have admin privileges');
        }
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('browse-menu');
      }
    }, error => {
      console.log(error);
      this.router.navigateByUrl('browse-menu');
    })
    this.viewUserRequests();
  }

  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
    this.requestSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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
    this.router.navigateByUrl('view-current-orders');
  }

  goToEditMenu() {
    this.router.navigateByUrl('edit-menu');
  }

  goToEditLayout() {
    this.router.navigateByUrl('edit-layout');
  }

  goToViewAnalytics() {
    this.router.navigateByUrl('view-analytics');
  }


}