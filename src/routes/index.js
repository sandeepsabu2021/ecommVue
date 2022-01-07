import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Main from '../components/Main.vue'
import Shop from '../components/pages/Shop.vue'
import Contact from '../components/pages/Contact.vue'
import Details from '../components/pages/Details.vue'
import Cart from '../components/pages/Cart.vue'
import Checkout from '../components/pages/Checkout.vue'
import Login from '../components/pages/Login.vue'

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
        alert("Invalid routing. Logged out!s")
        next("/")
    }
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
            name: 'Shop',
            component: Shop
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/product-details/:id',
            name: 'Details',
            component: Details
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/checkout',
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
