<template>
  <div>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
            <Sidebar />
            <Home />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Slider from "./includes/Slider.vue";
import Sidebar from "./includes/Sidebar.vue"
import Home from "./pages/Home.vue"
export default {
  name: "Main",
  components: {
    Slider,
    Sidebar,
    Home
  },
};
</script>

<style>
</style>