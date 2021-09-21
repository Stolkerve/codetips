<template>
  <v-menu
    bottom
    min-width="100px"
    offset-y
    tile
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        class="no-background-hover"
        icon
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-0">
      <v-list class="pa-0">
        <v-list-item-group>
          <v-list-item 
            v-if="!isMyPost"
            dense
          >
            <v-list-item-icon class="mx-0 mr-2">
              <v-icon dense>mdi-flag</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="ma-0">Report</p>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-else
          >
            <v-list-item-icon class="mx-0 mr-2">
              <v-icon dense>mdi-window-close</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="ma-0">Delete</p>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"

@Component
export default class PostOptionsComponent extends Vue {
  @Prop() isMyPost!:boolean;
}
</script>