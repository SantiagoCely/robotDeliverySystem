import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { CrudService } from '../services/crud.service';
import { UserRequest } from '../interfaces/user-requests';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  userDetail: string;
  userRequests: UserRequest[] = [];

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private crudService: CrudService,
  ) { }

  ngOnInit() {
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
    this.viewUserRequests();
  }

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('home');
      })
      .catch(error => {
        console.log(error);
      })
  }

  viewUserRequests() {
    this.crudService.getUserRequests().subscribe(res => {
      this.userRequests = res;
      console.log(this.userRequests);
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