import { Injectable } from '@angular/core';
//import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore, collection, collectionData, doc, onSnapshot , docData, addDoc, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
//import * as firebase from "firebase/app";
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';
import Account from '../interfaces/account';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Account2 from '../models/account2.model';
//import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  accountRef: AngularFireList<any>;
  private dbPath = '/Accounts';

  accountsRef2: AngularFirestoreCollection<Account>;

  constructor(
    private afs: Firestore,
    private router: Router,
    private afa: AngularFirestore,
    ) {
      this.accountsRef2 = afa.collection(this.dbPath);
     }

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

  createAccount(account: Account, id){
    return new Promise<any>((resolve, reject) => {
      this.afa.collection("Accounts").doc(id).set({
        ... account
      })
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  renderMenu(localRef, dbRef){
    //To implement
  }
}
