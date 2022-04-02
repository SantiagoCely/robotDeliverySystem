import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.page.html',
  styleUrls: ['./edit-layout.page.scss'],
})
export class EditLayoutPage implements OnInit, OnDestroy {

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
  
  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
  }
}
