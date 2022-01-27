<template>
  <div>
    <div class="recommended_items">
      <!--recommended_items-->
      <h2 class="title text-center">recommended items</h2>

      <div
        id="recommended-item-carousel"
        class="carousel slide"
        data-ride="carousel"
        v-if="recData"
      >
        <div class="carousel-inner">
          <div v-if="rec1" class="item active">
            <div class="col-sm-4" v-for="product in rec1" :key="product.id">
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
          <div v-if="rec2.length>0" class="item">
            <div class="col-sm-4" v-for="product in rec2" :key="product.id">
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
        <a
          class="left recommended-item-control"
          href="#recommended-item-carousel"
          data-slide="prev"
        >
          <i class="fa fa-angle-left"></i>
        </a>
        <a
          class="right recommended-item-control"
          href="#recommended-item-carousel"
          data-slide="next"
        >
          <i class="fa fa-angle-right"></i>
        </a>
      </div>
    </div>
    <!--/recommended_items-->
  </div>
</template>

<script>
import { IMG_URL } from "@/common/url";
import { recommend } from "@/common/fetch";

export default {
  name: "Recommend",
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
      inCart: undefined,
      recData: undefined,
      rec1: undefined,
      rec2: undefined,
      IMG_URL,
    };
  },
  mounted() {
    this.inCart = JSON.parse(localStorage.getItem("myCart"));
    recommend().then((res) => {
      this.recData = res.data.recommend;
      this.rec1 = this.recData.slice(0, 3);
      this.rec2 = this.recData.slice(3, 6);
    });
  },
};
</script>

<style>
</style>