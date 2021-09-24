import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

import store from "@/store/store";
import Session from "@/models/Session";


@Module({dynamic: true, store, name: "SessionModule"})
export default class SessionModule extends VuexModule {
  session: Session = new Session();

  @Mutation
  setSession(newSession: Session) {
    this.session = newSession;
  }

  @Action
  saveSession() {
    try {
      localStorage.setItem(Session.KEY, JSON.stringify(this.session));
    } catch (error: any) {
      console.log("Error on saving session...")
      localStorage.removeItem(Session.KEY)
      this.setSession(new Session())
    }
  }

  @Action
  loadSession() {
    try {
      const session = localStorage.getItem(Session.KEY);
      if(session) {
        this.setSession(JSON.parse(session));
      }
      else {
        this.setSession(new Session());
      }
    } catch (error: any) {
      console.log("Error on loading session...")
      localStorage.removeItem(Session.KEY)
      this.setSession(new Session())
    }
  }

}
