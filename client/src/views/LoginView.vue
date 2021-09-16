<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-card
        dark
        width="500px"
      >
        <v-container>
          <v-card-title class="d-flex justify-center">Login</v-card-title>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
          >
            <v-card-subtitle class="pa-0">Email</v-card-subtitle>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :disabled="loading || showSucces"
              maxlength="255"
              @keydown.enter="onSubmit()"
            ></v-text-field>
            <v-card-subtitle class="pa-0">Password</v-card-subtitle>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="passwordRules"
              :disabled="loading || showSucces"
              maxlength="255"
              @click:append="showPassword = !showPassword"
              @keydown.enter="onSubmit()"
            ></v-text-field>

            <v-btn
              :disabled="loading || showSucces"
              color="primary"
              dark
              @click="onSubmit()"
            >
              Submit
            </v-btn>
          </v-form>
        </v-container>
        <div v-show="loading">
          <v-progress-linear indeterminate></v-progress-linear>
        </div>
      </v-card>
      <v-snackbar
        v-model="showError"
        color="red"
        :timeout="5000"
      >
        the Email or password is wrong
      </v-snackbar>
      <v-snackbar
        v-model="showSucces"
        color="green accent-3"
        :timeout="5000"
      >
        Login successfully!
      </v-snackbar>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import Session from "@/models/Session";
import AuthService from "@/services/AuthService";
import SessionModule from "@/store/SessionModule";
import {emailRules, passwordRules} from "@/utils/validateRules"

@Component
export default class LoginView extends Vue {
  sessionModule: SessionModule = getModule(SessionModule);
  email: string = "";
  password: string = "";

  validForm: boolean = true;
  showPassword:boolean = false;
  showError: boolean = false;
  showSucces: boolean = false;
  loading: boolean = false;
  emailRules = emailRules;
  passwordRules = passwordRules;

  async onSubmit() {
    if(this.validate()) {
      this.showError = false;
      this.loading = true;
      const token = await AuthService.Login(this.email, this.password);
      setTimeout(() => {
        this.loading = false;
        if(token) {
          this.reset();
          this.showSucces = true;
          setTimeout(async ()=>{
            this.showSucces = false;
            
            var newSession = new Session();
            newSession.token = token;
            this.sessionModule.setSession(newSession);
            this.sessionModule.saveSession();
            await this.$router.push("/");
          }, 2000)
        }
        this.showError = true;
        this.reset();
      }, 1500);
    }
  }

  validate() {
    return (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  reset() {
    (this.$refs.form as Vue & { reset: () => boolean }).reset();
  }

  resetValidation () {
    (this.$refs.form as Vue & { resetValidation: () => boolean }).resetValidation();
  }
}
</script>