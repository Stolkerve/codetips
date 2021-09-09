import axios from "axios";
import Post from "@/models/Post"
import { jsonConvert } from "@/services/tools/jsonConverter";
import SeccionModule from "@/store/SeccionModule";
import { getModule } from "vuex-module-decorators";
import { toTimeStamp } from "@/utils/timestamp";
import PostsModule from "@/store/PostsModule";

export default class PostsService {
  static async getPosts(): Promise<Array<Post>> {
    try {

      const res = await axios.get("http://localhost:3000/api/posts/");
      const a = jsonConvert.deserializeArray(res.data, Post);
      return a;
    } catch(error: any) {
      console.error(error);
      return [];
    }
  }

  static async createPost(title: string, code: string, languaje: string) {
    try {
      const seccionModule: SeccionModule = getModule(SeccionModule);
      const res = await axios.post("http://localhost:3000/api/posts/", {
        token: seccionModule.seccion.token,
        title,
        code,
        languaje,
        created: toTimeStamp(new Date()),
        likes: 0
      });
      const postsModule: PostsModule = getModule(PostsModule);
      postsModule.posts.unshift(res.data);
    } catch (error: any) {
      console.error(error);
    }
  }
}