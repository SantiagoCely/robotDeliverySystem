import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController,  } from '@ionic/angular';
import { CrudService } from '../services/crud.service';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import Account from '../interfaces/account';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.page.html',
  styleUrls: ['./customer-login.page.scss'],
})
export class CustomerLoginPage implements OnInit {
  public loading: any;
  public isUserLoggedIn = false;
  public user = null;
  private additionalInfo = null;
  public accountDetails: Account = {
    firstName: 'None',
    lastName: 'None',
    email : 'None',
    preferences: ['None'],
    pastOrders: ['None'],
    favourites: ['None'],
  };
  private unsub;

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  account: Account;
  accountTest: Account;
  firstNameInput: string = "";
  lastNameInput: string = "";


  error_msg = {
    'email': [
      {
        type: 'required',
        message: 'Please provide a valid email.'
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

    public loadingController: LoadingController,

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
        this.user = response.user;
        this.loading.dismiss();
        this.isUserLoggedIn = true;
        this.showUserDetails(false, 'Firebase');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToSignup() {
    this.router.navigateByUrl('registration');
  }



  googleLogin(){
    this.ionicAuthService.signinUserGoogle()
      .then((response) => {
        this.user = response.user;
        this.additionalInfo = response.additionalUserInfo.profile;
        this.loading.dismiss();
        this.isUserLoggedIn = true;
        this.showUserDetails(true, 'Google');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  microsoftLogin(){
    this.ionicAuthService.signinUserMicrosoft()
      .then((response) => {
        this.user = response.user;
        this.additionalInfo = response.additionalUserInfo.profile;
        this.loading.dismiss();
        this.isUserLoggedIn = true;
        this.showUserDetails(true, 'Microsoft');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  twitterLogin(){
    this.ionicAuthService.signinUserTwitter()
      .then((response) => {
        this.user = response.user;
        this.additionalInfo = response.additionalUserInfo.profile;
        this.loading.dismiss();
        this.isUserLoggedIn = true;
        this.showUserDetails(true, 'Twitter');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  gitHubLogin(){
    this.ionicAuthService.signinUserGitHub()
      .then((response) => {
        this.user = response.user;
        this.additionalInfo = response.additionalUserInfo.profile;
        this.loading.dismiss();
        this.isUserLoggedIn = true;
        this.showUserDetails(true, 'GitHub');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  logout() {
    this.ionicAuthService.signoutUser().then(() => {
      this.user =  null;
      this.isUserLoggedIn = false;
      this.accountDetails = null;
      // re-initialize account var
      this.accountDetails = {
        firstName: 'None',
        lastName: 'None',
        email : 'None',
        preferences: ['None'],
        pastOrders: ['None'],
        favourites: ['None'],
      };
      this.additionalInfo = null;
      this.unsub();
      console.log('User logged out');
    });
  }

  async showUserDetails(externalProvider: boolean, externalProviderName: string ){
    this.unsub = onSnapshot(doc(this.afs, "Accounts", this.user.uid), async (responseDoc) => {
      if (!responseDoc.exists() && externalProvider) {
        console.log('creating Account');
        if (externalProviderName == "Google") {
          this.account = {
            firstName: this.additionalInfo.given_name,
            lastName: this.additionalInfo.family_name,
            email: this.user.email,
            preferences: ['None'],
            pastOrders: ['None'],
            favourites: ['None'],
          };
        } else if (externalProviderName == "GitHub") {
          this.account = {
            firstName: this.additionalInfo.name,
            lastName: 'None',
            email: this.user.email,
            preferences: ['None'],
            pastOrders: ['None'],
            favourites: ['None'],
          };
        } else if (externalProviderName == "Microsoft") {
          this.account = {
            firstName: this.additionalInfo.givenName,
            lastName: this.additionalInfo.surname,
            email: this.user.email,
            preferences: ['None'],
            pastOrders: ['None'],
            favourites: ['None'],
          };
        } else if (externalProviderName == "Twitter") {
          this.account = {
            firstName: this.additionalInfo.name,
            lastName: 'None',
            email: 'None',
            preferences: ['None'],
            pastOrders: ['None'],
            favourites: ['None'],
          };
        }
        await this.crudService.createAccount(this.account, this.user.uid).then((res) => {
          console.log("New account created in database");
          this.accountDetails = {
            firstName: res.data().firstName,
            lastName: res.data().lastName,
            email: res.data().email,
            preferences: res.data().preferences,
            pastOrders: res.data().pastOrders,
            favourites: res.data().favourites,
          };
        }), (error: any) => {
          console.log(error);
        };
      } else {
        this.accountDetails = {
          firstName: responseDoc.data().firstName,
          lastName: responseDoc.data().lastName,
          email: responseDoc.data().email,
          preferences: responseDoc.data().preferences,
          pastOrders: responseDoc.data().pastOrders,
          favourites: responseDoc.data().favourites,
        };
      }
    });
  }

  updateAccount() {
    this.crudService.updateAccount(this.firstNameInput, this.lastNameInput, this.ionicAuthService.getUser().uid);
  }
}