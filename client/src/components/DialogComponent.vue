<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card
        dark
      >
        <v-card-title class="headline">{{dialogModule.title}}</v-card-title>
        <v-card-text>{{dialogModule.body}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="acceptClick()">Accept</v-btn>
          <v-btn color="red" @click="dialog = false">Nop</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
import { getModule } from "vuex-module-decorators";

import DialogModule from "@/store/DialogModule"

@Component
export default class DialogComponent extends Vue {
  dialogModule: DialogModule = getModule(DialogModule);
  get dialog() {
    return this.dialogModule.enabled;
  }
  set dialog(enabled: boolean) {
    this.dialogModule.setDialogEnabled(enabled);
  }
  acceptClick() {
    this.dialogModule.setDialogEnabled(false);
    this.dialogModule.callback();
  }
}
</script>