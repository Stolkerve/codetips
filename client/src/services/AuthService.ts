import axios from "axios";
import { getModule } from "vuex-module-decorators";

import SessionModule from "@/store/SessionModule";
import Session from "@/models/Session";

export default class AuthService {
  static async SignUp(username: string, email: string, password: string): Promise<boolean> {
    try {
      const res = await axios.post("http://localhost:3000/api/autho/signup", {username, email, password});
      return true;
    } catch (error: any) {
      console.log(error);
    }
    return false;
  }

  static async Login(email: string, password: string): Promise<string | undefined> {
    try {
      const res = await axios.post("http://localhost:3000/api/autho/login", {email, password})
      return res.data.token;
    } catch (error: any) {
      console.log(error);
    }
    return undefined;
  }

  static async Logout(component: Vue) {
    const sessionModule: SessionModule = getModule(SessionModule);
    sessionModule.session.token = undefined;
    sessionModule.saveSession();
    component.$router.replace("/");
  }
}