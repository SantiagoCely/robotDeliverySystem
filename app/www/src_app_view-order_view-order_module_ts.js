(self["webpackChunkcapstonev2"] = self["webpackChunkcapstonev2"] || []).push([["src_app_view-order_view-order_module_ts"],{

/***/ 8185:
/*!*********************************************************!*\
  !*** ./src/app/view-order/view-order-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewOrderPageRoutingModule": () => (/* binding */ ViewOrderPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _view_order_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-order.page */ 4093);




const routes = [
    {
        path: '',
        component: _view_order_page__WEBPACK_IMPORTED_MODULE_0__.ViewOrderPage
    }
];
let ViewOrderPageRoutingModule = class ViewOrderPageRoutingModule {
};
ViewOrderPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], ViewOrderPageRoutingModule);



/***/ }),

/***/ 5456:
/*!*************************************************!*\
  !*** ./src/app/view-order/view-order.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewOrderPageModule": () => (/* binding */ ViewOrderPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _view_order_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-order-routing.module */ 8185);
/* harmony import */ var _view_order_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-order.page */ 4093);







let ViewOrderPageModule = class ViewOrderPageModule {
};
ViewOrderPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _view_order_routing_module__WEBPACK_IMPORTED_MODULE_0__.ViewOrderPageRoutingModule
        ],
        declarations: [_view_order_page__WEBPACK_IMPORTED_MODULE_1__.ViewOrderPage]
    })
], ViewOrderPageModule);



/***/ }),

/***/ 4093:
/*!***********************************************!*\
  !*** ./src/app/view-order/view-order.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewOrderPage": () => (/* binding */ ViewOrderPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_view_order_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./view-order.page.html */ 3709);
/* harmony import */ var _view_order_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-order.page.scss */ 8475);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var src_app_services_crud_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/crud.service */ 3927);
/* harmony import */ var src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/cart.service */ 910);





//import { Subscription } from 'rxjs';
//import { Firestore, doc, onSnapshot, docSnapshots } from '@angular/fire/firestore';

let ViewOrderPage = class ViewOrderPage {
    //message: string;
    //subscription: Subscription;
    constructor(
    //private afs: Firestore,
    crudService, 
    //public events: EventsService,
    cart
    //  private activatedRoute: ActivatedRoute,
    //  private router: Router
    ) {
        this.crudService = crudService;
        this.cart = cart;
        this.notSubmitted = []; // menu items not yet submitted, and thus not part of the Order yet
        this.submitted = [];
        this.orderId = "";
    }
    displayLocalCart() {
        this.notSubmitted = this.cart.getCartItems();
        console.log("in cart", this.notSubmitted);
        console.log("total", this.cart.getTotal());
    }
    displayOrder() {
        if (this.total_ordered_quantity > 0) {
            this.order.items.forEach((item) => {
                this.crudService.getMenuById(item).subscribe(item => {
                    this.submitted.push(item);
                });
            });
        }
    }
    ngOnInit() {
        console.log("View Order module");
        this.displayLocalCart();
        this.displayOrder();
        //this.subscription = this.events.currentMessage.subscribe(message => this.message = message);
    }
    submitOrder() {
        //order cannot be empty
        if (this.orderId = null) {
            this.crudService.createOrder(this.order).then(function (docRef) {
                this.order.id = docRef.id;
                this.orderId = this.order.id;
                console.log("Order created: ", this.order.id);
            });
        }
        this.notSubmitted.forEach((item) => {
            this.order.items.push(item.id);
        });
        this.order.total += this.cart.getTotal();
        this.total_ordered_quantity += this.cart.getCartTotalQuantity();
        this.cart.clearLocalCart();
    }
    pay() {
    }
};
ViewOrderPage.ctorParameters = () => [
    { type: src_app_services_crud_service__WEBPACK_IMPORTED_MODULE_2__.CrudService },
    { type: src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_3__.CartService }
];
ViewOrderPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-view-order',
        template: _raw_loader_view_order_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_view_order_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ViewOrderPage);



/***/ }),

/***/ 8475:
/*!*************************************************!*\
  !*** ./src/app/view-order/view-order.page.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2aWV3LW9yZGVyLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ 3709:
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/view-order/view-order.page.html ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>view-order</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-note>\n    Items added to the order will be displayed here along with the statuses of the food items.\n  </ion-note>\n  <br><br>\n  <ion-note h2> In Cart, not yet submitted: </ion-note>\n  <ion-row  class=\"align-items-center\" *ngFor=\"let item of localCart; let i = index\">\n    <div class=\"scrolling-wrapper\">\n      <ion-card class=\"item-card\">\n        <ion-card-header>{{item.name}}</ion-card-header><br>\n        <ion-note>{{item.price}}</ion-note>\n      </ion-card>\n    </div>\n  </ion-row>\n\n<br><br>\n  <ion-button size=\"large\" (click)=submitOrder()>SEND ORDER</ion-button>\n  <ion-note> Order number:  </ion-note>\n  <ion-button size=\"large\" (click)=pay()>Pay</ion-button>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_view-order_view-order_module_ts.js.map