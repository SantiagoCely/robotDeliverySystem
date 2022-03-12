import { Injectable } from '@angular/core';
//import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
//import * as firebase from "firebase/app";
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

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
    const menuRef = doc(this.afs, 'MenuItems/');
    return docData(menuRef) as Observable<MenuItem>;
  }
  */

  updateOrder(order: Order, item: String){
    const orderRef = doc(this.afs, `Orders/${order.id}`);
    return updateDoc(orderRef, {items: item});

  }
}
