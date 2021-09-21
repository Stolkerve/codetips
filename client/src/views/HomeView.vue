<template>
  <div>
    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular
        size="50"
        width="6"
        color="blue"
        indeterminate
      >
      </v-progress-circular>
    </div>
    <v-row v-else v-for="(p, index) in this.postModule.posts" :key="index">
      <v-col class="px-0">
        <CodeCardComponent :post="p"/>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";

import PostsServise from "@/services/PostsService";
import CodeCardComponent from "@/components/CodeCardComponent.vue";
import PostsModule from "@/store/PostsModule";
import SessionModule from "@/store/SessionModule";

@Component({
  components: {
    CodeCardComponent
  }
})
export default class Home extends Vue {
  postModule: PostsModule = getModule(PostsModule);
  sessionModule: SessionModule = getModule(SessionModule);
  loading: boolean = true;

  async mounted() {
    if(this.sessionModule.session.token) {
      this.postModule.setPosts(await PostsServise.getPostsAuth());
      this.loading = false;
    }
    else {
      this.postModule.setPosts(await PostsServise.getPosts());
      this.loading = false;
    }
  }
}
</script>