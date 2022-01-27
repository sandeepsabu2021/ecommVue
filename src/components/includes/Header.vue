<template>
  <div>
    <header id="header">
      <!--header-->
      <div class="header_top">
        <!--header_top-->
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="contactinfo">
                <ul class="nav nav-pills">
                  <li>
                    <a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a>
                  </li>
                  <li>
                    <a href="#"
                      ><i class="fa fa-envelope"></i> info@domain.com</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="social-icons pull-right">
                <ul class="nav navbar-nav">
                  <li>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-linkedin"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-dribbble"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-google-plus"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header_top-->

      <div class="header-middle">
        <!--header-middle-->
        <div class="container">
          <div class="row">
            <div class="col-sm-4">
              <div class="logo pull-left">
                <router-link to="/"
                  ><img src="images/home/logo.png" alt=""
                /></router-link>
              </div>
              <div class="btn-group country">
                <div class="btn-group">
                  <button type="button" class="btn btn-default usa">
                    India
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="shop-menu pull-right">
                <ul class="nav navbar-nav">
                  <li>
                    <router-link v-if="mail" to="/profile"
                      ><i class="fa fa-user"></i> {{ mail }}</router-link
                    >
                    <router-link v-else to="/login"
                      ><i class="fa fa-user"></i>Account</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/wishlist" v-if="mail"
                      ><i class="fa fa-star"></i> Wishlist
                      <span v-if="wishVal != 0">{{ wishVal }}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/cart"
                      ><i class="fa fa-shopping-cart"></i> Cart
                      <span v-if="cartVal != 0">{{ cartVal }}</span>
                    </router-link>
                  </li>
                  <li>
                    <a v-if="mail" @click="logout">
                      <i class="fa fa-lock"></i> Logout</a
                    >
                    <router-link v-else to="/login">
                      <i class="fa fa-lock"></i> Login</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-middle-->

      <div class="header-bottom">
        <!--header-bottom-->
        <div class="container">
          <div class="row">
            <div class="col-sm-9">
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>
              <div class="mainmenu pull-left">
                <ul class="nav navbar-nav collapse navbar-collapse">
                  <li><router-link to="/">Home</router-link></li>
                  <li>
                    <router-link to="/product"
                      ><a @click="getproduct">Shop</a></router-link
                    >
                  </li>

                  <li class="dropdown">
                    <a href="#">Explore<i class="fa fa-angle-down"></i></a>
                    <ul v-if="cmsData" role="menu" class="sub-menu">
                      <li v-for="cms in cmsData" :key="cms.id">
                        <router-link :to="'/explore/' + cms.url">{{
                          cms.title
                        }}</router-link>
                      </li>
                    </ul>
                  </li>
                  <li><router-link to="/contact">Contact</router-link></li>
                </ul>
              </div>
            </div>
            <div class="col-sm-3">
              <div class="search_box pull-right">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--/header-bottom-->
    </header>
    <!--/header-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store/store";
import * as type from "../../store/types";
import { CMS_URL } from "@/common/url";
import { DEF_URL } from "@/common/url";

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

export default {
  name: "Header",
  computed: {
    ...mapState({
      mail: (state) => state.email,
      page: (state) => state.page,
      proData: (state) => state.proData,
      inCart() {
        return this.$store.getters.inCart;
      },
      cartVal() {
        return this.inCart.length;
      },

      inWish() {
        return this.$store.getters.inWish;
      },
      wishVal() {
        return this.inWish.length;
      },
    }),
  },
  data() {
    return {
      cmsData: undefined,
      param: undefined,
      data: undefined,
    };
  },
  methods: {
    logout() {
      if (confirm("Do you want to logout?")) {
        store.dispatch({
          type: type.UserLogout,
          code: 0,
        });
        localStorage.removeItem("id_token");
        localStorage.removeItem("email");
        alert("Logged out successfully");
        this.$router.push({ path: "/" });
      }
    },
    getproduct() {
      const P_URL = DEF_URL + "shop";
      Vue.axios.get(P_URL).then((res) => {
        store.dispatch({
          type: type.Products,
          pro: res.data.product,
        });
      });
    },
  },
  watch: {
    $route(to) {
      this.param = to.params.id;
      const P_URL = CMS_URL + this.param;
      Vue.axios.get(P_URL).then((res) => {
        this.data = res.data.cms;
        store.dispatch({
          type: type.Page,
          page: res.data.cms,
        });
      });
    },
  },
  created() {
    if (localStorage.getItem("email") != undefined) {
      store.dispatch({
        type: type.UserLogin,
        mail: localStorage.getItem("email"),
      });
    }
    Vue.axios.get(CMS_URL).then((res) => {
      this.cmsData = res.data.cms;
    });
  },
};
</script>

<style>
.country {
  margin-left: 15px;
  margin-top: 5px;
}
</style>