import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import store from "../store/store"
import * as type from "../store/types";
import Main from '../components/Main.vue'
import Shop from '../components/pages/Shop.vue'
import Contact from '../components/pages/Contact.vue'
import Details from '../components/pages/Details.vue'
import Cart from '../components/pages/Cart.vue'
import Checkout from '../components/pages/Checkout.vue'
import Login from '../components/pages/Login.vue'
import Profile from '../components/pages/Profile.vue'
import ChangePassword from '../components/pages/ChangePassword.vue'
import EditProfile from '../components/pages/EditProfile.vue'
import Orders from '../components/pages/Orders.vue'
import Explore from '../components/pages/Explore.vue'
import Wishlist from '../components/pages/Wishlist.vue'
import { DEF_URL } from '../common/url';

function loginGuard(to, from, next) {
    let isAuthenticated = false;
    if (localStorage.getItem('email') == undefined) {
        isAuthenticated = true;
    }
    if (isAuthenticated) {
        next();
    }
    else {
        localStorage.removeItem("id_token");
        localStorage.removeItem("email");
        alert("Invalid routing. Logged out!")
        next("/")
    }
}

function profileGuard(to, from, next) {
    let isLogin = false;
    if (localStorage.getItem('email') != undefined) {
        isLogin = true
    }
    if (isLogin) {
        next();
    }
    else {
        alert("Login first!!!")
        next("/login")
    }
}

function product(to, from, next) {
    let P_URL = DEF_URL + "shop";
    next(
        Vue.axios.get(P_URL).then((res) => {
            store.dispatch({
                type: type.Products,
                pro: res.data.product,
            });
        }))

}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/product/:id?',
            beforeEnter: product,
            name: 'Shop',
            component: Shop
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/profile',
            beforeEnter: profileGuard,
            name: 'Profile',
            component: Profile,
            children: [
                {
                    path: 'change-password', component: ChangePassword
                },
                {
                    path: 'edit-profile', component: EditProfile
                },
                {
                    path: 'orders', component: Orders
                },
            ]
        },
        {
            path: '/product-details/:id',
            name: 'Details',
            component: Details
        },
        {
            path: '/explore/:id?',
            name: 'Explore',
            component: Explore,

        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/wishlist',
            beforeEnter: profileGuard,
            name: 'Wishlist',
            component: Wishlist
        },
        {
            path: '/checkout',
            beforeEnter: profileGuard,
            name: 'Checkout',
            component: Checkout
        },
        {
            path: '/login',
            beforeEnter: loginGuard,
            name: 'Login',
            component: Login
        }
    ]
})
