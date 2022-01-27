<template>
  <div>
    <section id="slider">
      <!--slider-->
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div
              id="slider-carousel"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                <li
                  data-target="#slider-carousel"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  v-for="banner in bannerData"
                  :key="banner.id"
                  data-target="#slider-carousel"
                  data-slide-to="banner.id"
                ></li>
              </ol>

              <div class="carousel-inner">
                <div class="item active">
                  <div class="col-sm-6">
                    <h1><span>E</span>-SHOPPER</h1>
                    <h2>Free E-Commerce Template</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <router-link class="btn btn-default get" to="/product"
                      ><a @click="getproduct" class="btn-text"
                        >Shop now</a
                      ></router-link
                    >
                  </div>
                  <div class="col-sm-6">
                    <img
                      src="images/home/girl1.jpg"
                      class="girl img-responsive"
                      alt=""
                    />
                    <img src="images/home/pricing.png" class="pricing" alt="" />
                  </div>
                </div>

                <div v-for="banner in bannerData" :key="banner.id" class="item">
                  <div class="col-sm-6">
                    <h1>{{ banner.title }}</h1>
                    <h2>{{ banner.sub_title }}</h2>
                    <p>
                      {{ banner.body }}
                    </p>
                    <router-link
                      to="/product"
                      type="button"
                      class="btn btn-default get"
                    >
                      <a @click="getproduct" class="btn-text">Get it now</a>
                    </router-link>
                  </div>
                  <div class="col-sm-6">
                    <img
                      v-bind:src="`${BANNER_URL}` + banner.image"
                      :alt="banner.title"
                      class="girl img-responsive"
                      :style="{ height: '441px', width: '484px' }"
                    />
                  </div>
                </div>
              </div>

              <a
                href="#slider-carousel"
                class="left control-carousel hidden-xs"
                data-slide="prev"
              >
                <i class="fa fa-angle-left"></i>
              </a>
              <a
                href="#slider-carousel"
                class="right control-carousel hidden-xs"
                data-slide="next"
              >
                <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/slider-->
  </div>
</template> 

<script>
import { BANNER_URL, DEF_URL } from "@/common/url";
import { banner } from "@/common/fetch";
import { mapState } from "vuex";
import store from "../../store/store";
import * as type from "../../store/types";

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

export default {
  name: "Slider",
  computed: {
    ...mapState({
      bannerData: (state) => state.bannerData,
      proData: (state) => state.proData,
    }),
  },
  data() {
    return {
      BANNER_URL,
    };
  },
  created() {
    banner().then((res) => {
      store.dispatch({
        type: type.Banner,
        banner: res.data.banner,
      });
    });
  },
  methods: {
    getproduct() {
      const P_URL = DEF_URL + "shop";
      Vue.axios.get(P_URL).then((res) => {
        store.dispatch({
          type: type.Products,
          pro: res.data.product,
        });
      });
    },
  },
};
</script>

<style>
</style>