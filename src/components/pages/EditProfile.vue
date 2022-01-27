<template>
  <div>
    <h2 class="router-title">Edit Profile</h2>
    <div class="row">
      <div class="col-sm-8">
        <div class="contact-form">
          <div class="status alert alert-success" style="display: none"></div>
          <form
            id="main-pass-form"
            class="pass-form"
            name="pass-form"
            @submit.prevent="handleEditPro"
          >
            <div class="form-group row">
              <label for="fname" class="col-sm-2 col-form-label"
                >First Name:</label
              >
              <div class="col-sm-10">
                <input
                  v-if="profileData"
                  type="text"
                  class="form-control"
                  v-model="profileData.first_name"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  :class="{
                    'is-invalid': submitted && $v.profileData.first_name.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.profileData.first_name.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.profileData.first_name.required"
                    >First name is required</span
                  >
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="lname" class="col-sm-2 col-form-label"
                >Last Name:</label
              >
              <div class="col-sm-10">
                <input
                  v-if="profileData"
                  class="form-control"
                  type="text"
                  v-model="profileData.last_name"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  :class="{
                    'is-invalid': submitted && $v.profileData.last_name.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.profileData.last_name.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.profileData.last_name.required"
                    >Last name is required</span
                  >
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="email" class="col-sm-2 col-form-label">Email:</label>
              <div class="col-sm-10">
                <input
                  v-if="profileData"
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                  v-model="profileData.email"
                  id="email"
                  name="email"
                  :class="{
                    'is-invalid': submitted && $v.profileData.email.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.profileData.email.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.profileData.email.required"
                    >Email is required</span
                  >
                  <span v-if="!$v.profileData.email.email"
                    >Email format invalid</span
                  >
                </div>
              </div>
            </div>
            <input
              v-if="profileData"
              type="hidden"
              v-model="profileData.id"
              id="uid"
              name="uid"
            />

            <div class="form-group col-md-12">
              <input
                type="submit"
                name="submit"
                class="btn btn-primary pull-left"
                value="Submit"
              />
            </div>
          </form>
        </div>
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

import { editprofile } from "@/common/service";
import { DEF_URL } from "@/common/url";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "EditProfile",
  computed: {
    ...mapState({
      mail: (state) => state.email,
      profileData: (state) => state.profileData,
    }),
  },
  data() {
    return {
      submitted: false,
      emailid: undefined,
    };
  },
  validations: {
    profileData: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
    },
  },
  methods: {
    handleEditPro() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let formData = {
        first_name: this.profileData.first_name,
        last_name: this.profileData.last_name,
        email: this.profileData.email,
        id: this.profileData.id,
      };
      editprofile(formData)
        .then((res) => {
          if (res.data.error == 0) {
            alert(res.data.msg);
            store.dispatch({
              type: type.UserLogin,
              mail: res.data.user.email,
            });
            localStorage.setItem("email", res.data.user.email);
          }
          if (res.data.error == 1) {
            alert(res.data.msg);
          }
        })
        .catch((error) => {
          console.log("Something went wrong " + error);
        });
    },
  },
  mounted() {
    this.emailid = localStorage.getItem("email");
    const P_URL = DEF_URL + "profile/" + this.emailid;
    Vue.axios.get(P_URL).then((res) => {
      store.dispatch({
        type: type.Profile,
        profile: res.data.profile,
      });
    });
  },
};
</script>

<style>
.router-title {
  margin-bottom: 25px;
}
</style>