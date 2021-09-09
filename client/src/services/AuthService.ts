import axios from "axios";
import { jsonConvert } from "@/services/tools/jsonConverter";
import User from "@/models/User";
import { getModule } from "vuex-module-decorators";
import SeccionModule from "@/store/SeccionModule";
import Seccion from "@/models/Seccion";

export default class AuthService {
  static async SignUp(username: string, email: string, password: string): Promise<boolean> {
    try {
      const res = await axios.post("http://localhost:3000/api/autho/signup", {username, email, password});
      return true;
    } catch (error: any) {
      console.error(error);
    }
    return false;
  }

  static async Login(email: string, password: string): Promise<string | undefined> {
    try {
      const res = await axios.post("http://localhost:3000/api/autho/login", {email, password})
      return res.data.token;
    } catch (error: any) {
      console.error(error);
    }
    return undefined;
  }
}