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

import EmailInputComponent from "@/components/EmailInputComponent.vue";
import PasswordInputComponent from "@/components/PasswordInputComponent.vue";
import AuthService from "@/services/AuthService";

@Component({
  components: {
    PasswordInputComponent,
    EmailInputComponent
  }
})
export default class LoginView extends Vue {
  email: string = "";
  password: string = "";

  validForm: boolean = true;
  showPassword:boolean = false;
  showError: boolean = false;
  showSucces: boolean = false;
  loading: boolean = false;

  async onSubmit() {
    if(this.validate()) {
      this.showError = false;
      this.loading = true;
      await AuthService.Login(this, this.email, this.password);
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