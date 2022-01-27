<template>
  <div>
    <div class="col-sm-9 padding-right">
      <div class="features_items">
        <!--features_items-->
        <h2 class="title text-center">Features Items</h2>
        <div v-if="proData">
          <div class="col-sm-4" v-for="product in proData" :key="product.id">
            <div class="product-image-wrapper">
              <div class="single-products">
                <div class="productinfo text-center">
                  <img
                    v-bind:src="`${IMG_URL}` + product.thumbnail"
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
            </div>
          </div>
        </div>
      </div>
      <!--features_items-->

      <Recommend />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { IMG_URL } from "@/common/url";
import { feature } from "@/common/fetch";

import Recommend from "../includes/Recommend.vue";

export default {
  name: "Home",
  computed: {
    ...mapState({
      mail: (state) => state.email,
    }),
  },
  components: {
    Recommend,
  },
  methods: {
    addCart(pro) {
      // console.log(id)
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
    added() {
      alert("Product already added");
    },
  },
  data() {
    return {
      IMG_URL,
      inCart: undefined,
      proData: undefined,
    };
  },
  mounted() {
    this.inCart = JSON.parse(localStorage.getItem("myCart"));
    feature().then((res) => {
      this.proData = res.data.feature;
    });
  },
};
</script>

<style>
</style>