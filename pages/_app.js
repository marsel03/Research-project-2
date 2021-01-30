/*!

=========================================================
* NextJS Material Kit v1.1.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import productReducer from '../store/reducers/products';
import wishListReducer from '../store/reducers/wishlist';

import cartReducer from '../store/reducers/cart';

import PageChange from "components/PageChange/PageChange.js";

import "assets/scss/nextjs-material-kit.scss?v=1.1.0";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  wishlist: wishListReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store} >
          <Component {...pageProps} />
      </Provider>
  )
}