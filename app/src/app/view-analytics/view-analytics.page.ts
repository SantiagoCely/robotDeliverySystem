import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.page.html',
  styleUrls: ['./view-analytics.page.scss'],
})
export class ViewAnalyticsPage implements OnInit {

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
  ) { }

  ngOnInit() {
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
  
}
