<template>
  <!-- <v-row justify="center"> -->
    <v-dialog
      :value="dialog" 
      width="90%"
      persistent
    >
      <v-card
        dark
      >
        <v-card-title class="headline">Report</v-card-title>
        <v-textarea
          style="font-size: 15px;"
          class="mx-4 mt-0"
          type="text"
          row-height="16"
          rows="2"
          auto-grow
        >
        </v-textarea>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="closeOpenDialogCallback">Send</v-btn>
          <v-btn color="red" @click="closeOpenDialogCallback">Nop</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-row> -->
</template>

<script lang="ts">
import {Vue, Prop, Component} from "vue-property-decorator"

@Component
export default class ReportDialogComponent extends Vue {
  @Prop() closeOpenDialogCallback!: any;
  @Prop() dialog!: boolean;
}
</script>