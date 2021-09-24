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
              
            />
            
            <v-card-subtitle class="pa-0">Password</v-card-subtitle>
            <PasswordInputComponent
              v-model="password"
              :loading="loading"
              :showSucces="showSucces"
              
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
  loading: boolean = false;
  showSucces: boolean = false;

  async onSubmit() {
    if(this.validate()) {
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