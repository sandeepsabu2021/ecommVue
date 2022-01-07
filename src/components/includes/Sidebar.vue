<template>
  <div>
    <div class="col-sm-3">
      <div class="left-sidebar">
        <h2>Category</h2>
        <div class="panel-group category-products" id="accordian">
          <!--category-productsr-->

          <div class="panel panel-default">
            <div
              class="panel-heading"
              
            >
              <h4 class="panel-title">
                <a @click="getCat('/')">
                  ALL
                </a>
              </h4>
            </div>
            <div
              class="panel-heading"
              v-for="category in catData"
              :key="category.id"
            >
              <h4 class="panel-title">
                <a @click="getCat('/'+category.id)">{{
                  category.name
                }}</a>
              </h4>
            </div>
          </div>
        </div>
        <!--/category-products-->

        <div class="brands_products">
          <!--brands_products-->
          <h2>Brands</h2>
          <div class="brands-name">
            <ul class="nav nav-pills nav-stacked">
              <li>
                <a href="#"> <span class="pull-right">(50)</span>Acne</a>
              </li>
              <li>
                <a href="#"> <span class="pull-right">(56)</span>Grüne Erde</a>
              </li>
              <li>
                <a href="#"> <span class="pull-right">(27)</span>Albiro</a>
              </li>
              <li>
                <a href="#"> <span class="pull-right">(32)</span>Ronhill</a>
              </li>
              <li>
                <a href="#"> <span class="pull-right">(5)</span>Oddmolly</a>
              </li>
              <li>
                <a href="#"> <span class="pull-right">(9)</span>Boudestijn</a>
              </li>
              <li>
                <a href="#">
                  <span class="pull-right">(4)</span>Rösch creative culture</a
                >
              </li>
            </ul>
          </div>
        </div>
        <!--/brands_products-->

        <div class="price-range">
          <!--price-range-->
          <h2>Price Range</h2>
          <div class="well text-center">
            <input
              type="text"
              class="span2"
              value=""
              data-slider-min="0"
              data-slider-max="600"
              data-slider-step="5"
              data-slider-value="[250,450]"
              id="sl2"
            /><br />
            <b class="pull-left">$ 0</b> <b class="pull-right">$ 600</b>
          </div>
        </div>
        <!--/price-range-->

        <div class="shipping text-center">
          <!--shipping-->
          <img src="images/home/shipping.jpg" alt="" />
        </div>
        <!--/shipping-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store/store";
import * as type from "../../store/types";

import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

export default {
  name: "Sidebar",
  computed: {
    ...mapState({
      catId: (state) => state.catID,
    }),
  },
  data() {
    return {
      catData: undefined,
      id: null,
    };
  },
  mounted() {
    const C_URL = "http://127.0.0.1:8000/api/category";
    Vue.axios.get(C_URL).then((res) => {
      // console.log(res.data);
      this.catData = res.data.category;
      // console.log(this.catData);
    });
  },
  methods: {
    getCat(id) {
      store.dispatch({
        type: type.Category,
        catID: id,
      });
    },
  },
};
</script>

<style>
</style>