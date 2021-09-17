import axios from "axios";
import { getModule } from "vuex-module-decorators";
import {Vue} from "vue-property-decorator";

import SessionModule from "@/store/SessionModule";
import { jsonConvert } from "@/services/tools/jsonConverter";
import User from "@/models/User";
import Session from "@/models/Session";

import LoginView from "@/views/LoginView.vue"

export default class AuthService {
  private static sessionModule: SessionModule = getModule(SessionModule);
  static async SignUp(username: string, email: string, password: string): Promise<boolean> {
    try {
      const res = await axios.post("http://localhost:3000/api/autho/signup", {username, email, password});
      return true;
    } catch (error: any) {
      console.log(error);
    }
    return false;
  }

  static async Login(component: LoginView, email: string, password: string): Promise<boolean | undefined> {
    try {
      const res = await axios.post("http://localhost:3000/api/autho/login", {email, password})
      setTimeout(() => {
        // @ts-ignore
        component.loading = false;
        // @ts-ignore
        component.reset();
        // @ts-ignore
        component.showSucces = true;
        setTimeout(async ()=>{
          // @ts-ignore
          component.showSucces = false;

          var newSession = new Session();
          newSession.token = res.data.token;
          newSession.user = jsonConvert.deserializeObject(res.data.user, User);
          this.sessionModule.setSession(newSession);
          this.sessionModule.saveSession();

          await component.$router.push("/");
        }, 2000)
      }, 1500);
    } catch (error: any) {
      // @ts-ignore
      component.showError = true;
      // @ts-ignore
      component.reset();
      // @ts-ignore
      component.loading = false;
      
      console.log(error);
    }
    return false;
  }

  static async Logout(component: Vue) {
    this.sessionModule.session.token = undefined;
    this.sessionModule.saveSession();
    await component.$router.push("/");
  }
}