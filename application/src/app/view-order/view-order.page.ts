import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { CrudService } from 'src/app/services/crud.service';
import { Subscription } from 'rxjs';
import { Firestore, doc, onSnapshot, DocumentReference, docSnapshots } from '@angular/fire/firestore';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit, OnDestroy {
  order: Order;
  notSubmitted: string[]; //string array of item IDs
  message: string;
  subscription: Subscription;
  constructor(
    private afs: Firestore,
    private crudService: CrudService,
    public events: EventsService

  //  private activatedRoute: ActivatedRoute,
  //  private router: Router
  ){  }

  ngOnInit() {
    console.log("View Order module");
    //this.subscription = this.events.currentMessage.subscribe(message => this.message = message);
  }
<<<<<<< Updated upstream
/* to be implemented later on to add s
=======

>>>>>>> Stashed changes
  addToOrder(item){
    this.notSubmitted.push(item);
    console.log("Item with ID ", item, "was added to cart");
  }
<<<<<<< Updated upstream
  */
=======
>>>>>>> Stashed changes

  submitOrder(){
    //order cannot be empty
    this.order.items.push(this.notSubmitted.shift());
    if (this.order.id == null){
      this.crudService.createOrder(this.order).then(function(docRef){
        console.log("Order created: ", docRef.id);
      })
    }

    for (var id in this.notSubmitted){
      this.order.items.push(id);
      this.crudService.updateOrder(this.order, id);
    }

    // all items have been submitted and the array can be cleared
    this.notSubmitted = [];
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

}
