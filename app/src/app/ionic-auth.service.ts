import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { GoogleAuthProvider, TwitterAuthProvider, OAuthProvider, GithubAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})

export class IonicAuthService {
  private readonly adminUID = 'viKs5b2K9Lhb8ZxQHaNyuMTPdoC3';
  private user: firebase.User;
  private admin: firebase.User;

  constructor(
    private userFireAuth: AngularFireAuth,
    private adminFireAuth: AngularFireAuth,
    private google: GoogleAuthProvider,
    public loadingController: LoadingController,
    private microsoft: OAuthProvider,
    private twitter: TwitterAuthProvider,
    private gitHub: GithubAuthProvider,
  ) {
    this.microsoft = new OAuthProvider('microsoft.com');
    this.userFireAuth.authState.subscribe((res) => {
      this.user = res;
    })
    this.adminFireAuth.authState.subscribe((res) => {
      this.admin = res;
    })
   }

  async createUser(value) {
    return new Promise<any>(async (resolve, reject) => {
      await this.userFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        },
        err => reject(err))
    })
  }

  async signinUser(value: { email: string; password: string; }) {
    return new Promise<any>(async (resolve, reject) => {
      await this.userFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(async res => {
          resolve(res);
        },
          err => reject(err))
    })
  }

  async signoutUser() {
    return new Promise<void>(async (resolve, reject) => {
      if (this.userFireAuth.currentUser) {
        await this.userFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  async signinUserProvider(provider) {
    return new Promise<any>(async (resolve, reject) => {
      await this.userFireAuth.signInWithPopup(provider)
      .then(async success => {
        console.log('success in external provider login');
        resolve(success);
      }).catch(err => {
        console.log(err.message, 'error in external provider login');
        reject(err);
      });
    })
  }

  async signinUserTwitter() { return this.signinUserProvider(this.twitter) }

  async signinUserMicrosoft() { return this.signinUserProvider(this.microsoft) }

  async signinUserGoogle() { return this.signinUserProvider(this.google) }

  async signinUserGitHub() { return this.signinUserProvider(this.gitHub) }

  async signinAdmin(value: { email: string; password: string; }) {
    return new Promise<any>(async (resolve, reject) => {
      await this.adminFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(async res => {
          if (res.user.uid == this.adminUID){
            resolve(res);
          } else {
            await this.signoutAdmin();
            reject("You do not have admin priviledges. Please use an Admin account");
          }
        },
          err => reject(err));
    })
  }

  async signoutAdmin() {
    return new Promise<void>(async (resolve, reject) => {
      if (this.adminFireAuth.currentUser) {
        await this.adminFireAuth.signOut()
          .then(() => {
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

  isAdminLoggedIn() { return !!this.user }

  isUserLoggedIn() { return !!this.admin }
}
