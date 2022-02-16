import { Component, OnInit, OnDestroy} from '@angular/core';
import { EventsService } from './services/events.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";


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
    private events: EventsService
  ) {
    //this.initializeApp();
  }

  ngOnInit(){
    this.subscription = this.events.currentMessage.subscribe(message => this.message = message)
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

  viewOrder() {
    this.router.navigateByUrl('view-order');
  }


}
