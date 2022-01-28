(self["webpackChunkcapstonev2"] = self["webpackChunkcapstonev2"] || []).push([["src_app_admin-login_admin-login_module_ts"],{

/***/ 3764:
/*!***********************************************************!*\
  !*** ./src/app/admin-login/admin-login-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminLoginPageRoutingModule": () => (/* binding */ AdminLoginPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _admin_login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-login.page */ 3296);




const routes = [
    {
        path: '',
        component: _admin_login_page__WEBPACK_IMPORTED_MODULE_0__.AdminLoginPage
    }
];
let AdminLoginPageRoutingModule = class AdminLoginPageRoutingModule {
};
AdminLoginPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AdminLoginPageRoutingModule);



/***/ }),

/***/ 2806:
/*!***************************************************!*\
  !*** ./src/app/admin-login/admin-login.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminLoginPageModule": () => (/* binding */ AdminLoginPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _admin_login_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin-login-routing.module */ 3764);
/* harmony import */ var _admin_login_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-login.page */ 3296);







let AdminLoginPageModule = class AdminLoginPageModule {
};
AdminLoginPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _admin_login_routing_module__WEBPACK_IMPORTED_MODULE_0__.AdminLoginPageRoutingModule
        ],
        declarations: [_admin_login_page__WEBPACK_IMPORTED_MODULE_1__.AdminLoginPage]
    })
], AdminLoginPageModule);



/***/ }),

/***/ 3296:
/*!*************************************************!*\
  !*** ./src/app/admin-login/admin-login.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminLoginPage": () => (/* binding */ AdminLoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_admin_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./admin-login.page.html */ 6450);
/* harmony import */ var _admin_login_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-login.page.scss */ 5263);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);




let AdminLoginPage = class AdminLoginPage {
    constructor() { }
    ngOnInit() {
    }
};
AdminLoginPage.ctorParameters = () => [];
AdminLoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-admin-login',
        template: _raw_loader_admin_login_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_admin_login_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AdminLoginPage);



/***/ }),

/***/ 5263:
/*!***************************************************!*\
  !*** ./src/app/admin-login/admin-login.page.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1sb2dpbi5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ 6450:
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/admin-login/admin-login.page.html ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>admin-login</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-note> This is the admin login page to access admin mode. </ion-note>\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_admin-login_admin-login_module_ts.js.map