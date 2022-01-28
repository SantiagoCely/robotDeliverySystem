(self["webpackChunkcapstonev2"] = self["webpackChunkcapstonev2"] || []).push([["src_app_browse-menu_browse-menu_module_ts"],{

/***/ 8357:
/*!***********************************************************!*\
  !*** ./src/app/browse-menu/browse-menu-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowseMenuPageRoutingModule": () => (/* binding */ BrowseMenuPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _browse_menu_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browse-menu.page */ 7645);




const routes = [
    {
        path: '',
        component: _browse_menu_page__WEBPACK_IMPORTED_MODULE_0__.BrowseMenuPage
    }
];
let BrowseMenuPageRoutingModule = class BrowseMenuPageRoutingModule {
};
BrowseMenuPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], BrowseMenuPageRoutingModule);



/***/ }),

/***/ 6680:
/*!***************************************************!*\
  !*** ./src/app/browse-menu/browse-menu.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowseMenuPageModule": () => (/* binding */ BrowseMenuPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _browse_menu_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browse-menu-routing.module */ 8357);
/* harmony import */ var _browse_menu_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browse-menu.page */ 7645);







let BrowseMenuPageModule = class BrowseMenuPageModule {
};
BrowseMenuPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _browse_menu_routing_module__WEBPACK_IMPORTED_MODULE_0__.BrowseMenuPageRoutingModule
        ],
        declarations: [_browse_menu_page__WEBPACK_IMPORTED_MODULE_1__.BrowseMenuPage]
    })
], BrowseMenuPageModule);



/***/ }),

/***/ 7645:
/*!*************************************************!*\
  !*** ./src/app/browse-menu/browse-menu.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrowseMenuPage": () => (/* binding */ BrowseMenuPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_browse_menu_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./browse-menu.page.html */ 6107);
/* harmony import */ var _browse_menu_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browse-menu.page.scss */ 1483);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var src_app_services_crud_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/crud.service */ 3927);
/* harmony import */ var src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/cart.service */ 910);




//import { AlertController } from '@ionic/angular';


let BrowseMenuPage = class BrowseMenuPage {
    //message: string;
    //subscription: Subscription;
    constructor(crudService, 
    //private cd: ChangeDetectorRef,
    //private alertCtrl: AlertController,
    cart
    //private events: EventsService
    //private router: Router,
    //public events: EventsService
    ) {
        this.crudService = crudService;
        this.cart = cart;
        //menuItems: MenuItem[];
        //types = ["Burgers", "Cold Drinks", "Chicken & Fish", "Sweets & Treats"];
        this.menuItems = [];
        this.filters = [];
    }
    addToOrder(id) {
        console.log("trying to add item id: ", id);
        this.cart.addToLocalCart(id);
        //this.events.changeMessage(id);
    }
    filterItems(category) {
        if (!this.filters.includes(category)) {
            console.log("filter added: ", category);
            this.filters.push(category);
            console.log("filters: ", this.filters);
            this.displayMenuItems();
        }
    }
    displayMenuItems() {
        // if there are filters selected, filter menu items
        if (this.filters.length > 0) {
            var temp = [];
            this.filters.forEach((filter) => {
                this.menuItems.forEach((item) => {
                    if (item.category.includes(filter)) {
                        console.log("item filtered: ", item.name);
                        if (!temp.includes(item)) {
                            temp.push(item);
                        }
                    }
                });
                this.menuItems = temp;
            });
        }
        else { // no filters -- happens OnInit
            this.crudService.getMenuItems().subscribe(res => {
                this.menuItems = res;
                //this.cd.detectChanges();
            });
        }
        console.log("menu items: ", this.menuItems);
    }
    ngOnInit() {
        console.log("Browse Menu Page");
        this.displayMenuItems();
    }
};
BrowseMenuPage.ctorParameters = () => [
    { type: src_app_services_crud_service__WEBPACK_IMPORTED_MODULE_2__.CrudService },
    { type: src_app_services_cart_service__WEBPACK_IMPORTED_MODULE_3__.CartService }
];
BrowseMenuPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-browse-menu',
        template: _raw_loader_browse_menu_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_browse_menu_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
    //@Output() menuToApp = new EventsService<String>();
], BrowseMenuPage);



