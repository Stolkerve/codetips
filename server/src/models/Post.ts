import { JsonObject, JsonProperty } from "json2typescript";
import Comment from "./Comment";
import { BoolConverter } from "./converters/BooleanConverter";

@JsonObject("Post")
export default class Post {
  @JsonProperty("id", Number, true)
  id?: number = undefined;
  @JsonProperty("userId", Number, true)
  userId?: number = undefined;
  @JsonProperty("likes", Number, true)
  likes?: number = undefined;
  @JsonProperty("liked", BoolConverter, true)
  liked?: boolean = undefined;
  @JsonProperty("bookmarked", BoolConverter, true)
  bookmarked?: boolean = undefined;
  @JsonProperty("username", String, true)
  username?: String = undefined;
  @JsonProperty("title", String, true)
  title?: string = undefined;
  @JsonProperty("code", String, true)
  code?: string = undefined;;
  @JsonProperty("languaje", String, true)
  languaje?: string = undefined;;
  @JsonProperty("created", String, true)
  created?: string = undefined;
  @JsonProperty("comments", [Comment], true)
  comments?: Comment[] = undefined;
}