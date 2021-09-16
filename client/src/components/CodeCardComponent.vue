<template>
  <v-card
    dark
    tile
    elevation="4"
  >
    <v-row
      class="card-title-conteiner"
      align="center"
      no-gutters
    >
      <v-col
        cols="12"
        sm="auto"
      >
        <v-row
          no-gutters
          align="center"
        >
          <AvatarComponent class="ml-2"/>
          <v-card-subtitle>{{post.username}}</v-card-subtitle>
        </v-row>
      </v-col>
      <v-col>
        <v-card-title class="card-title">{{post.title}}</v-card-title>
      </v-col>
    </v-row>
    <div class="code-conteiner">
      <highlight language="cpp">{{post.code}}</highlight>
    </div>
    <v-row
      class="mx-2"
      no-gutters
      align="center"
    >
      <v-col
        class="d-flex align-center"
        cols="auto"
      >
        <v-btn
          class="pa-0 ml-1 no-background-hover"
          text
          icon
          :color="post.liked ? 'red' : ''"
          :disabled="sessionModule.session.token == undefined || loadinglike"
          :loading="loadinglike"
          @click="handleLike"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <div>{{post.likes}}</div>
      </v-col>

      <v-col
        class="d-flex align-center"
        cols="auto"
      >
        <v-btn
          class="pa-0 ml-1 no-background-hover"
          text
          icon
          :disabled="sessionModule.session.token == undefined"
        >
          <v-icon>mdi-comment</v-icon>
        </v-btn>
        <div>{{post.comments ? post.comments.length : ''}}</div>
      </v-col>

      <v-col
        class="d-flex align-center"
        cols="auto"
      >
        <v-btn
          class="pa-0 ml-1 no-background-hover"
          icon
          :disabled="sessionModule.session.token == undefined"
        >
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-chip small>{{post.languaje}}</v-chip>
      </v-col>

      <v-col class="d-flex justify-end">
        <p class="ma-0 font-weight-thin">{{post.created}}</p>
      </v-col>

    </v-row>
    <v-text-field
      class="mx-4"
      label="comment"
      append-outer-icon="mdi-send"
      type="text"
      @click:append-outer="() => {}"
      dense
    >
    </v-text-field>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import hljs from "highlight.js"
import { getModule } from "vuex-module-decorators";
const Highlight = require("vue-highlight-component"
)
import Post from "@/models/Post"
import SessionModule from "@/store/SessionModule";
import AvatarComponent from "@/components/AvatarComponent.vue"
import PostsService from "@/services/PostsService";

@Component({
  components: {
    Highlight,
    AvatarComponent
  }
})
export default class CodeCardComponent extends Vue {
  @Prop() post!: Post;
  sessionModule: SessionModule = getModule(SessionModule);
  loadinglike: boolean = false;

  async handleLike() {
    const xd = () => { setTimeout(()=>{this.post.liked = !this.post.liked; this.loadinglike = !this.loadinglike;}, 200) };
    this.loadinglike = !this.loadinglike;
    if(!this.post.liked) {
      this.post.likes = (await PostsService.like(this.post.id!)).likes;
      xd();
    }
    else {
      this.post.likes = (await PostsService.disLike(this.post.id!)).likes
      xd();
    }

  }
}
</script>

<style src="highlight.js/styles/atom-one-dark-reasonable.css"></style>

<style>

.hljs {
  padding: 0px !important;
  display: unset !important;
}

.code-conteiner {
  padding: 1em;
  padding-top: 0px;
  max-height: 350px;
  min-height: 200px;
  overflow-y: scroll;
  background:#282c34;
}

</style>