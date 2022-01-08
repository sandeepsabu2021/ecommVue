<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <!-- <Sidebar /> -->
          <!-- Main Content -->
          <div class="col-sm-10">
            <div class="product-details">
              <!--product-details-->
              <div class="col-sm-5">
                <div v-if="product" class="view-product">
                  <img
                    v-bind:src="tserver + product.thumbnail"
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
                          v-bind:src="iserver + img.image"
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
                    <input type="number" value="1" />
                    <button type="button" class="btn btn-fefault cart">
                      <i class="fa fa-shopping-cart"></i>
                      Add to cart
                    </button>
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
                      <p></p>
                      <article
                        class="procolor"
                        :style="{ backgroundColor: details.color }"
                      ></article>
                    </div>
                    <p v-if="product.description"><b>Description:</b> {{product.description}}</p>
                  </section>
                </div>
                <!--/product-information-->
                <section id="advertisement">
                    
                </section>
              </div>
            </div>
            <!--/product-details-->

            <!--/recommended_items-->
          </div>
          <div class="col-sm-2 padding-right">
            <!-- <Recommend /> -->
            <div>
              <div class="recommended_items">
                <!--recommended_items-->
                <h2 class="title text-center">recommended items</h2>

                <div
                  id="recommended-item-carousel"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="item active">
                      <div>
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart"
                                ><i class="fa fa-shopping-cart"></i>Add to
                                cart</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart"
                                ><i class="fa fa-shopping-cart"></i>Add to
                                cart</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart"
                                ><i class="fa fa-shopping-cart"></i>Add to
                                cart</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div>
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart"
                                ><i class="fa fa-shopping-cart"></i>Add to
                                cart</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart"
                                ><i class="fa fa-shopping-cart"></i>Add to
                                cart</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart"
                                ><i class="fa fa-shopping-cart"></i>Add to
                                cart</a
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
          </div>
          <!-- Main Content End -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);
// import Sidebar from "../includes/Sidebar.vue";
// import Recommend from "../includes/Recommend.vue";

export default {
  name: "Details",
  components: {
    // Sidebar,
    // Recommend,
  },
  created() {
    this.id = this.$route.params.id;
    const P_URL = "http://127.0.0.1:8000/api/shop/product/" + this.id;
    Vue.axios.get(P_URL).then((res) => {
      // console.log(res.data);
      this.product = res.data.product;
      this.details = res.data.details;
      this.images = res.data.images;
      console.log(this.product);
    });
  },
  data() {
    return {
      id: null,
      product: undefined,
      details: undefined,
      images: undefined,
      tserver: "http://127.0.0.1:8000/uploads/thumbnails/",
      iserver: "http://127.0.0.1:8000/uploads/products/",
    };
  },
};
</script>

<style>
.procolor {
  height: 10px;
  width: 20px;
}
/* .product_image {
  width: 150px;
  height: 150px;
  margin-left: 15px;
  margin-right: 15px;
} */
</style>