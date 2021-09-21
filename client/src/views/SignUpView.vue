<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-card
        dark
        width="500px"
      >
        <v-container>
          <v-card-title class="d-flex justify-center">Sign Up</v-card-title>
          <v-form
            ref="form"
            v-model="validForm"
            lazy-validation
          >
            <v-card-subtitle class="pa-0">Username</v-card-subtitle>
            <v-text-field
              class="ma-0 pt-0"
              v-model="username"
              :rules="userRules"
              :disabled="loading || showSucces"
              maxlength="30"
              @keydown.enter="onSubmit()"
            ></v-text-field>

            <v-card-subtitle class="pa-0">Email</v-card-subtitle>
            <EmailInputComponent
              v-model="email"
              :loading="loading"
              :showSucces="showSucces"
              @enterpressed="onSubmit()"
            />

            <v-card-subtitle class="pa-0">Password</v-card-subtitle>
            <PasswordInputComponent
              v-model="password"
              :loading="loading"
              :showSucces="showSucces"
              @enterpressed="onSubmit()"
            />

            <v-btn
              class="mt-1"
              color="primary"
              :disabled="loading || showSucces"
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
        The email or username already exits
      </v-snackbar>
      <v-snackbar
        v-model="showSucces"
        color="green accent-3"
        :timeout="5000"
      >
        Signup successfully!
      </v-snackbar>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"

import AuthServise from "@/services/AuthService"
import PasswordInputComponent from "@/components/PasswordInputComponent.vue"
import EmailInputComponent from "@/components/EmailInputComponent.vue"
import { requiredRule } from "@/utils/validateRules"

@Component({
  components: {
    PasswordInputComponent,
    EmailInputComponent
  }
})
export default class SignUpView extends Vue {
  username: string = "";
  email: string = "";
  password: string = "";

  validForm: boolean = true;
  showError: boolean = false;
  showSucces: boolean = false;
  loading: boolean = false;

  userRules = [
    requiredRule("name"),
  ];

  async onSubmit() {
    if(this.validate()) {
      this.showError = false;
      this.loading = true;
      const auth = await AuthServise.SignUp(this.username, this.email, this.password);
      setTimeout(() => { 
        this.loading = false;
        if(auth) {
          this.reset();
          this.showSucces = true;
          setTimeout(async ()=>{
            this.showSucces = false;
            await this.$router.push("/login");
          }, 2000)
        }
        this.showError = true;
        this.reset();
      }, 1000);
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