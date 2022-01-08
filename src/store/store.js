import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);




export default new Vuex.Store({



    state: {
        email: '',
        proData: undefined,
        productinfo: undefined,
        filter: null,
        P_URL: '',
        URL: "http://127.0.0.1:8000/api/shop",

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

        isproducts(state, payload) {
            console.log(payload.pro)
            return state.proData = payload.pro
        },

        ispro(state, payload) {
            return state.productinfo = payload.pro
        },

        iscat(state, payload) {
            state.P_URL = state.URL + payload.filter
            console.log(state.P_URL)
            Vue.axios.get(state.P_URL).then((res) => {
                state.proData = res.data.product

            })
            // console.log(state.proData)
            // console.log(payload.catID)
            return state.proData
        }

    },

    actions: {
        userlogin(context, payload) {
            context.commit('isuserlogin', payload)
        },

        userlogout(context, payload) {
            context.commit('isuserlogout', payload)
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
    }
})
