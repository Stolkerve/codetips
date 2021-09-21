<template>
  <div>
    <v-text-field
      class="ma-0 pt-0"
      v-bind:value="value"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules"
      :disabled="loading || showSucces"
      maxlength="255"
      @input="$emit('input', $event)"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"

import { passwordRules } from "@/utils/validateRules";

@Component
export default class PasswordInputComponent extends Vue {
  @Prop() loading:boolean = false;
  @Prop() showSucces:boolean = false;

  showPassword:boolean = false;

  value: string = "";

  passwordRules = passwordRules;

  created() {
    window.addEventListener('keyup', (event) => {
      if (event.keyCode == 13) { // on enter
        this.$emit('enterpressed');
      }
    })
  }
}
</script>
