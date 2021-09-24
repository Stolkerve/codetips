import axios from "axios";
import { getModule } from "vuex-module-decorators";

import Post from "@/models/Post"
import { jsonConvert } from "@/services/tools/jsonConverter";
import { toTimeStamp } from "@/utils/timestamp";
import generateHeaderAuth from "@/utils/generateHeaderAuth";
import SessionModule from "@/store/SessionModule";
import PostsModule from "@/store/PostsModule";


export default class PostsService {
  private static sessionModule: SessionModule = getModule(SessionModule);
  static async getPosts(): Promise<Array<Post>> {
    try {

      const res = await axios.get("http://localhost:3000/api/posts/");
      return jsonConvert.deserializeArray(res.data, Post);
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  static async getPostsAuth(): Promise<Array<Post>> {
    try {
      const res = await axios.get("http://localhost:3000/api/posts/allauth",
        { headers: generateHeaderAuth(this.sessionModule.session.token!) }
      );

      return jsonConvert.deserializeArray(res.data, Post);
    } catch(error: any) {
      console.log(error);
      return [];
    }
  }

  static async createPost(title: string, code: string, languaje: string) {
    try {
        const res = await axios.post("http://localhost:3000/api/posts/",
        {
          title,
          code,
          languaje,
          created: toTimeStamp(new Date()),
          likes: 0
        },
        {
          headers: generateHeaderAuth(this.sessionModule.session.token!)
        }
      );
      const postsModule: PostsModule = getModule(PostsModule);
      postsModule.posts.unshift(res.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  static async like(postId: number) {
    try {
      const res = await axios.post("http://localhost:3000/api/posts/like", {postId}, {headers: generateHeaderAuth(this.sessionModule.session.token!)});
      return res.data;
    } catch (error: any) {
      console.log(error);
    }
  }

  static async disLike(postId: number) {
    try {
      const res = await axios.delete(`http://localhost:3000/api/posts/like/${postId}`, {headers: generateHeaderAuth(this.sessionModule.session.token!)});
      return res.data;
    } catch (error: any) {
      console.log(error);
    }
  }

  static async bookmark(postId: number) {
    try {
      await axios.post("http://localhost:3000/api/posts/bookmark", {postId}, {headers: generateHeaderAuth(this.sessionModule.session.token!)});
    } catch (error: any) {
      console.log(error);
    }
  }

  static async disBookmark(postId: number) {
      try {
        await axios.delete(`http://localhost:3000/api/posts/bookmark/${postId}`, {headers: generateHeaderAuth(this.sessionModule.session.token!)});
      } catch (error: any) {
        console.log(error);
      }
    }
    
    static async deletePost(postId: number) {
      try {
        await axios.delete(`http://localhost:3000/api/posts/${postId}`, {headers: generateHeaderAuth(this.sessionModule.session.token!)});
      } catch (error: any) {
        console.log(error);
      }
    }
  }