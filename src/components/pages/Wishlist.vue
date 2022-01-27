<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Wishlist</li>
          </ol>
        </div>
        <div>
          <div class="table-responsive cart_info">
            <table class="table table-condensed">
              <thead>
                <tr class="cart_menu">
                  <td class="image">Item</td>
                  <td class="description"></td>
                  <td class="price">Price</td>
                  <td class="total">Actions</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inWish" :key="item.id">
                  <td class="cart_product">
                    <a
                      ><img
                        v-bind:src="`${IMG_URL}` + item.image"
                        :alt="item.name"
                    /></a>
                  </td>
                  <td class="cart_description">
                    <h4>
                      <a href="">{{ item.name }}</a>
                    </h4>
                    <p>Product ID: {{ item.code }}</p>
                  </td>
                  <td class="cart_price">
                    <p>{{ item.price }}</p>
                  </td>
                  <td class="cart_price">
                    <a class="btn btn-primary" @click="addCart(item)">
                      Move to Cart
                    </a>
                  </td>
                  <td class="cart_delete">
                    <a class="cart_quantity_delete" @click="del(item.pid)"
                      ><i class="fa fa-times"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="checkout-div">
          <router-link class="btn btn-default pull-right proactions" to="#"
            >Save Wishlist</router-link
          >
        </div>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import { IMG_URL } from "@/common/url";

export default {
  name: "Wishlist",
  data() {
    return {
      IMG_URL,
      inWish: undefined,
    };
  },
  created() {
    this.inWish = JSON.parse(localStorage.getItem("myWish"));
    this.inCart = JSON.parse(localStorage.getItem("myCart"));
  },
  methods: {
    addCart(pro) {
      if (localStorage.getItem("myCart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("myCart"));
        let obj = {
          pid: pro.pid,
          quantity: 1,
          name: pro.name,
          code: pro.code,
          price: pro.price,
          image: pro.image,
        };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addtocart", arr);
        this.del(pro.pid);
      } else {
        let arr = [];
        let obj = {
          pid: pro.pid,
          quantity: 1,
          name: pro.name,
          code: pro.code,
          price: pro.price,
          image: pro.image,
        };
        arr.push(obj);
        localStorage.setItem("myCart", JSON.stringify(arr));
        this.$store.dispatch("addtocart", arr);
        this.del(pro.pid);
      }
    },
    del(id) {
      var product = this.inWish.find((product) => product.pid === id);
      var index = this.inWish.indexOf(product);
      this.inWish.splice(index, 1);
      localStorage.setItem("myWish", JSON.stringify(this.inWish));
      this.$store.dispatch("updatewish", this.inWish);
    },
  },
};
</script>

<style>
.checkout-div {
  padding-bottom: 100px;
}
</style>