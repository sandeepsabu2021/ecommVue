<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Shopping Cart</li>
          </ol>
        </div>
        <CartItems />
        <div class="checkout-div">
          <router-link class="btn btn-default pull-right proactions" to="/checkout"
            >Proceed to Checkout</router-link
          >
        </div>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import CartItems from './CartItems.vue'

export default {
  name: "Cart",
  components: {
    CartItems
  }
};
</script>

<style>
.checkout-div{
  padding-bottom: 100px;
}
</style>