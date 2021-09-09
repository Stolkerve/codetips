import store from "@/store/store";
import Seccion from "@/models/Seccion";

import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({dynamic: true, store, name: "SeccionModule}"})
export default class SeccionModule extends VuexModule {
  seccion: Seccion = new Seccion();

  @Mutation
  setSeccion(newSeccion: Seccion) {
    this.seccion = newSeccion;
  }

}
