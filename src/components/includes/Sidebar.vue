<template>
  <div>
    <div class="col-sm-3">
      <div class="left-sidebar">
        <h2>Category</h2>
        <div class="panel-group category-products" id="accordian">
          <!--category-productsr-->

          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <router-link to="/product">
                  <a @click="getFilter('/')"> ALL </a></router-link
                >
              </h4>
            </div>
            <div
              class="panel-heading"
              v-for="category in catData"
              :key="category.id"
            >
              <h4 class="panel-title">
                <router-link to="/product">
                  <a @click="getFilter('/' + category.id)">{{
                    category.name
                  }}</a></router-link
                >
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
              <li v-for="brand in brandData" :key="brand.brand">
                <router-link to="/product">
                  <a
                    v-if="brand.brand != null"
                    @click="getFilter('/' + brand.brand)"
                  >
                    <span class="pull-right">({{ brand.brand_count }})</span
                    >{{ brand.brand }}</a
                  ></router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <!--/brands_products-->

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
import { category, brand } from "@/common/fetch";


export default {
  name: "Sidebar",
  computed: {
    ...mapState({
      filter: (state) => state.filter,
    }),
  },
  data() {
    return {
      catData: undefined,
      brandData: undefined,
      id: null,
    };
  },
  mounted() {
    category().then((res) => {
      this.catData = res.data.category;
    });
    brand().then((res) => {
      this.brandData = res.data.brand;
    });
  },
  methods: {
    getFilter(id) {
      store.dispatch({
        type: type.Category,
        filter: id,
      });
    },
  },
};
</script>

<style>
</style>