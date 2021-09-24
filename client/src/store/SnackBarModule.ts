import store from "@/store/store";
import {Module, Mutation, VuexModule} from "vuex-module-decorators";

interface MesssgeQueue {
  message: string
  color: string
}

@Module({dynamic: true, store, name: "SnackBarModule}"})
export default class SnackBarModule extends VuexModule {
  message: string = "";
  color: string = ""
  timeout: number = 2500;
  enabled: boolean = false;

  messages: MesssgeQueue[] = [];

  @Mutation
  setSnackbarEnabled(value: boolean) {
    this.enabled = value;
  }

  @Mutation
  makeToast(value: MesssgeQueue) {
    if(this.enabled) {
      this.messages.unshift(value);
    }
    else {
      this.message = value.message;
      this.color = value.color;
      this.enabled = true;
    }
  }

  @Mutation
  checkQueueMessages() {
    if (this.messages.length > 0) {
      setTimeout(() => {
          let queueValue = this.messages[this.messages.length - 1];
          this.messages.pop();
          this.message = queueValue.message;
          this.color = queueValue.color;
          this.enabled = true;
      }, 10);
    }
  }
}

