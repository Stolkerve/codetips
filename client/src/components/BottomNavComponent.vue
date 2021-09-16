<template>
  <v-app-bar
    v-if="this.$vuetify.breakpoint.smAndDown"
    style="bottom: 0; position: fixed"
    dense
    dark
  >
    <v-row no-gutters align="center">
      <v-col :class="isLogging ? '' : 'd-flex justify-center'" order="1">
        <v-btn icon tile to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-col>
      <template v-if="isLogging">
        <v-col>
          <AvatarMenuComponent/>
        </v-col>
        <v-col order="2">
          <v-btn icon tile @click="closeOpenDialogCallback">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col order="3">
          <v-btn icon tile to="/notifi">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AvatarMenuComponent from "@/components/AvatarMenuComponent.vue"

@Component({
  components: {
    AvatarMenuComponent
  }
})
export default class BottomNavComponent extends Vue {
  @Prop() closeOpenDialogCallback!: any;
  @Prop() isLogging!: boolean;
}
</script>