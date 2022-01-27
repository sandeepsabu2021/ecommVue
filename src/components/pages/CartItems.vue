<template>
  <div>
    <div class="table-responsive cart_info">
      <table class="table table-condensed">
        <thead>
          <tr class="cart_menu">
            <td class="image">Item</td>
            <td class="description"></td>
            <td class="price">Price</td>
            <td class="quantity">Quantity</td>
            <td class="total">Total</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inCart" :key="item.id">
            <td class="cart_product">
              <a><img  v-bind:src="`${IMG_URL}` + item.image" :alt="item.name" /></a>
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
            <td class="cart_quantity">
              <div class="cart_quantity_button">
                <a class="cart_quantity_up" @click="add(item.pid)"> + </a>
                <input
                  class="cart_quantity_input"
                  type="text"
                  name="quantity"
                  :value="item.quantity"
                  autocomplete="off"
                  size="2"
                />
                <a class="cart_quantity_down" @click="sub(item.pid)"> - </a>
              </div>
            </td>
            <td class="cart_total">
              <p class="cart_total_price">₹ {{ item.quantity * item.price }}</p>
            </td>
            <td class="cart_delete">
              <a class="cart_quantity_delete" @click="del(item.pid)"
                ><i class="fa fa-times"></i
              ></a>
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td class="text-center"><h4>Total</h4></td>
            <td class="cart_total">
              <p class="cart_total_price">₹ {{ totalAmount }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { IMG_URL } from "@/common/url";

export default {
  name: "CartItems",
  computed: {
    totalAmount: function () {
      var sum = 0;
      if (this.inCart != undefined) {
        this.inCart.forEach((e) => {
          sum += e.price * e.quantity;
        });
      }
      this.$emit("getTotal", sum);
      return sum;
    },
  },
  data() {
    return {
      IMG_URL,
      inCart: undefined,
      total: 0,
    };
  },
  methods: {
    add(id) {
      var product = this.inCart.find((product) => product.pid === id);
      if (product) {
        if (product.quantity > 4) {
          alert("Maximum buying limit reached");
        } else {
          product.quantity += 1;
        }
      }
      localStorage.setItem("myCart", JSON.stringify(this.inCart));
      this.$store.dispatch("updatecart", this.inCart);
    },
    sub(id) {
      var product = this.inCart.find((product) => product.pid === id);
      var index = this.inCart.indexOf(product);
      if (product) {
        product.quantity -= 1;
        if (product.quantity < 1) {
          this.inCart.splice(index, 1);
        }
      }
      localStorage.setItem("myCart", JSON.stringify(this.inCart));
      this.$store.dispatch("updatecart", this.inCart);
    },
    del(id) {
      var product = this.inCart.find((product) => product.pid === id);
      var index = this.inCart.indexOf(product);
      this.inCart.splice(index, 1);
      localStorage.setItem("myCart", JSON.stringify(this.inCart));
      this.$store.dispatch("updatecart", this.inCart);
    },
  },
  created() {
    this.inCart = JSON.parse(localStorage.getItem("myCart"));
  },
};
</script>

<style>
</style>