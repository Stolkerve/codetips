import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Comment")
export default class Comment {
  @JsonProperty("id", Number)
  id?: number = undefined;
  @JsonProperty("userId", Number)
  userId?: number = undefined;
  @JsonProperty("postId", Number)
  postId?: number = undefined;
  @JsonProperty("likes", Number)
  likes?: number = undefined;
  @JsonProperty("commentParentId", Number)
  commentParentId?: number = undefined;
  @JsonProperty("content", String)
  content?: string = undefined;
  @JsonProperty("created", String)
  created?: string = undefined;
}