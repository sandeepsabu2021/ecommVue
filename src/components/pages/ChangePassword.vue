<template>
  <div>
    <h2 class="router-title">Change Password</h2>
    <div class="row">
      <div class="col-sm-8">
        <div class="contact-form">
          <div class="status alert alert-success" style="display: none"></div>
          <form
            id="main-pass-form"
            class="pass-form"
            name="pass-form"
            @submit.prevent="handlePassword"
          >
            <div class="form-group row">
              <label for="opass" class="col-sm-2 col-form-label"
                >Current Password:</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  v-model="oldpassword"
                  id="opass"
                  name="opass"
                  placeholder="Current Password"
                  :class="{
                    'is-invalid': submitted && $v.oldpassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.oldpassword.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.oldpassword.required"
                    >Enter current password</span
                  >
                  <span v-if="!$v.oldpassword.minLength">Invalid password</span>
                  <span v-if="!$v.oldpassword.maxLength">Invalid password</span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="pass" class="col-sm-2 col-form-label"
                >New Password:</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="pass"
                  name="pass"
                  v-model="password"
                  placeholder="New Password"
                  :class="{
                    'is-invalid': submitted && $v.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.password.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.password.required">Password is required</span>
                  <span v-if="!$v.password.minLength"
                    >Password must be at least 8 characters</span
                  >
                  <span v-if="!$v.password.maxLength"
                    >Password must be at least 16 characters</span
                  >
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="cpass" class="col-sm-2 col-form-label"
                >Confirm New Password:</label
              >
              <div class="col-sm-10">
                <input
                  type="password"
                  class="form-control"
                  id="cpass"
                  name="cpass"
                  v-model="confirm_password"
                  placeholder="Confirm Password"
                  :class="{
                    'is-invalid': submitted && $v.confirm_password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.confirm_password.$error"
                  class="invalid-feedback formError"
                >
                  <span v-if="!$v.confirm_password.required"
                    >Confirm password is required</span
                  >
                  <span v-else-if="!$v.confirm_password.sameAsPassword"
                    >Passwords must match</span
                  >
                </div>
              </div>
            </div>

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
import { password } from "@/common/service";
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "ChangePassword",
  data() {
    return {
      oldpassword: null,
      password: null,
      confirm_password: null,
      submitted: false,
    };
  },
  validations: {
    oldpassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(16),
    },
    password: { required, minLength: minLength(8), maxLength: maxLength(16) },
    confirm_password: { required, sameAsPassword: sameAs("password") },
  },
  methods: {
    handlePassword() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let formData = {
        email: localStorage.getItem("email"),
        oldpassword: this.oldpassword,
        password: this.password,
      };
      password(formData)
        .then((res) => {
          if (res.data.error == 0) {
            alert(res.data.msg);
            this.$router.push({path: '/profile'});
          }
          if (res.data.error == 2) {
            alert(res.data.msg);
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
};
</script>

<style>
.router-title {
  margin-bottom: 25px;
}
</style>