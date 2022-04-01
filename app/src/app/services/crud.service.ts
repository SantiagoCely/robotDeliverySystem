import { Injectable } from '@angular/core';
//import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore, collection, collectionData, doc , docData, addDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
//import * as firebase from "firebase/app";
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';
import Account from '../interfaces/account';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireList } from '@angular/fire/compat/database';
import { UserRequest } from '../interfaces/user-requests';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  accountRef: AngularFireList<any>;

  constructor(
    private afs: Firestore,
    private router: Router,
    private afa: AngularFirestore,
    ) { }

  createOrder(order: Order){
    const orderRef = collection(this.afs, 'Orders');
    return addDoc(orderRef, { ... order});
  }

  getMenuItems(): Observable<MenuItem[]>{

    const menuRef = collection(this.afs, 'MenuItems');
    return collectionData(menuRef, { idField: 'id'}) as Observable <MenuItem[]>;


  //  return collectionData(menuRef, {id: 'key'})
    //return this.afs.collection('MenuItems').snapshotChanges();
  }

  getMenuById(id): Observable<MenuItem> {
    const menuRef = doc(this.afs, 'MenuItems', id);
    return docData(menuRef, { idField: 'id' }) as Observable<MenuItem>;
  }

  getMenuById2(id) {
    const menuRef = doc(this.afs, 'MenuItems', id);
    return getDoc(menuRef);
  }


/*
  getMenuByType(type): Observable<MenuItem[]> {
    const menuRef = doc(this.afs, 'MenuItems/');
    return docData(menuRef) as Observable<MenuItem>;
  }
  */

  updateOrder(order: Order, item: string, id){
    const orderRef = doc(this.afs, 'Orders', id);
    return updateDoc(orderRef, {items: item});

  }

  async createAccount(account: Account, id: string){
    return new Promise<any>(async (resolve, reject) => {
      await this.afa.collection("Accounts").doc(id).set({
        ... account
      })
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  getUserRequests(): Observable<UserRequest[]>{
    const requestRef = collection(this.afs, 'Nlp');
    return collectionData(requestRef, { idField: 'id'}) as Observable <UserRequest[]>;
  }

  acknowledgeRequest(id) {
    return new Promise<any>(async (resolve, reject) => {
      await this.afa.collection("Nlp").doc(id).delete()
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  updateRequest(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.afa.collection("Nlp").doc(id).update({
        Acknowledged: true,
      })
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
}
