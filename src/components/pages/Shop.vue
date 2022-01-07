<template>
  <div>
    <section id="advertisement">
      <div class="container">
        <img src="images/shop/advertisement.jpg" alt="" />
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <!-- Main Content -->
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Features Items</h2>
              <!-- Product card start -->
              <div
                class="col-sm-4"
                v-for="product in proData"
                :key="product.id"
              >
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <!-- <img src="images/shop/product12.jpg" :alt="product.name" /> -->
                      <img
                        v-bind:src="server + product.thumbnail"
                        :alt="product.name"
                        height="200px"
                      />
                      <h2>₹ {{ product.price }}</h2>
                      <p>{{ product.name }}</p>
                      <router-link
                        :to="'/product-details/' + product.id"
                        class="btn btn-default view-product"
                        ><i class="fa fa-eye"></i> View Product</router-link
                      >
                      <br />
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to cart</a
                      >
                    </div>
                    <div class="product-overlay">
                      <div class="overlay-content">
                        <h2>₹ {{ product.price }}</h2>
                        <p>{{ product.name }}</p>
                        <router-link
                          :to="'/product-details/' + product.id"
                          class="btn btn-default view-product"
                          ><i class="fa fa-eye"></i> View Product</router-link
                        ><br />
                        <a href="#" class="btn btn-default add-to-cart"
                          ><i class="fa fa-shopping-cart"></i>Add to cart</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="choose">
                    <ul class="nav nav-pills nav-justified">
                      <li>
                        <a href=""
                          ><i class="fa fa-plus-square"></i>Add to wishlist</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- Product card end -->
            </div>
            <!--features_items-->
          </div>
          <!-- Main Content End -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store/store";
import * as type from "../../store/types";

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import Sidebar from "../includes/Sidebar.vue";

export default {
  name: "Shop",
  computed: {
    ...mapState({
      proData: (state) => state.proData,
    }),
  },
  components: {
    Sidebar,
  },
  data() {
    return {
      id: null,
      // proData: undefined,
      server: "http://127.0.0.1:8000/uploads/thumbnails/",
    };
  },
  mounted() {
      const P_URL = "http://127.0.0.1:8000/api/shop";
      Vue.axios.get(P_URL).then((res) => {
        store.dispatch({
          type: type.Products,
          pro: res.data.product,
        });
        // console.log(res.data);
        // this.proData = res.data.product;
        // console.log(this.proData);
      });
  },
};
</script>

<style>
</style>