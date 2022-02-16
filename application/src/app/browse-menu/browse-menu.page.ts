import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
//import { AlertController } from '@ionic/angular';
import { CrudService } from '../services/crud.service';
import { EventsService } from '../services/events.service';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  doc,
  onSnapshot,
  DocumentReference,
  docSnapshots,
} from '@angular/fire/firestore';
import { MenuItem } from '../interfaces/menu-item';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-browse-menu',
  templateUrl: './browse-menu.page.html',
  styleUrls: ['./browse-menu.page.scss'],
})

//@Output() menuToApp = new EventsService<String>();
export class BrowseMenuPage implements OnInit {
  //menuItems: MenuItem[];
  types = ['Burgers', 'Cold Drinks', 'Chicken & Fish', 'Sweets & Treats'];
  menuItems: MenuItem[] = [];
  message: string;
  subscription: Subscription;
  constructor(
    private afs: Firestore,
    //private afs: AngularFirestore,
    private crudService: CrudService,
    private cd: ChangeDetectorRef,
    //  private alertCtrl: AlertController,
    private events: EventsService //private router: Router,
  ) //public events: EventsService

  {}
  /*
  addToOrder(id){
    this.events.changeMessage(id);
  }
*/

  ngOnInit() {
    this.crudService.getMenuItems().subscribe((res) => {
      this.menuItems = res;
      this.cd.detectChanges();
    });
    //  this.subscription = this.events.currentMessage.subscribe(message => this.message = message);

    /*
    this.menuItems$ = this.afs.collection<MenuItem>('MenuItems')
                      .snapshotChanges().pipe( map (actions =>
                      actions.map( a =>{
                        const data = a.payload.doc.data() as MenuItem;
                        const id = a.payload.doc.id;
                        return {
                          id, ...data
                        };
                      }))
                      )
                      */
    /*this.crudService.getMenuItems().subscribe((res) => {
      this.menuItems = res.map((m) => {
        return {
          id: m.payload.doc.id,
          ...m.payload.doc.data() as MenuItem
        }
      })
    })*/
  }

  //This method sends the item id to view-order
  /*
  publishEvent(id, price){
    this.events.publish('item:added',{
      item: id,
      price: price});
  }
*/
}
