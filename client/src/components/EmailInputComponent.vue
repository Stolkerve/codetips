<template>
  <div>
    <v-text-field
      class="ma-0 pt-0"
      v-bind:value="value"
      :rules="emailRules"
      :disabled="loading || showSucces"
      maxlength="255"
      @input="$emit('input', $event)"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"

import { emailRules } from "@/utils/validateRules";

@Component
export default class EmailInputComponent extends Vue {
  @Prop() loading:boolean = false;
  @Prop() showSucces:boolean = false;

  value: string = "";

  emailRules = emailRules;

  created() {
    window.addEventListener('keyup', (event) => {
      if (event.keyCode == 13) { // on enter
        this.$emit('enterpressed');
      }
    })
  }
}

</script>