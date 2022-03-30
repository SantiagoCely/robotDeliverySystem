import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.page.html',
  styleUrls: ['./view-analytics.page.scss'],
})
export class ViewAnalyticsPage implements OnInit {
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.ionicAuthService.userDetails().subscribe(response => {
      if (response) {
        if (response.uid !== 'viKs5b2K9Lhb8ZxQHaNyuMTPdoC3') {
          this.router.navigateByUrl('browse-menu');
          console.log('You do not have admin privileges');
        }
      } else {
        this.router.navigateByUrl('browse-menu');
        console.log(response);
      }
    }, error => {
      console.log(error);
      this.router.navigateByUrl('browse-menu');
    })
  }

  ngOnDestroy() {
    // Unsubscribe from elements that are not needed outside of this scope
    this.userSubscription.unsubscribe();
  }

}
