import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController } from '@ionic/angular';
import { GoogleAuthProvider, TwitterAuthProvider, OAuthProvider, GithubAuthProvider } from "firebase/auth";

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
    private google: GoogleAuthProvider,
    public loadingController: LoadingController,
    private microsoft: OAuthProvider,
    private twitter: TwitterAuthProvider,
    private gitHub: GithubAuthProvider,
  ) {
    this.microsoft = new OAuthProvider('microsoft.com');
   }

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

  signinUserProvider(provider) {
    return new Promise<any>((resolve, reject) => {
      this.userFireAuth.signInWithPopup(provider)
      .then(success => {
        this.subscribeToUserState();
        console.log('success in external provider login');
        resolve(success);
      }).catch(err => {
        console.log(err.message, 'error in external provider login');
        reject(err);
      });
    })
  }

  signinUserTwitter() { return this.signinUserProvider(this.twitter) }

  signinUserMicrosoft() { return this.signinUserProvider(this.microsoft) }

  signinUserGoogle() { return this.signinUserProvider(this.google) }

  signinUserGitHub() { return this.signinUserProvider(this.gitHub) }

  signinAdmin(value: { email: string; password: string; }) {
    return new Promise<any>((resolve, reject) => {
      this.adminFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          if (res.user.uid == this.adminUID){
            this.subscribeToAdminState();
            resolve(res);
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
