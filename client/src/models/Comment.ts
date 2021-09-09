import { JsonObject, JsonProperty } from "json2typescript";
import {DateConverter} from "@/models/converters/DateConverter"
@JsonObject("Comment")
export default class Comment {
  @JsonProperty("id")
  id?: number = undefined;
  @JsonProperty("content", String, true)
  content?: string = undefined;
  @JsonProperty("likes", Number, true)
  likes: number = 0;
  @JsonProperty("comments", Number, true)
  comments: number = 0;
  @JsonProperty("created", DateConverter, true)
  created?: string = undefined;
}