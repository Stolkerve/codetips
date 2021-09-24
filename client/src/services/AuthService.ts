import axios from "axios";
import { getModule } from "vuex-module-decorators";
import {Vue} from "vue-property-decorator";

import SessionModule from "@/store/SessionModule";
import SnackBarModule from "@/store/SnackBarModule"

import { jsonConvert } from "@/services/tools/jsonConverter";

import User from "@/models/User";
import Session from "@/models/Session";

import LoginView from "@/views/LoginView.vue"
import SignUpView from "@/views/SignUpView.vue"

export default class AuthService {
  private static sessionModule: SessionModule = getModule(SessionModule);
  private static snackBarModule: SnackBarModule = getModule(SnackBarModule);

  static async SignUp(component: SignUpView, username: string, email: string, password: string): Promise<void> {
    try {
      // @ts-ignore
      component.loading = true;
      const res = await axios.post("http://localhost:3000/api/autho/signup", {username, email, password});
      setTimeout(() => {
        this.snackBarModule.makeToast({message:"SignedUp successfully!", color:"success"});
        // @ts-ignore
        component.loading = false;
        // @ts-ignore
        component.reset();
        component.$router.push("/login");
      }, 1000);
    } catch (error: any) {
      setTimeout(() => {
        // @ts-ignore
        component.reset();
        // @ts-ignore
        component.loading = false;
        this.snackBarModule.makeToast({message:"The email or username already exits!", color:"red"});
      }, 1000);
      console.log(error);
    }
  }

  static async Login(component: LoginView, email: string, password: string): Promise<void> {
    try {
      // @ts-ignore
      component.loading = true;
      const res = await axios.post("http://localhost:3000/api/autho/login", {email, password})
      setTimeout(() => {
        this.snackBarModule.makeToast({message:"Logged successfully!", color:"success"});
        // @ts-ignore
        component.loading = false;
        // @ts-ignore
        component.reset();
        // @ts-ignore
        component.showSuccess = true;
        var newSession = new Session();
        newSession.token = res.data.token;
        newSession.user = jsonConvert.deserializeObject(res.data.user, User);
        this.sessionModule.setSession(newSession);
        this.sessionModule.saveSession();
        
        // @ts-ignore
        component.$router.push("/");
      }, 1000);
    } catch (error: any) {
      setTimeout(() => {
        // @ts-ignore
        component.reset();
        // @ts-ignore
        component.loading = false;
        this.snackBarModule.makeToast({message:"The Email or password is wrong!", color:"red"});
      }, 1000);
      console.log(error);
    }
  }

  static async Logout(component: Vue) {
    this.sessionModule.session.token = undefined;
    this.sessionModule.saveSession();
    await component.$router.push("/");
  }
}