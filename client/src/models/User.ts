import {JsonObject, JsonProperty} from "json2typescript"

@JsonObject("User")
export default class User {
  @JsonProperty("id", Number, true)
  id?: number = undefined;
  @JsonProperty("email", String, true)
  email?: string = undefined;
  @JsonProperty("username", String, true)
  username?: string = undefined;
  @JsonProperty("password", String, true)
  password?: string = undefined;
  // @JsonProperty("role", Number, true)
  // role?: number = undefined;
}