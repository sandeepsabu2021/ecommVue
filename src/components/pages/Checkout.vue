<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="breadcrumbs">
          <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li class="active">Check out</li>
          </ol>
        </div>
        <!--/breadcrums-->

        <div class="step-one">
          <h2 class="heading">Step 1 : User Details</h2>
        </div>

        <div class="shopper-informations">
          <div class="row">
            <div class="col-sm-8 clearfix">
              <div class="bill-to">
                <div class="form-one">
                  <p>Billing Information</p>
                  <form>
                    <input
                      v-model="user.first_name"
                      type="text"
                      placeholder="First Name *"
                      :class="{
                        'is-invalid': submitted && $v.user.first_name.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.user.first_name.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.user.first_name.required"
                        >First name is required</span
                      >
                    </div>
                    <input
                      v-model="user.last_name"
                      type="text"
                      placeholder="Last Name *"
                      :class="{
                        'is-invalid': submitted && $v.user.last_name.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.user.last_name.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.user.last_name.required"
                        >Last name is required</span
                      >
                    </div>
                    <input
                      v-model="user.email"
                      type="email"
                      placeholder="Email *"
                      :class="{
                        'is-invalid': submitted && $v.user.email.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.user.email.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.user.email.required"
                        >Email is required</span
                      >
                      <span v-if="!$v.user.email.email"
                        >Email format invalid</span
                      >
                    </div>
                    <input
                      v-model="user.mobile"
                      type="number"
                      placeholder="Phone *"
                      :class="{
                        'is-invalid': submitted && $v.user.mobile.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.user.mobile.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.user.mobile.required"
                        >Mobile number is required</span
                      >
                      <span v-if="!$v.user.mobile.minLength"
                        >Invalid mobile
                      </span>
                      <span v-if="!$v.user.mobile.maxLength"
                        >Only 10 digits allowed</span
                      >
                    </div>
                  </form>
                </div>
                <div class="form-two">
                  <p>Shipping Address</p>
                  <form>
                    <input
                      v-model="address.line1"
                      type="text"
                      placeholder="Address 1 *"
                      :class="{
                        'is-invalid': submitted && $v.address.line1.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.address.line1.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.address.line1.required"
                        >Address is required</span
                      >
                    </div>
                    <input
                      v-model="address.line2"
                      type="text"
                      placeholder="Address 2"
                    />
                    <input
                      v-model="address.city"
                      type="text"
                      placeholder="City *"
                      :class="{
                        'is-invalid': submitted && $v.address.city.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.address.city.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.address.city.required"
                        >City is required</span
                      >
                    </div>
                    <input
                      v-model="address.pincode"
                      type="number"
                      placeholder="Zip / Postal Code *"
                      :class="{
                        'is-invalid': submitted && $v.address.pincode.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.address.pincode.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.address.pincode.required"
                        >Pincode is required</span
                      >
                      <span v-if="!$v.address.pincode.minLength"
                        >Invalid pincode
                      </span>
                      <span v-if="!$v.address.pincode.maxLength"
                        >Only 6 digits allowed</span
                      >
                    </div>
                    <select
                      v-model="address.state"
                      :class="{
                        'is-invalid': submitted && $v.address.state.$error,
                      }"
                    >
                      <option>-- State / Region --</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="delhi">New Delhi</option>
                      <option value="gujrat">Gujrat</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="kerala">Kerala</option>
                      <option value="west bengal">West Bengal</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="manipur">Manipur</option>
                    </select>
                    <div
                      v-if="submitted && $v.address.state.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.address.state.required"
                        >Select State</span
                      >
                    </div>
                    <input type="text" readonly placeholder="India" />
                  </form>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="order-message">
                <p>Shipping Order</p>
                <textarea
                  v-model="address.comment"
                  name="message"
                  placeholder="Notes about your order, Special Notes for Delivery"
                  rows="12"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="step-one">
          <h2 class="heading">Step 2 : Review Order</h2>
        </div>
        <CartItems @getTotal="gettotal($event)" />

        <div class="step-one">
          <h2 class="heading">Step 3 : Payment</h2>
        </div>

        <section class="payment">
          <button id="cod" class="paybtn btn" @click="cod">
            Cash on Delivery
          </button>
          <button id="opay" class="paybtn btn" @click="online">
            Online Payment
          </button>
          <div class="paybtn btn" ref="paypal"></div>
        </section>
        <div id="onlinepayform">
          <div class="row">
            <div class="col-sm-12 clearfix">
              <div class="bill-to">
                <p>Card Details</p>
                <div v-if="payMethod == 2" class="form-one">
                  <form>
                    <input
                      type="text"
                      placeholder="Card Name *"
                      v-model="card.name"
                      :class="{
                        'is-invalid': submitted && $v.card.name.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.card.name.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.card.name.required"
                        >Card name is required</span
                      >
                    </div>
                    <input
                      type="text"
                      placeholder="Expiry Date *"
                      v-model="card.expiry"
                      :class="{
                        'is-invalid': submitted && $v.card.expiry.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.card.expiry.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.card.expiry.required"
                        >Card expiry is required</span
                      >
                    </div>
                  </form>
                </div>
                <div v-if="payMethod == 2" class="form-two">
                  <form>
                    <input
                      type="number"
                      placeholder="Card Number *"
                      v-model="card.card"
                      :class="{
                        'is-invalid': submitted && $v.card.card.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.card.card.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.card.card.required"
                        >Card number is required</span
                      >
                      <span v-if="!$v.card.card.minLength"
                        >Minimum 12 digits allowed</span
                      >
                      <span v-if="!$v.card.card.maxLength"
                        >Minimum 16 digits allowed</span
                      >
                    </div>
                    <input
                      type="number"
                      placeholder="CVV *"
                      v-model="card.cvv"
                      :class="{
                        'is-invalid': submitted && $v.card.cvv.$error,
                      }"
                    />
                    <div
                      v-if="submitted && $v.card.cvv.$error"
                      class="invalid-feedback formError"
                    >
                      <span v-if="!$v.card.cvv.required">CVV is required</span>
                      <span v-if="!$v.card.cvv.minLength">Invalid CVV </span>
                      <span v-if="!$v.card.cvv.maxLength">Only 3 digits</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="step-one">
          <h2 class="heading">Step 4 : Coupon & Discounts</h2>
        </div>

        <section class="payment">
          <div class="row">
            <label class="col-sm-2">Coupon Code :</label>
            <div class="col-sm-4">
              <input type="text" placeholder="Coupon Code" v-model="coupon" />
            </div>
            <div>
              <button @click="applycoupon">Apply Coupon</button>
            </div>
          </div>
        </section>
        <div v-if="total > 0" class="text-right">
          <h4>Cart Total : ₹ {{ total }}</h4>
          <h4>Delivery Charges : ₹ {{ delivery }}</h4>
          <h4>Discount : ₹ {{ discount }}</h4>
          <h3>Total Amount : ₹ {{ amount }}</h3>
        </div>
        <section class="place-ord">
          <input
            type="button"
            id="placeord"
            class="paybtn btn btn-primary"
            @click="submitOrd"
            value="Place Order"
          />
        </section>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import { DEF_URL } from "@/common/url";
