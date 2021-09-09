<template>
  <v-card
    dark
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
          <v-avatar
            class="ml-2"
            color="grey darken-1"
            size="32"
          ></v-avatar>
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
        v-for="(icon, i) in interactIcons" :key="i"
        class="d-flex align-center"
        cols="auto"
      >
        <v-btn
          class="pa-0 mx-1 no-background-hover"
          text
          icon
          :color="(icon.type === 'likes') && liked ? 'red' : ''"
          @click="()=>{ liked = !liked; }"
        >
          <v-icon>{{icon.src}}</v-icon>
        </v-btn>
        <div v-show="icon.type === 'likes'">{{post.likes}}</div>
        <div v-show="icon.type === 'comments'">{{post.comments ? post.comments.length : ''}}</div>
      </v-col>
      <v-col cols="auto">
        <v-chip small>{{post.languaje}}</v-chip>
      </v-col>
      <v-col class="d-flex justify-end">
        <p class="ma-0 font-weight-thin">{{post.created}}</p>
      </v-col>
    </v-row>
    <v-btn
      class="no-background-hover"
      text
      small
    >comments</v-btn>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import hljs from "highlight.js"
import Post from "@/models/Post"

const Highlight = require("vue-highlight-component")

@Component({
  components: {
    Highlight
  }
})
export default class CodeCardComponent extends Vue {
  @Prop() post!: Post;
  liked: boolean = false;
  interactIcons = [
    {src: "mdi-heart", type: "likes"},
    {src: "mdi-comment", type: "comments"},
    {src: "mdi-bookmark"}
  ]
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