/***/ }),

/***/ 1483:
/*!***************************************************!*\
  !*** ./src/app/browse-menu/browse-menu.page.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".scrolling-wrapper-flexbox {\n  display: flex;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: stretch;\n}\n.scrolling-wrapper-flexbox .item-card {\n  flex: 0 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZS1tZW51LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLG9CQUFBO0FBQ0Y7QUFDRTtFQUNFLGNBQUE7QUFDSiIsImZpbGUiOiJicm93c2UtbWVudS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2Nyb2xsaW5nLXdyYXBwZXItZmxleGJveCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xyXG4gIFxyXG4gIC5pdGVtLWNhcmQge1xyXG4gICAgZmxleDogMCAwIGF1dG87XHJcbiAgfVxyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ 6107:
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/browse-menu/browse-menu.page.html ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>browse-menu</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-button size=\"small\" [routerLink]=\"['/admin-login']\">admin login </ion-button>\n\n  <br><br>\n\n  <ion-button size=\"small\" (click)=\"filterItems('Vegetarian')\"> Vegetarian </ion-button>\n  <ion-button size=\"small\" (click)=\"filterItems('Halal')\"> Halal </ion-button>\n\n  <div class=\"scrolling-wrapper\">\n    <br>\n    <ion-note h2>Burgers</ion-note>\n    <ion-row  class=\"align-items-center\" *ngFor=\"let item of menuItems; let i = index\">\n      <div class=\"scrolling-wrapper\">\n        <ion-card class=\"item-card\" *ngIf=\"item.type == 'Burgers'\">\n          <ion-card-header>{{item.name}}</ion-card-header><br>\n          <ion-note>{{item.price}}</ion-note>\n          <ion-button size=\"small\" *ngIf=\"item.type == 'Burgers'\" (click)=\"addToOrder(item.id)\">\n            <ion-icon name=\"add-circle-outline\"></ion-icon>\n          </ion-button>\n        </ion-card>\n      </div>\n    </ion-row>\n  </div>\n    <br>\n    <ion-note h2>Chicken & Fish</ion-note>\n    <ion-row  class=\"align-items-center\" *ngFor=\"let item of menuItems; let i = index\">\n      <ion-col  size=\"3\">\n        <ion-card class=\"inline-block\" *ngIf=\"item.type == 'Chicken & Fish'\">\n          <ion-note>{{item.name}}</ion-note><br>\n          <ion-note>{{item.price}}</ion-note>\n          <ion-button size=\"small\" *ngIf=\"item.type == 'Chicken & Fish'\" (click)=\"addToOrder(item.id)\">\n            <ion-icon name=\"add-circle-outline\"></ion-icon>\n          </ion-button>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <br>\n\n    <ion-note h2>Sweets & Treats</ion-note>\n    <ion-row  class=\"align-items-center\" *ngFor=\"let item of menuItems; let i = index\">\n      <ion-col  size=\"3\">\n        <ion-card class=\"inline-block\" *ngIf=\"item.type == 'Sweets & Treats'\">\n          <ion-note>{{item.name}}</ion-note><br>\n          <ion-note>{{item.price}}</ion-note>\n          <ion-button size=\"small\" *ngIf=\"item.type == 'Sweets & Treats'\" (click)=\"addToOrder(item.id)\">\n            <ion-icon name=\"add-circle-outline\"></ion-icon>\n          </ion-button>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <br>\n    <ion-note h2>Cold Drinks</ion-note>\n    <ion-row  class=\"align-items-center\" *ngFor=\"let item of menuItems; let i = index\">\n      <ion-col  size=\"3\">\n        <ion-card class=\"inline-block\" *ngIf=\"item.type == 'Cold Drinks'\">\n          <ion-note>{{item.name}}</ion-note><br>\n          <ion-note>{{item.price}}</ion-note>\n          <ion-button size=\"small\" *ngIf=\"item.type == 'Cold Drinks'\" (click)=\"addToOrder(item.id)\">\n            <ion-icon name=\"add-circle-outline\"></ion-icon>\n          </ion-button>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_browse-menu_browse-menu_module_ts.js.map