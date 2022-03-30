import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { CrudService } from '../services/crud.service';
import Account from '../interfaces/account';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

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
    private crudService: CrudService
  ) { }

  ngOnInit() {
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
  }

  signUp(value) {
    this.ionicAuthService.createUser(value)
      .then((response) => {
        this.errorMsg = "";
        this.successMsg = "New user created.";
        console.log(response);

        this.account = {
          email : response.user.email,
          firstName : 'None',
          lastName : 'None',
          pastOrders : ['None'],
          preferences : ['None'],
          favourites : ['None'],
        }
        this.crudService.createAccount(this.account, response.user.uid).then(() => {
          console.log("New account created in database");
        }), (error: any) => {
          this.errorMsg = error.message;
          this.successMsg = "";
        }
      }, (error: any) => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToLogin() {
    this.router.navigateByUrl('customer-login');
  }

}