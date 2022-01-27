import Vue from 'vue';
import Vuex from 'vuex';
import { DEF_URL } from '../common/url';
Vue.use(Vuex);

import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

export default new Vuex.Store({


    state: {

        email: '',
        proData: undefined,
        bannerData: undefined,
        productinfo: undefined,
        profileData: undefined,
        filter: null,
        P_URL: '',
        URL: DEF_URL + "shop",
        cart: undefined,
        inWish: JSON.parse(localStorage.getItem('myWish')) ? JSON.parse(localStorage.getItem('myWish')) : [],
        inCart: JSON.parse(localStorage.getItem('myCart')) ? JSON.parse(localStorage.getItem('myCart')) : [],
        page: undefined

    },

    getters: {
        inCart: state => state.inCart,
        inWish: state => state.inWish
    },

    mutations: {
        isuserlogin(state, payload) {
            return state.email = '' + payload.mail
        },

        isuserlogout(state, payload) {
            if (payload.code == 0) {
                return state.email = ''
            }
        },

        isprofile(state, payload) {
            return state.profileData = payload.profile
        },

        isproducts(state, payload) {
            return state.proData = payload.pro
        },

        ispro(state, payload) {
            return state.productinfo = payload.pro
        },

        iscat(state, payload) {
            state.P_URL = state.URL + payload.filter
            Vue.axios.get(state.P_URL).then((res) => {
                state.proData = res.data.product

            })
            return state.proData
        },

        isbanner(state, payload) {
            return state.bannerData = payload.banner
        },

        isaddtocart(state, id) {
            state.inCart.push(id)
        },

        isaddtowish(state, id) {
            state.inWish.push(id)
        },

        isupdatecart(state, id) {
            state.inCart = id
        },

        isupdatewish(state, id) {
            state.inWish = id
        },

        ispage(state, payload) {
            return state.page = payload.page
        },

    },

    actions: {
        userlogin(context, payload) {
            context.commit('isuserlogin', payload)
        },

        userlogout(context, payload) {
            context.commit('isuserlogout', payload)
        },

        profile(context, payload) {
            context.commit('isprofile', payload)
        },

        products(context, payload) {
            context.commit('isproducts', payload)
        },

        product(context, payload) {
            context.commit('ispro', payload)
        },

        category(context, payload) {

            context.commit('iscat', payload)
        },

        banner(context, payload) {
            context.commit('isbanner', payload)
        },

        page(context, payload) {
            context.commit('ispage', payload)
        },

        addtocart(context, id) { context.commit('isaddtocart', id) },

        addtowish(context, id) { context.commit('isaddtowish', id) },

        updatecart(context, id) { context.commit('isupdatecart', id) },

        updatewish(context, id) { context.commit('isupdatewish', id) }
    }
})
