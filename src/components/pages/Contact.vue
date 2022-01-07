<template>
  <div>
    <div id="contact-page" class="container">
      <div class="bg">
        <div class="row">
          <div class="col-sm-12">
            <h2 class="title text-center">Contact <strong>Us</strong></h2>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-8">
            <div class="contact-form">
              <h2 class="title text-center">Get In Touch</h2>
              <div
                class="status alert alert-success"
                style="display: none"
              ></div>
              <form
                id="main-contact-form"
                class="contact-form row"
                name="contact-form"
                @submit.prevent="handleContact"
              >
                <div class="form-group col-md-6">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    v-model="name"
                    placeholder="Name"
                    :class="{ 'is-invalid': submitted && $v.name.$error }"
                  />
                  <div
                    v-if="submitted && $v.name.$error"
                    class="invalid-feedback formError"
                  >
                    <span v-if="!$v.name.required">Name required</span>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    v-model="email"
                    placeholder="Email"
                    :class="{ 'is-invalid': submitted && $v.email.$error }"
                  />
                  <div
                    v-if="submitted && $v.email.$error"
                    class="invalid-feedback formError"
                  >
                    <span v-if="!$v.email.required">Email required</span>
                    <span v-if="!$v.email.email">Email format invalid</span>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <input
                    type="text"
                    name="subject"
                    class="form-control"
                    v-model="subject"
                    placeholder="Subject"
                    :class="{ 'is-invalid': submitted && $v.subject.$error }"
                  />
                  <div
                    v-if="submitted && $v.subject.$error"
                    class="invalid-feedback formError"
                  >
                    <span v-if="!$v.subject.required">Subject required</span>
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <textarea
                    name="message"
                    id="message"
                    v-model="message"
                    class="form-control"
                    rows="8"
                    placeholder="Your Message Here"
                    :class="{
                      'is-invalid': submitted && $v.message.$error,
                    }"
                  ></textarea>
                  <div
                    v-if="submitted && $v.message.$error"
                    class="invalid-feedback formError"
                  >
                    <span v-if="!$v.message.required">Message required</span>
                    <span v-if="!$v.message.minLength"
                      >Password must be at least 5 characters</span
                    >
                    <span v-if="!$v.message.maxLength"
                      >Password must be at least 250 characters</span
                    >
                  </div>
                </div>
                <div class="form-group col-md-12">
                  <input
                    type="submit"
                    name="submit"
                    class="btn btn-primary pull-right"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="contact-info">
              <h2 class="title text-center">Contact Info</h2>
              <address>
                <p>E-Shopper Inc.</p>
                <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
                <p>Newyork USA</p>
                <p>Mobile: +2346 17 38 93</p>
                <p>Fax: 1-714-252-0026</p>
                <p>Email: info@e-shopper.com</p>
              </address>
              <div class="social-networks">
                <h2 class="title text-center">Social Networking</h2>
                <ul>
                  <li>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-google-plus"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-youtube"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/#contact-page-->
  </div>
</template>

<script>
import { contact } from "@/common/service";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  name: "Contact",
  data() {
    return {
      name: null,
      email: null,
      subject: null,
      message: null,
      submitted: false,
    };
  },
  validations: {
    name: { required },
    subject: { required },
    email: { required, email },
    message: { required, minLength: minLength(5), maxLength: maxLength(250) },
  },
  methods: {
    handleContact() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let formData = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
      };
      contact(formData)
        .then((res) => {
          if (res.data.error == 0) {
            alert(res.data.msg)
            
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
</style>