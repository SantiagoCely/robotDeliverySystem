import { Component, OnInit, OnDestroy} from '@angular/core';
import { EventsService } from './services/events.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import { IonicAuthService } from './ionic-auth.service';
import { AnalyticsService } from './services/analytics.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  message: string;
  subscription: Subscription;
  constructor(

    private router: Router,
    private events: EventsService,
    private ionicAuthService: IonicAuthService,
    private analyticsService: AnalyticsService,

  ) { this.initializeApp(); }

  initializeApp() {
    this.analyticsService.startTrackerWithId('G-BEP5XWQ71Y');
    //this.analyticsService.startTrackerWithId('G-ZDF586HMBY');
}

  ngOnInit(){
    this.subscription = this.events.currentMessage.subscribe(message => this.message = message)
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

  goToViewOrder() {
    this.verifyAdminStatus();
    this.router.navigateByUrl('view-order');
  }

  goToMenu() {
    this.verifyAdminStatus()
    this.router.navigateByUrl('browse-menu');
  }

  goToAccount() {
    this.verifyAdminStatus();
    this.router.navigateByUrl('customer-login');
  }

  verifyAdminStatus() {
    if (this.ionicAuthService.isAdminLoggedIn()){
      this.ionicAuthService.signoutAdmin();
      console.log('Admin has been logged out');
    }
  }


}
