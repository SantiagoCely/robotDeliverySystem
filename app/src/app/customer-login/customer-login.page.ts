import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { CrudService } from '../services/crud.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Account } from '../interfaces/account';



@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
})
export class CustomerLoginPage implements OnInit {

  public loading: any;
  public isUserLoggedIn = false;
  public user = null;
  public accountDetails = null;

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  account: Account;


  error_msg = {
    'email': [
      {
        type: 'required',
        message: 'Provide email.'
      },
      {
        type: 'pattern',
        message: 'Email is not valid.'
      }
    ],
    'password': [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      }
    ]
  };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,

    private fireAuth: AngularFireAuth,
    private google: GooglePlus,
    public loadingController: LoadingController,
    private platform: Platform,

    private crudService: CrudService,
    private afs: Firestore
  ) { }

  async ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }

  signIn(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        console.log(response)
        this.errorMsg = "";
        //this.router.navigateByUrl('browse-menu');
        this.isUserLoggedIn = true;
        this.user = response.user;
        this.showUserDetails(false);
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('registration');
  }

  doLogin(){
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
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
    } else{
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isUserLoggedIn = true;
        this.user =  success.user;
        this.showUserDetails(true);
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    }
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        alert('successfully');
        this.isUserLoggedIn = true;
        this.user =  success.user;
        this.loading.dismiss();
        this.showUserDetails(true);
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.user =  null;
      this.isUserLoggedIn = false;
      this.accountDetails = null;
      // re-initialize account var
      this.account = null;
    });
  }

  verifyAccount(response){
    // Try to get account from the 'Accounts' and if not found, create one
    console.log("verifying account");
    console.log(response.user.uid);
    const docRef = doc(this.afs, "Accounts", response.user.uid);
    getDoc(docRef).then((responseDoc) => {
      console.log(responseDoc.exists());
      if (responseDoc.exists()) {
        console.log("Account exists in database");
      } else {
        console.log('creating Account');
        this.account = {
          email : response.user.email,
          firstName : response.user.displayName,
          id : response.user.uid,
          lastName : '',
          pastOrders : [],
          preferences : [],
          favourites : [],
        }
        this.crudService.createAccount(this.account).then(() => {
          console.log("New account created in database");
        }), (error: any) => {
          console.log(error);
        }
      }
    })
  }

  showUserDetails(externalProvider){
    const docRef = doc(this.afs, "Accounts", this.user.uid);
    getDoc(docRef).then((responseDoc) => {
      if (!responseDoc.exists() && externalProvider){
        console.log('creating Account');
        this.account = {
          email : this.user.email,
          firstName : this.user.displayName,
          id : this.user.uid,
          lastName : '',
          pastOrders : [],
          preferences : [],
          favourites : [],
        };
        this.accountDetails = this.crudService.createAccount(this.account).then(() => {
          console.log("New account created in database");
        }), (error: any) => {
          console.log(error);
        }
      } else {
        this.accountDetails = responseDoc;
        //this.renderAccountDetails(doc);
      }
    });
  }

  renderAccountDetails(dbRef){
    const accountDetails = document.querySelector('#account-details')
    let acc = document.createElement('li');

    let email = document.createElement('span');
    let favourites = document.createElement('span');
    let firstName = document.createElement('span');
    let lastName = document.createElement('span');
    let pastOrders = document.createElement('span');
    let preferences = document.createElement('span');

    acc.setAttribute('data-id', dbRef.id);
    email.textContent = dbRef.data().email;
    favourites.textContent = dbRef.data().favourites;
    firstName.textContent = dbRef.data().firstName;
    lastName.textContent = dbRef.data().lastName;
    pastOrders.textContent = dbRef.data().pastOrders;
    preferences.textContent = dbRef.data().preferences;

    acc.appendChild(email);
    acc.appendChild(favourites);
    acc.appendChild(firstName);
    acc.appendChild(lastName);
    acc.appendChild(pastOrders);
    acc.appendChild(preferences);

    accountDetails.appendChild(acc);
  }

}