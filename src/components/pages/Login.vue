<template>
  <div>
    <section id="form">
      <!--form-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-1">
            <div class="login-form">
              <!--login form-->
              <h2>Login to your account</h2>
              <form @submit.prevent="handleLog">
                <input
                  type="email"
                  placeholder="Email Address"
                  v-model="login.email"
                  id="logemail"
                  name="email"
                  :class="{ 'is-invalid': submitted && $v.login.email.$error }"
                />
                <div
                  v-if="submitted && $v.login.email.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.login.email.required">Email is required</span>
                  <span v-if="!$v.login.email.email">Email format invalid</span>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  v-model="login.password"
                  id="logpassword"
                  name="password"
                  :class="{
                    'is-invalid': submitted && $v.login.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.login.password.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.login.password.required"
                    >Password is required</span
                  >
                </div>
                <span>
                  <input type="checkbox" class="checkbox" />
                  Keep me signed in
                </span>
                <button type="submit" class="btn btn-default">Login</button>
              </form>
            </div>
            <!--/login form-->
          </div>
          <div class="col-sm-1">
            <h2 class="or">OR</h2>
          </div>
          <div class="col-sm-4">
            <div class="signup-form">
              <!--sign up form-->
              <h2>New User Signup!</h2>
              <form @submit.prevent="handleReg">
                <input
                  type="text"
                  v-model="user.first_name"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
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
                  type="text"
                  v-model="user.last_name"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
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
                  type="email"
                  placeholder="Email Address"
                  v-model="user.email"
                  id="regemail"
                  name="email"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email format invalid</span>
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  id="regpassword"
                  name="password"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.user.password.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >Password must be at least 8 characters</span
                  >
                  <span v-if="!$v.user.password.maxLength"
                    >Password must be at least 16 characters</span
                  >
                </div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  v-model="user.confirm_password"
                  id="confirm_password"
                  name="confirm_password"
                  :class="{
                    'is-invalid': submitted && $v.user.confirm_password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.confirm_password.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.user.confirm_password.required"
                    >Confirm password is required</span
                  >
                  <span v-else-if="!$v.user.confirm_password.sameAsPassword"
                    >Passwords must match</span
                  >
                </div>
                <button type="submit" class="btn btn-default">Signup</button>
              </form>
            </div>
            <!--/sign up form-->
          </div>
        </div>
      </div>
    </section>
    <!--/form-->
  </div>
</template>

<script>
import { userLogin } from "@/common/service";
import { userRegister } from "@/common/service";
import { saveToken } from '@/common/jwttoken'
import { mapState } from 'vuex'
import store from '../../store/store';
import * as type from '../../store/types';

import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      user: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm_password: null,
      },
      login: {
        email: null,
        password: null,
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8), maxLength: maxLength(16) },
      confirm_password: { required, sameAsPassword: sameAs("password") },
    },
    login: {
      email: { required, email },
      password: { required },
    },
  },
  computed: mapState({
    email:state=> state.email
  }),
  methods: {
    handleReg() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.user.$touch();
      if (this.$v.user.$invalid) {
        return;
      }
      let formData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
      };
      userRegister(formData)
        .then((res) => {
          if (res.data.error == 0) {
            alert(res.data.msg + " Login now!");
            this.$router.push({path: '/'});
          }
          if (res.data.error == 1) {
            alert(res.data.msg);
          }
        })
        .catch((error) => {
          console.log("Something went wrong " + error);
        });
    },

    handleLog() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.login.$touch();
      if (this.$v.login.$invalid) {
        return;
      }
      let formData = {
        email: this.login.email,
        password: this.login.password,
      };
      userLogin(formData)
        .then((res) => {
          if (res.data.error == 0) {
            // console.log(jwt_decode(res.data.token));
            saveToken(res.data.token);
            // console.log(res.data.email)
            store.dispatch({
              type:type.UserLogin,
              mail: res.data.email
            })
            localStorage.setItem('email', res.data.email)
            alert(res.data.message);
            this.$router.push({path: '/'});
          }
          if (res.data.err == 1) {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log("Something went wrong " + error);
        });
    },
  },
};
</script>

<style>
.formError {
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>

