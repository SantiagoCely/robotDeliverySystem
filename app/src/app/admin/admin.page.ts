import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  userDetail: string;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService
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