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
          <v-btn
            class="ml-4 no-background-hover"
            :ripple="false"
            icon
            small
          >
            <AvatarComponent/>
          </v-btn>
          <v-card-subtitle class="pa-3 font-weight-light">{{post.username}}</v-card-subtitle>
        </v-row>
      </v-col>
      <v-col cols="auto">
        <v-card-title
          style="font-size: 1.20rem;"
          :class="isMyPost() ? 'pa-2 red--text text--lighten-2' : ''"
        >{{post.title}}</v-card-title>
      </v-col>
      <v-col>
        <PostOptionsComponent :postId="post.id" :isMyPost="isMyPost()"/>
      </v-col>
    </v-row>
    <div class="code-conteiner">
      <div class="d-flex mb-5 mt-2">
        <span style="background: #FF605C;" class="dot"></span>
        <span style="background: #FFBD44;" class="dot"></span>
        <span style="background: #00CA4E;" class="dot"></span>
      </div>
      <highlight class="pl-5" :language="post.languaje">{{post.code}}</highlight>
    </div>
    <v-row
      class="mx-2 mt-1"
      no-gutters
      align="center"
    >
      <v-col
        class="d-flex align-center"
        cols="auto"
      >
        <v-btn
          class="pa-0 ml-1 no-background-hover"
          :color="post.liked ? 'red' : ''"
          :disabled="!isLogging() || loadinglike"
          :loading="loadinglike"
          text
          icon
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
        >
          <v-icon>mdi-comment</v-icon>
        </v-btn>
        <div>{{post.comments ? post.comments.length : ''}}</div>
      </v-col>

      <v-col
        v-if="isLogging()"
        class="d-flex align-center"
        cols="auto"
      >
        <v-btn
          class="pa-0 ml-1 no-background-hover"
          :color="post.bookmarked ? 'primary' : ''"
          :disabled="!isLogging() || loadingbookmark"
          :loading="loadingbookmark"
          icon
          @click="handleBookmark"
        >
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-col>

      <v-col class="ml-1" cols="auto">
        <v-chip small>{{post.languaje}}</v-chip>
      </v-col>

      <v-col class="d-flex justify-end">
        <p class="ma-0 font-weight-thin">{{post.created}}</p>
      </v-col>

    </v-row>
    <v-textarea
      v-if="isLogging()"
      style="font-size: 15px;"
      class="mx-4 mt-0"
      label="comment"
      append-outer-icon="mdi-send"
      type="text"
      row-height="16"
      rows="2"
      auto-grow
      @click:append-outer="() => {}"
    >
    </v-textarea>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
const Highlight = require("vue-highlight-component")

import Post from "@/models/Post"

import SessionModule from "@/store/SessionModule";

import PostsService from "@/services/PostsService";

import AvatarComponent from "@/components/AvatarComponent.vue"
import PostOptionsComponent from "@/components/PostOptionsComponent.vue"

@Component({
  components: {
    Highlight,
    AvatarComponent,
    PostOptionsComponent
  }
})
export default class CodeCardComponent extends Vue {
  @Prop() post!: Post;
  sessionModule: SessionModule = getModule(SessionModule);

  loadinglike: boolean = false;
  loadingbookmark: boolean = false;

  isLogging() {
    return this.sessionModule.session.token;
  }
  isMyPost() {
    return this.sessionModule.session.user!.username == this.post.username;
  }

  async handleLike() {
    const xd = () => { setTimeout(()=>{this.post.liked = !this.post.liked; this.loadinglike = !this.loadinglike;}, 500) };
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

  async handleBookmark() {
    const xd = () => { setTimeout(()=>{this.post.bookmarked = !this.post.bookmarked; this.loadingbookmark = !this.loadingbookmark}, 500) };
    this.loadingbookmark = !this.loadingbookmark;
    if(!this.post.bookmarked) {
      await PostsService.bookmark(this.post.id!);
      xd();
    }
    else {
      await PostsService.disBookmark(this.post.id!);
      xd();
    }

  }
}
</script>

<style src="highlight.js/styles/atom-one-dark-reasonable.css"></style>

<style>

.dot {
  margin-right: 10px;
  height: 18px;
  width:  18px;
  border-radius: 50%;
  display: inline-block;
}

.hljs {
  padding: 0px !important;
  display: unset !important;
}

.code-conteiner {
  padding: 1em;
  padding-top: 0px;
  max-height: 400px;
  min-height: 200px;
  overflow-y: scroll;
  background:#282c34;
}

</style>