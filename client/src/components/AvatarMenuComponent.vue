<template>
  <v-container
    fluid
  >
    <v-row justify="center">
      <v-menu
        bottom
        min-width="100px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            x-small
            :ripple="false"
          >
            <AvatarComponent/>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center pb-0">
            <div class="mx-auto text-center">
              <h4>{{ 'user.fullName' }}</h4>
              <p class="text-caption my-1">
                {{ 'user.email' }}
              </p>
              <v-divider></v-divider>
              <v-btn
                class="no-background-hover"
                depressed
                text
                small
              >
                Account
              </v-btn>
              <v-divider></v-divider>
              <v-btn
                class="no-background-hover"
                depressed
                text
                small
                @click="logoutHandle"
              >
                Disconnect
              </v-btn>
              <v-divider></v-divider>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
import AvatarComponent from "@/components/AvatarComponent.vue"
import AuthService from "@/services/AuthService"
@Component({
  components: {
    AvatarComponent
  }
})
export default class AvatarMenuComponent extends Vue {
  logoutHandle() {
    AuthService.Logout(this);
  }
}
</script>