import CartItems from "./CartItems.vue";
import { placeOrder } from "@/common/service";

import {
  required,
  email,
  minLength,
  maxLength,
  // requiredIf,
} from "vuelidate/lib/validators";

export default {
  name: "Checkout",
  components: {
    CartItems,
  },

  data() {
    return {
      user: {
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        mobile: undefined,
      },
      address: {
        line1: undefined,
        line2: undefined,
        city: undefined,
        pincode: undefined,
        state: undefined,
        comment: undefined,
      },
      card: {
        name: undefined,
        card: undefined,
        expiry: undefined,
        cvv: undefined,
      },
      submitted: false,
      payMethod: undefined,
      total: null,
      delivery: 0,
      discount: 0,
      coupon: undefined,
      amount: null,
      coupon_id: 0,
    };
  },
  validations() {
    if (this.payMethod == 2) {
      return {
        user: {
          first_name: { required },
          last_name: { required },
          email: { required, email },
          mobile: {
            required,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
        },
        address: {
          line1: { required },
          city: { required },
          pincode: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(6),
          },
          state: { required },
        },
        card: {
          name: { required },
          card: {
            required,
            minLength: minLength(12),
            maxLength: maxLength(16),
          },
          expiry: { required },
          cvv: { required, minLength: minLength(3), maxLength: maxLength(3) },
        },
      };
    } else {
      return {
        user: {
          first_name: { required },
          last_name: { required },
          email: { required, email },
          mobile: { required },
        },
        address: {
          line1: { required },
          city: { required },
          pincode: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(6),
          },
          state: { required },
        },
      };
    }
  },
  methods: {
    gettotal(total) {
      this.total = total;
      if (total < 2000) {
        this.delivery = 500;
      } else {
        this.delivery = 0;
      }
      this.amount = this.total + this.delivery - this.discount;
    },
    online() {
      // document.getElementById('onlinepayform').style.visibility = "visible";
      document.getElementById("onlinepayform").style.display = "block";
      document.getElementById("opay").style.backgroundColor = "#FE980F";
      document.getElementById("cod").style.backgroundColor = "#FFFFFF";
      this.payMethod = 2;
    },
    cod() {
      document.getElementById("onlinepayform").style.display = "none";
      document.getElementById("cod").style.backgroundColor = "#FE980F";
      document.getElementById("opay").style.backgroundColor = "#FFFFFF";
      this.payMethod = 1;
    },
    submitOrd() {
      if (this.payMethod == undefined) {
        alert("Select mode of payment");
      } else {
        this.submitted = true;
        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        if (this.total != 0) {
          if (confirm("Place Order?")) {
            let formData = {
              id: localStorage.getItem("email"),
              first_name: this.user.first_name,
              last_name: this.user.last_name,
              email: this.user.email,
              mobile: this.user.mobile,
              line1: this.address.line1,
              line2: this.address.line2,
              city: this.address.city,
              pincode: this.address.pincode,
              state: this.address.state,
              comment: this.address.comment,
              mode: this.payMethod,
              cart: JSON.parse(localStorage.getItem("myCart")),
              total: this.amount,
              cardname: this.card.name,
              card: this.card.card,
              expiry: this.card.expiry,
              cvv: this.card.cvv,
              coupon: this.coupon_id,
            };
            // console.log(formData);
            placeOrder(formData)
              .then((res) => {
                if (res.data.error == 0) {
                  alert(res.data.msg);
                  var cart = JSON.parse(localStorage.getItem("myCart"));
                  cart.splice(0, cart.length);
                  this.$store.dispatch("updatecart", cart);
                  localStorage.removeItem("myCart");
                  this.$router.push({ path: "/" });
                }
                if (res.data.error == 1) {
                  alert(res.data.msg);
                }
              })
              .catch((error) => {
                console.log("Something went wrong " + error);
              });
          }
        }
      }
    },
    applycoupon() {
      const C_URL = DEF_URL + "coupon/" + this.coupon;
      Vue.axios
        .get(C_URL)
        .then((res) => {
          if (res.data.err == 0) {
            if (res.data.coupon.quantity > 0) {
              if (res.data.coupon.type == 2) {
                if (this.total > 2500) {
                  this.discount = res.data.coupon.amount;
                  this.coupon_id = res.data.coupon.id;
                } else {
                  alert("Coupon applicable on cart value above 2500");
                }
              } else {
                this.discount = (res.data.coupon.amount * this.total) / 100;
                this.coupon_id = res.data.coupon.id;
              }
            } else {
              alert("Coupon expired");
            }
          }
          if (res.data.err == 1) {
            alert(res.data.msg);
          }
        })
        .catch((error) => {
          console.log("Something went wrong " + error);
        });
    },
    setLoaded() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  // description: this.product.description,
                  amount: {
                    // currency_code: "USD",
                    value: this.amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
  mounted() {
    document.getElementById("onlinepayform").style.display = "none";
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Afw1OUmIZHGsERsKc6XNiITxOJNFNLevSJBHuqqaPsT7JEsm9DUWpOPqNIYTMdrnNeP3gAxKhTWQshp0";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
};
</script>

<style>
#onlinepayform {
  margin-top: 10px;
  margin-bottom: 40px;
}
.paybtn {
  margin-right: 10px;
  padding: 1%;
}
.payment {
  margin-top: 10px;
  margin-bottom: 25px;
}
.place-ord {
  padding-bottom: 5%;
}
#placeord {
  display: block;
  margin-left: auto;
  margin-right: 0;
}
</style>
