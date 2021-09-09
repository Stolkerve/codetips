import { Router, Request, Response } from "express";
import { MySqlConnection } from "../database";
import { authoMiddleware } from "../middlewares/tokenTools";
// import Post from "../models/Post";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts:any = await MySqlConnection.Query("SELECT posts.*, users.username FROM posts INNER JOIN users ON users.id = posts.userId ORDER BY id DESC");
    if(await posts.length) {
      for(let i = 0; i < posts.length; i++) {
        posts[i].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ?", [posts[i].id]);
      }
      return res.json(posts);
    }
    return res.sendStatus(404); // empty table
  } catch(error: any) {
    console.error(error);
    return res.sendStatus(500); // mysql error
  }
});

router.get("/post/:id", async (req: Request, res: Response) => {
  try {
    const post:any = await MySqlConnection.Query("SELECT posts.*, users.username FROM posts INNER JOIN users ON users.id = posts.userId WHERE posts.id = ?", [req.params.id]);
    if(await post.length) {
      post[0].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ? ORDER BY id DESC", [post[0].id]);
      return res.json(post[0]);
    }
    return res.sendStatus(404);
  } catch(error: any) {
    console.error(error);
    return res.sendStatus(500); // mysql error
  }
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const posts:any = await MySqlConnection.Query("SELECT posts.*, users.username FROM posts INNER JOIN users ON users.id = posts.userId WHERE users.id = ? ORDER BY id DESC", [req.params.id]);
    if(posts.length) {
      for(let i = 0; i < posts.length; i++) {
        posts[i].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ?", [posts[i].id]);
      }
      return res.json(posts);
    }
    return res.sendStatus(404);
  } catch(error: any) {
    console.error(error);
    return res.sendStatus(500); // mysql error
  }
});

router.post("/", authoMiddleware, async (req: Request, res: Response) => {
  try {
    const newPost = {
      userId: res.locals.user.id,
      title: req.body.title,
      code: req.body.code,
      languaje: req.body.languaje,
      created: req.body.created,
      likes: req.body.likes
    }

    await MySqlConnection.Query("INSERT INTO posts SET ?", [newPost]);
    const lastPosts:any = await MySqlConnection.Query("SELECT posts.*, users.username FROM posts INNER JOIN users ON users.id = posts.userId WHERE posts.id = (SELECT MAX(id) FROM posts WHERE userId = ?)", [newPost.userId]);
    lastPosts[0].comments = [];
    return res.json(lastPosts[0]); // ok
  } catch(error: any) { 
    return res.sendStatus(500); // mysql error
  }
});



export default router;