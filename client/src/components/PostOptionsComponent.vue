<template>
  <v-row
    class="d-flex mr-2"
    justify="end"
  >
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
              @click="showDialog = true"
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
              dense
              @click="showDeletePostDialog"
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
    <ReportDialogComponent :dialog="showDialog" :closeOpenDialogCallback="()=>{showDialog = !showDialog}" />
  </v-row>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import { getModule } from "vuex-module-decorators";

import Dialog from "@/models/Dialog";

import DialogModule from "@/store/DialogModule";
import PostsModule from "@/store/PostsModule";

import PostsService from "@/services/PostsService";

import ReportDialogComponent from "@/components/ReportDialogComponent.vue";

@Component({
  components: {
    ReportDialogComponent
  }
})
export default class PostOptionsComponent extends Vue {
  @Prop() postId!:number;
  @Prop() isMyPost!:boolean;

  dialogModule: DialogModule = getModule(DialogModule);
  postModule: PostsModule = getModule(PostsModule);

  showDialog:boolean = false;

  showDeletePostDialog() {
    const newDialog:Dialog = new Dialog("Delete post", "Are you sure? It's action cannot be revert.",
      async ()=> {
        this.postModule.deletePost(this.postId);
        await PostsService.deletePost(this.postId);
      }
    );
    this.dialogModule.showDialog(newDialog);
  }
}
</script>