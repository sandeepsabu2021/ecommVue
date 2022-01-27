<template>
  <div id="profile_page">
    <div class="container">
      <div class="bg">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="title text-center">Profile</h2>
          </div>
        </div>
        <div class="row">
          <section class="profile-item">
            <h2 class="welcome">
              Welcome <span>{{ mail }}</span>
            </h2>
            <div>
              <router-link
                class="btn btn-default proactions"
                to="/profile/edit-profile"
                >Edit Profile</router-link
              >
              <router-link
                class="btn btn-default proactions"
                to="/profile/change-password"
                >Change Password</router-link
              >
              <router-link
                class="btn btn-default proactions"
                to="/profile/orders"
                >View/Track Orders</router-link
              >
            </div>
          </section>
          <section class="loadpages">
            <router-view></router-view>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState({
      mail: (state) => state.email,
    }),
  },
};
</script>

<style>
#profile_page {
  margin-bottom: 50px;
}
.proactions {
  color: white;
  background-color: #fe980f;
  margin-right: 5px;
}
.loadpages {
  padding-left: 100px;
  padding-top: 20px;
  padding-bottom: 20px;
}
.welcome {
  color: #b4b1ab;
  font-family: abel;
  font-size: 48px;
  margin-top: 25px;
}
.profile-item {
  padding-left: 100px;
}
</style>