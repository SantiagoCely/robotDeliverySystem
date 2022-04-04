import { Injectable } from '@angular/core';
//import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Firestore, collection, collectionData, doc , docData, addDoc, updateDoc, getDoc, where, query, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
//import * as firebase from "firebase/app";
import { MenuItem } from '../interfaces/menu-item';
import { Order } from '../interfaces/order';
import Account from '../interfaces/account';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireList } from '@angular/fire/compat/database';
import { UserRequest } from '../interfaces/user-requests';
import { RestLayout } from "../interfaces/layout";
import { OrderToPay } from '../interfaces/orderToPay';

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

  getMenuById2(id: string) {
    const menuRef = doc(this.afs, 'MenuItems', id);
    return getDoc(menuRef);
  }


/*
  getMenuByType(type): Observable<MenuItem[]> {
    const menuRef = doc(this.afs, 'MenuItems/');
    return docData(menuRef) as Observable<MenuItem>;
  }
  */

  async updateAccount(firstName: string, lastName: string, id: string){
    console.log(firstName);
    console.log(lastName);
    return new Promise<any>(async (resolve, reject) => {
      await this.afa.collection("Accounts").doc(id).update({
        firstName: firstName,
        lastName: lastName,
      })
        .then((res) => {
          resolve(res);
          console.log("Updated account in database", res);
        },
          (err) => {
            reject(err);
            console.log(err);
          })
    })
  }

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

  getLayout(): Observable<RestLayout[]>{
    const requestRef = collection(this.afs, 'RestaurantLayout');
    return collectionData(requestRef, { idField: 'id'}) as Observable <RestLayout[]>;
  }

  acknowledgeRequest(id) {
    return new Promise<any>(async (resolve, reject) => {
      await this.afa.collection("Nlp").doc(id).delete()
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  updateOrderStatus(id: string, status: boolean) {
    return new Promise<any>((resolve, reject) => {
      this.afa.collection("Orders").doc(id).update({
        ready: status,
      })
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  changeAvailability(id: string, status: boolean) {
    return new Promise<any>((resolve, reject) => {
      this.afa.collection("RestaurantLayout").doc(id).update({
        available: status,
      })
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  async getOrdersAssignedToTable(tableNumber: number) {
    const q = query(collection(this.afs, "Orders"), where("table", "==", tableNumber));
    var allOrders: OrderToPay = {
      items : [],
      orders : [],
      table : tableNumber,
      total : 0,
      totalPaid : 0,
    };
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allOrders.orders.push(doc.id);
      allOrders.total += doc.data().total;
      allOrders.totalPaid += doc.data().totalPaid;
      doc.data().items.forEach((menuItemID: string) => {
        this.getMenuById2(menuItemID).then((menuItem) => {
          allOrders.items.push(menuItem.data());
        })
      })
    });
    return allOrders;
  }
}
