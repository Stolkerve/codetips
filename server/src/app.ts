import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";

import { MySqlConnection } from "./database";
import PostsRouter from "./routers/PostsRouter";
import AuthoRouter from "./routers/AuthoRouter";

export default class App
{
  private server: Application;

  constructor() {
    MySqlConnection.Init();

    this.server = express();

    this.middlewares();
    this.routers();
  }

  middlewares(): void {
    this.server.use(morgan("dev"));
    this.server.use(express.json());
    this.server.use(cors());
  }

  routers(): void {
    this.server.use("/api/posts/", PostsRouter);
    this.server.use("/api/autho/", AuthoRouter);
  }

  run(port: any): void {
    this.server.listen(port, () => {
      console.info(`El servidor esta corriendo en el puerto ${port}`)
    });
  }
}