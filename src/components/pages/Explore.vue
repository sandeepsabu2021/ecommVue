<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <!-- Main Content -->
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Explore</h2>
              <section v-if="page">
                <h2>{{page.title}}</h2>
                <p>{{page.body}}</p>
              </section>
            </div>
            <!--features_items-->
          </div>
          <!-- Main Content End -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import Sidebar from "../includes/Sidebar.vue";

export default {
  name: "Explore",
  components: {
    Sidebar,
  },
  computed: {
    ...mapState({
      page: (state) => state.page,
    }),
  },
};
</script>

<style>
.exp-section {
  margin-bottom: 50px;
}
.main-section {
  padding: 2%;
}
.explore-title {
  color: #363432;
  font-family: "Roboto", sans-serif;
  font-size: 41px;
  font-weight: 300;
}
.post {
  background-color: #ffe3a1;
  padding: 2%;
  margin-bottom: 25px;
}
</style>