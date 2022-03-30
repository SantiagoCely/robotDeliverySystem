import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})

export class IonicAuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }

  verifyUserSignedIn() {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        this.signoutUser();
      }
    })
  }
}
