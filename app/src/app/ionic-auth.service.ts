import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class IonicAuthService {
  private readonly adminUID = 'viKs5b2K9Lhb8ZxQHaNyuMTPdoC3';
  private user = null;
  private admin = null;

  constructor(
    private userFireAuth: AngularFireAuth,
    private adminFireAuth: AngularFireAuth,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private platform: Platform,
  ) { }

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.userFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        },
        err => reject(err))
    })
  }

  signinUser(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      this.userFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.subscribeToUserState();
        },
          err => reject(err))
    })
  }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.userFireAuth.currentUser) {
        this.userFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  signinUserGoogle(){
    return new Promise<any>((resolve, reject) => {
      let params: any;
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          params = {
            webClientId: '<WEB_CLIENT_ID>', //  webclientID 'string'
            offline: true
          };
        } else {
          params = {};
        }

        this.google.login(params)
        .then((response) => {
          const { idToken, accessToken } = response;
          const credential = accessToken ? firebase.GoogleAuthProvider
              .credential(idToken, accessToken) : firebase.GoogleAuthProvider
                  .credential(idToken);
          this.userFireAuth.signInWithCredential(credential)
            .then((success) => {
              resolve(success);
              alert('successfully');
              this.subscribeToUserState();
            });
        }).catch((error) => {
          console.log(error);
          reject(error);
          alert('error:' + JSON.stringify(error));
        });
      } else{
        console.log('else...');
        this.userFireAuth.signInWithPopup(new firebase.GoogleAuthProvider()).then(success => {
          console.log('success in google login', success);
          resolve(success);
          this.subscribeToUserState();
        }).catch(err => {
          console.log(err.message, 'error in google login');
          reject(err);
        });
      }
    })
  }

  signinAdmin(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      this.adminFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          if (res.user.uid == this.adminUID){
            resolve(res);
            this.subscribeToAdminState();
          } else {
            this.signoutAdmin();
            reject("You do not have admin priviledges. Please use an Admin account");
          }
        },
          err => reject(err));
    })
  }

  signoutAdmin() {
    return new Promise<void>((resolve, reject) => {
      if (this.adminFireAuth.currentUser) {
        this.adminFireAuth.signOut()
          .then(() => {
            //console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  getUserAuth() { return this.userFireAuth.user }

  getAdminAuth() { return this.adminFireAuth.user }

  getUser() { return this.user }

  getAdmin() { return this.admin }

  isAdminLoggedIn() {
    if (this.admin) {
      return true;
    } return false;
  }

  isUserLoggedIn() {
    if (this.user) {
      return true;
    } return false;
  }

  subscribeToUserState() {
    this.userFireAuth.authState.subscribe((res) => {
      this.user = res;
    })
  }

  subscribeToAdminState() {
    this.adminFireAuth.authState.subscribe((res) => {
      this.admin = res;
    })
  }
}
