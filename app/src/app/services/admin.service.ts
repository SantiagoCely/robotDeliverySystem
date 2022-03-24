import { Injectable } from '@angular/core';
//import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
//import * as firebase from "firebase/app";
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private afs: Firestore, private router: Router) { }



  getMenuItems(): Observable<MenuItem[]>{

    const menuRef = collection(this.afs, 'MenuItems');
    return collectionData(menuRef, { idField: 'id'}) as Observable <MenuItem[]>;


  //  return collectionData(menuRef, {id: 'key'})
    //return this.afs.collection('MenuItems').snapshotChanges();
  }


  getMenuById(id): Observable<MenuItem> {
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    return docData(menuRef, { idField: 'id' }) as Observable<MenuItem>;
  }
/*
  getMenuByType(type): Observable<MenuItem[]> {
    var menu_items = [];
    this.getMenuItems().subscribe(res => {
      if (res.type == type){
        menu_items.push(res);
      }
    })
    return menu_items;
  }
  */
  editMenuItemName(id, newName: string){
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    return updateDoc(menuRef, {name: newName});
  }

  editMenuItemPrice(id, newPrice: number){
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    return updateDoc(menuRef, {price: newPrice});
  }
  editMenuItemType(id, newType: string){
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    return updateDoc(menuRef, {type: newType});
  }

  editMenuItemCategory(id, new_category: string []){
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    /*var update_category = [];
    update_category.push(new_category);
    this.getMenuById(id).subscribe(res => {
      res.category.forEach(category => {
        update_category.push(category);
      })
    })
    */
    return updateDoc(menuRef, {category: new_category});

  }
  /*
  removeMenuItemCategory(id, remove_category: string){
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    var update_category = []; // temp array to store new category
    this.getMenuById(id).subscribe(res => {
      res.category.forEach((category) =>{
        if (category.includes(remove_category)){
          update_category.push(category);
        }
      })
    })

    return updateDoc(menuRef, {category: update_category});
  }*/

  createMenuItem(item: MenuItem){
    const menuRef = collection(this.afs, 'MenuItems');
    const docRef = addDoc(menuRef, {
      name: item.name,
      price: item.price,
      category: item.category,
      type: item.type,
      image: item.image
    });
    console.log("New menu item id: ", docRef);
    /*
    return addDoc(menuRef, { name: item.name,
                             price: item.price,
                             category: item.category,
                             type: item.type,
                             image: item.image});*/
  }

  removeMenuItem(id) {
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    return deleteDoc(menuRef);
  }

  updateOrder(order: Order, item: string, id){
    const orderRef = doc(this.afs, 'Orders', id);
    return updateDoc(orderRef, {items: item});

  }

  getOrders(): Observable<Order[]> {
    const orderRef = collection(this.afs, 'Orders');
    return collectionData(orderRef, { idField: 'id'}) as Observable <Order[]>;
  }

  getOrderById(id): Observable<Order> {
    const orderRef = doc(this.afs, `Orders/${id}`);
    return docData(orderRef, { idField: 'id' }) as Observable<Order>;
  }
}
