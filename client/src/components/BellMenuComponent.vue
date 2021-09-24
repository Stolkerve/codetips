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
        class="ml-3 no-background-hover"
        icon
        dark
        small
        ><v-icon>mdi-bell</v-icon>
      </v-btn>
    </template>
    <v-card>
      Hello!
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"

@Component
export default class BellMenuComponent extends Vue {

}
</script>