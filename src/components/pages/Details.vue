<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <!-- Main Content -->
          <div class="col-sm-9 padding-right">
            <div class="product-details">
              <!--product-details-->
              <div class="col-sm-5">
                <div v-if="product" class="view-product">
                  <img
                    v-bind:src="`${IMG_URL}` + product.thumbnail"
                    :alt="product.name"
                  />
                </div>
                <div id="similar-product row" v-if="images">
                  <!-- Wrapper for slides -->
                  <div>
                    <div class="rel-product">
                      <a v-for="img in images" :key="img.id"
                        ><img
                          class="col-sm-6"
                          v-bind:src="`${PRODUCT_URL}` + img.image"
                          :alt="img.image"
                      /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-7">
                <div v-if="product" class="product-information">
                  <!--/product-information-->
                  <h2>{{ product.name }}</h2>
                  <p>Product Code: {{ product.code }}</p>

                  <span>
                    <span>₹ {{ product.price }}</span>
                    <label>Quantity:</label>
                    <input v-model="proquant" type="number" />
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
                  </span>

                  <section v-if="details">
                    <p v-if="details.quantity > 10">
                      <b>Availability:</b> In Stock
                    </p>
                    <p
                      v-else-if="details.quantity < 10 && details.quantity > 1"
                    >
                      <b>Availability:</b> Limited
                    </p>
                    <p v-else><b>Availability:</b> Out of Stock</p>
                    <p v-if="details.brand">
                      <b>Brand:</b> {{ details.brand }}
                    </p>
                    <p><b>Gender:</b> {{ details.gender }}</p>
                    <p v-if="details.size"><b>Size:</b> {{ details.size }}</p>
                    <div v-if="details.color != '#000000'">
                      <p><b>Color:</b></p>
                      <article
                        class="procolor"
                        :style="{ backgroundColor: details.color }"
                      ></article>
                    </div>
                    <p v-if="product.description">
                      <b>Description:</b> {{ product.description }}
                    </p>
                  </section>
                </div>
                <!--/product-information-->
              </div>
            </div>
            <!--/product-details-->
            <Recommend />
            <!--/recommended_items-->
          </div>
          <!-- Main Content End -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { IMG_URL } from "@/common/url";
import { PRODUCT_URL } from "@/common/url";
import { DETAILS_URL } from "@/common/url";

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import Sidebar from "../includes/Sidebar.vue";
import Recommend from "../includes/Recommend.vue";

export default {
  name: "Details",
  components: {
    Sidebar,
    Recommend,
  },
  methods: {
    addCart(pro) {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = {
          pid: pro.id,
          quantity: this.proquant,
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
          quantity: this.proquant,
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
    added() {
      alert("Product already added");
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.inCart = JSON.parse(localStorage.getItem("myCart"));

    const P_URL = DETAILS_URL + this.id;
    Vue.axios.get(P_URL).then((res) => {
      this.product = res.data.product;
      this.details = res.data.details;
      this.images = res.data.images;
      // console.log(this.product);
    });
  },
  data() {
    return {
      IMG_URL,
      PRODUCT_URL,
      id: null,
      proquant: 1,
      inCart: undefined,
      product: undefined,
      details: undefined,
      images: undefined,
    };
  },
};
</script>

<style>
.procolor {
  height: 10px;
  width: 20px;
}
</style>