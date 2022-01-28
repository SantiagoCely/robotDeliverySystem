(self["webpackChunkcapstonev2"] = self["webpackChunkcapstonev2"] || []).push([["src_app_edit-layout_edit-layout_module_ts"],{

/***/ 4282:
/*!***********************************************************!*\
  !*** ./src/app/edit-layout/edit-layout-routing.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditLayoutPageRoutingModule": () => (/* binding */ EditLayoutPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _edit_layout_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-layout.page */ 3775);




const routes = [
    {
        path: '',
        component: _edit_layout_page__WEBPACK_IMPORTED_MODULE_0__.EditLayoutPage
    }
];
let EditLayoutPageRoutingModule = class EditLayoutPageRoutingModule {
};
EditLayoutPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], EditLayoutPageRoutingModule);



/***/ }),

/***/ 6185:
/*!***************************************************!*\
  !*** ./src/app/edit-layout/edit-layout.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditLayoutPageModule": () => (/* binding */ EditLayoutPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _edit_layout_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-layout-routing.module */ 4282);
/* harmony import */ var _edit_layout_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-layout.page */ 3775);







let EditLayoutPageModule = class EditLayoutPageModule {
};
EditLayoutPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _edit_layout_routing_module__WEBPACK_IMPORTED_MODULE_0__.EditLayoutPageRoutingModule
        ],
        declarations: [_edit_layout_page__WEBPACK_IMPORTED_MODULE_1__.EditLayoutPage]
    })
], EditLayoutPageModule);



/***/ }),

/***/ 3775:
/*!*************************************************!*\
  !*** ./src/app/edit-layout/edit-layout.page.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditLayoutPage": () => (/* binding */ EditLayoutPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_edit_layout_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./edit-layout.page.html */ 3375);
/* harmony import */ var _edit_layout_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-layout.page.scss */ 8302);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);




let EditLayoutPage = class EditLayoutPage {
    constructor() { }
    ngOnInit() {
    }
};
EditLayoutPage.ctorParameters = () => [];
EditLayoutPage = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-edit-layout',
        template: _raw_loader_edit_layout_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_edit_layout_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], EditLayoutPage);



/***/ }),

/***/ 8302:
/*!***************************************************!*\
  !*** ./src/app/edit-layout/edit-layout.page.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LWxheW91dC5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ 3375:
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/edit-layout/edit-layout.page.html ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>edit-layout</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_edit-layout_edit-layout_module_ts.js.map