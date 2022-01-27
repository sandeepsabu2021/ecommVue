<template>
  <div>
    <h2 class="router-title">View/ Track Orders</h2>
    <div class="row">
      <div class="col-sm-12">
        <table class="table table-condensed" border="1">
          <thead>
            <tr>
              <th class="text-center">Sr.No.</th>
              <th class="text-center">Order Id</th>
              <th class="text-center">Products</th>
              <th class="text-center">Total</th>
              <th class="text-center">Payment Details</th>
              <th class="text-center">Shipping Address</th>
              <th class="text-center">Date</th>
              <th class="text-center">Order Status</th>
            </tr>
          </thead>
          <tbody v-if="data">
            <tr v-for="(ord, index) in data.ord.order" :key="ord.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ ord.id }}</td>
              <td>
                <section v-for="dets in data.ord.details" :key="dets.id">
                  <p v-if="ord.id == dets.order_id">
                    <span></span>
                    <span>
                      {{ dets.product_name }} x {{ dets.quantity }} @ ₹
                      {{ dets.price }} = ₹ {{ dets.total }}</span
                    ><br />
                  </p>
                </section>
                <span v-if="ord.coupon_id != null">
                  <span v-for="cop in data.ord.coupon" :key="cop.id">
                    <i v-if="cop.id == ord.coupon_id"> {{ cop.code }}</i>
                  </span>
                  Applied</span
                >
              </td>
              <td class="text-center">₹ {{ ord.total }}</td>
              <td class="text-center">
                <span v-if="ord.payment_mode == 0">COD - pending</span>
                <span v-else-if="ord.payment_mode == 1">COD - paid</span>
                <span v-else
                  >Paid Online - Transaction Id : {{ ord.transaction_id }}</span
                >
              </td>
              <td>
                <section v-for="add in data.ord.address" :key="add.id">
                  <p v-if="add.id == ord.address_id">
                    {{ add.name }}, {{ add.address_1 }}, {{ add.address_2 }},
                    {{ add.city }}, {{ add.state }}. Postal Code -
                    {{ add.postal_code }}
                  </p>
                </section>
              </td>
              <td class="text-center">{{ ord.created_at.substring(0, 10) }}</td>
              <td class="text-center">
                <span v-if="ord.status == 0">Placed</span>
                <span v-else-if="ord.status == 1">Confirmed</span>
                <span v-else-if="ord.status == 2">Shipped</span>
                <span v-else>Delivered</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { DEF_URL } from "@/common/url";
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

export default {
  name: "Orders",
  data() {
    return {
      email: undefined,
      data: undefined,
      product: undefined,
    };
  },
  mounted() {
    this.email = localStorage.getItem("email");
    const O_URL = DEF_URL + "order/" + this.email;
    Vue.axios.get(O_URL).then((res) => {
      this.data = res.data;
      this.product = this.data.ord.product;
      // console.log(this.data.ord.details);
    });
  },
};
</script>

<style>
</style>