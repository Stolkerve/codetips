<template>
  <v-container class="py-0 fill-height">
    <v-row no-gutters align="center">

      <!-- Title -->
      <v-col
        :class="
          !this.$vuetify.breakpoint.smAndDown && isLogging ? '' : 'd-flex justify-start'
        "
        :cols="!this.$vuetify.breakpoint.smAndDown ? 'auto' : ''"
        :order="isLogging ? 2 : 1"
      >
        <router-link
          style="
            font-family: 'Libre Baskerville', serif !important;
            text-decoration: none;
            color: white;
            font-size: 25px;
          "
          :to="'/'"
        >
          CodeTips
        </router-link>
      </v-col>

      <!-- Search bar -->
      <v-col
        v-if="!this.$vuetify.breakpoint.smAndDown"
        class="d-flex justify-end"
        order="11"
      >
        <v-responsive max-width="600">
          <v-text-field dense flat hide-details rounded solo-inverted>
          </v-text-field>
        </v-responsive>
      </v-col>

      <!-- Is logged and is not a phone -->
      <template v-if="isLogging && !this.$vuetify.breakpoint.smAndDown">
        <v-col class="mr-4" cols="auto" order="1">
          <AvatarMenuComponent/>
        </v-col>
        <v-col cols="auto" order="3">
          <v-btn
            class="ml-3 no-background-hover"
            v-on:click="closeOpenDialogCallback"
            icon
            dark
            dense
            small
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="auto" order="4">
          <!-- <v-btn
            class="no-background-hover"
            icon
            dark
            ><v-icon>mdi-bell</v-icon>
          </v-btn> -->
          <BellMenuComponent/>
        </v-col>
      </template>

      <!-- Is not logged and is a phone -->
      <template v-if="!isLogging">
        <v-col
          :class="this.$vuetify.breakpoint.smAndDown ? 'd-flex justify-end' : ''"
          order="2"
        >
          <v-btn
            class="ml-2 no-background-hover"
            to="/login"
            small
            text
          >Login</v-btn>
          <v-btn
            class=" no-background-hover"
            to="/signup"
            small
            text
          >SignUp</v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AvatarMenuComponent from "@/components/AvatarMenuComponent.vue"
import BellMenuComponent from "@/components/BellMenuComponent.vue"

@Component({
  components: {
    AvatarMenuComponent,
    BellMenuComponent
  }
})
export default class TopNavComponent extends Vue {
  @Prop() isLogging!: boolean;
  @Prop() closeOpenDialogCallback!: any;
}
</script>