import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "@/models/converters/DateConverter";
import { BoolConverter } from "@/models/converters/BooleanConverter";

import Comment from "@/models/Comment";

@JsonObject("Post")
export default class Post {
  @JsonProperty("id", Number, true)
  id?: number = undefined;
  @JsonProperty("userId", Number, true)
  userId?: number = undefined;
  @JsonProperty("likes", Number, true)
  likes: number = 0;
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