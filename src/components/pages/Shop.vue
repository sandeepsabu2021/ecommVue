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
                      <img
                        v-bind:src="`${IMG_URL}`+product.thumbnail"
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
                      <a
                        v-if="
                          inCart && inCart.find((pro) => pro.pid === product.id)
                        "
                        class="btn btn-default add-to-cart"
                        @click="added"
                        ><i class="fa fa-shopping-cart"></i>Added</a
                      >
                      <a
                        v-else
                        :id="product.id"
                        @click.once="addCart(product)"
                        class="btn btn-default add-to-cart"
                        ><i class="fa fa-shopping-cart"></i>Add to Cart</a
                      >
                    </div>
                  </div>
                  <div class="choose" v-if="mail">
                    <ul class="nav nav-pills nav-justified">
                      <li>
                        <a
                          v-if="
                            inWish &&
                            inWish.find((pro) => pro.pid === product.id)
                          "
                          class="btn btn-default add-to-cart"
                          @click="added"
                          >Added to Wishlist</a
                        >
                        <a
                          v-else
                          :id="'w' + product.id"
                          @click.once="addWish(product)"
                          class="btn btn-default add-to-cart"
                          ><i class="fa fa-plus-square"></i>Add to Wishlist</a
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
import { IMG_URL } from "@/common/url";

import Sidebar from "../includes/Sidebar.vue";

export default {
  name: "Shop",
  computed: {
    ...mapState({
      proData: (state) => state.proData,
      mail: (state) => state.email,
    }),
  },
  components: {
    Sidebar,
  },
  methods: {
    addCart(pro) {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = {
          pid: pro.id,
          quantity: 1,
          name: pro.name,
          code: pro.code,
          price: pro.price,
          image: pro.thumbnail,
        };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addtocart", arr);
        document.getElementById(pro.id).innerHTML = "Added";
      } else {
        let arr = [];
        let obj = {
          pid: pro.id,
          quantity: 1,
          name: pro.name,
          code: pro.code,
          price: pro.price,
          image: pro.thumbnail,
        };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addtocart", arr);
        document.getElementById(pro.id).innerHTML = "Added";
      }
    },
    addWish(pro) {
      if (localStorage.getItem("myWish") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myWish"));
        let obj = {
          pid: pro.id,
          quantity: 1,
          name: pro.name,
          code: pro.code,
          price: pro.price,
          image: pro.thumbnail,
        };
        arr.push(obj);
        localStorage.setItem("myWish", JSON.stringify(arr));
        this.$store.dispatch("addtowish", arr);
        document.getElementById("w" + pro.id).innerHTML = "Added to Wishlist";
      } else {
        let arr = [];
        let obj = {
          pid: pro.id,
          quantity: 1,
          name: pro.name,
          code: pro.code,
          price: pro.price,
          image: pro.thumbnail,
        };
        arr.push(obj);
        localStorage.setItem("myWish", JSON.stringify(arr));
        this.$store.dispatch("addtowish", arr);
        document.getElementById("w" + pro.id).innerHTML = "Added to Wishlist";
      }
    },
    added() {
      alert("Product already added");
    },
  },
  created() {
    this.inCart = JSON.parse(localStorage.getItem("myCart"));
    this.inWish = JSON.parse(localStorage.getItem("myWish"));
  },
  data() {
    return {
      IMG_URL,
      id: null,
      inCart: undefined,
      inWish: undefined,
    };
  },
};
</script>

<style>
</style>