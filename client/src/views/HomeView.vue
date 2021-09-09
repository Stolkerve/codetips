<template>
  <div>
    <div v-if="loading" class="d-flex justify-center align-center">
      <v-progress-circular indeterminate size="50" width="6"></v-progress-circular>
    </div>
    <v-row v-else v-for="(p, index) in this.postModule.posts" :key="index">
      <v-col>
        <CodeCardComponent :post="p"/>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {getModule} from "vuex-module-decorators"
import PostsServise from "@/services/PostsService"
import CodeCardComponent from "@/components/CodeCardComponent.vue"
import PostsModule from "@/store/PostsModule"
import SeccionModule from "@/store/SeccionModule";

@Component({
  components: {
    CodeCardComponent
  }
})
export default class Home extends Vue {
  postModule: PostsModule = getModule(PostsModule);
  seccionModule: SeccionModule = getModule(SeccionModule);
  loading: boolean = true;

  async mounted() {
    this.postModule.setPosts(await PostsServise.getPosts());
    this.loading = false;
  }
}
</script>