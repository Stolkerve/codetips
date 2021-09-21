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
          <v-list>
            <div class="d-flex justify-center">
              <h4 class="mb-2 pa-0">{{this.sessionModule.session.user.username}}</h4>
            </div>
            <v-divider></v-divider>
            <v-list-item-group>
              <v-list-item
                dense
              >
                <v-list-item-icon class="mx-0 mr-2">
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <p class="ma-0">account</p>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                dense
                @click="logoutHandle"
              >
                <v-list-item-icon class="mx-0 mr-2">
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <p class="ma-0">disconnect</p>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"
import { getModule } from "vuex-module-decorators";

import AvatarComponent from "@/components/AvatarComponent.vue";
import AuthService from "@/services/AuthService";
import SessionModule from "@/store/SessionModule";
@Component({
  components: {
    AvatarComponent
  }
})
export default class AvatarMenuComponent extends Vue {
  sessionModule: SessionModule = getModule(SessionModule);
  logoutHandle() {
    AuthService.Logout(this);
    
  }
}
</script>