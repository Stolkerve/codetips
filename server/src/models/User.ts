import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("User")
export default class User {
  @JsonProperty("id", Number)
  id?: number = undefined;
  @JsonProperty("isAdmin", Number)
  isAdmin: number = 0;
  @JsonProperty("username", String)
  username?: string = undefined;
  @JsonProperty("email", String)
  email?: string = undefined;
  @JsonProperty("password", String)
  password?: string = undefined;
}