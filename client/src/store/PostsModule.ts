import store from "@/store/store";
import Post from "@/models/Post"
import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({dynamic: true, store, name: "PostsModule}"})
export default class PostsModule extends VuexModule {
  posts: Array<Post> = new Array<Post>();

  @Mutation
  setPosts(newPosts: Array<Post>) {
    this.posts = newPosts;
  }

  @Mutation
  public deletePosts(id: number) {
    var index: number = this.posts.findIndex(p => p.id === id);
    this.posts.splice(index, 1)
  }

  @Mutation
  public addPosts(newPosts: Post) {
    this.posts.push(newPosts);
  }
}

