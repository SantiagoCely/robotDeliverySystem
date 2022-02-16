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

  createOrder(order: Order){
    const orderRef = collection(this.afs, 'Orders');
    return addDoc(orderRef, order);
  }

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

  addMenuItemCategory(id, new_category: string){
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    var update_category = [];
    update_category.push(new_category);
    this.getMenuById(id).subscribe(res => {
      res.category.forEach(category => {
        update_category.push(category);
      })
    })
    return updateDoc(menuRef, {category: update_category});

  }
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
  }

  removeMenuItem(id) {
    const menuRef = doc(this.afs, `MenuItems/${id}`);
    return deleteDoc(menuRef);
  }

  updateOrder(order: Order, item: string){
    const orderRef = doc(this.afs, `Orders/${order.id}`);
    return updateDoc(orderRef, {items: item});

  }
}