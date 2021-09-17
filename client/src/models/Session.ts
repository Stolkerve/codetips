import User from "@/models/User";

export default class Session {
  static readonly KEY = "Session"
  token?: string = undefined;
  user?: User = undefined;
}