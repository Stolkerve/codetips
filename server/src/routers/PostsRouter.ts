import { Router, Request, Response, NextFunction } from "express";
import { MySqlConnection } from "../database";
import {authoMiddleware} from "../middlewares/authoMiddleware";
import Post from "../models/Post";
import { jsonConvert } from "../tools/jsonConverter";


const router: Router = Router();

router.get("/", async (req: Request , res: Response) => {
  try {
    const posts:any = await MySqlConnection.Query(`
    SELECT posts.*, users.username, COUNT(likes.userId) AS likes
      FROM posts
        LEFT JOIN users ON users.id = posts.userId
        LEFT JOIN likes ON posts.id = likes.postId
        GROUP BY posts.id ORDER BY posts.id DESC`
    );
    if(await posts.length) {
      for(let i = 0; i < posts.length; i++) {
        posts[i].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ?", [posts[i].id]);
      }
      return res.json(jsonConvert.serializeArray(posts, Post));
    }
    return res.status(404).send("There arent posts around here");
  } catch(error: any) {
    console.log(error);
    return res.sendStatus(500); // mysql error
  }
});

router.get("/allauth", authoMiddleware, async (req: Request , res: Response) => {
  try {
    const userId: number = res.locals.user.id;
    const posts:any = await MySqlConnection.Query(`
      SELECT
        posts.*, users.username, COUNT(likes.userId) AS likes,
        (SELECT IF(likes.userId = ? , TRUE, FALSE) FROM likes WHERE likes.userId = ? AND likes.postId = posts.id) AS liked
          FROM posts
          LEFT JOIN users ON users.id = posts.userId
          LEFT JOIN likes ON likes.postId = posts.id
          GROUP BY posts.id ORDER BY posts.id DESC;`,
      [userId, userId]
    );
    if(await posts.length) {
      for(let i = 0; i < posts.length; i++) {
        posts[i].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ?", [posts[i].id]);
      }

      return res.json(jsonConvert.serializeArray(posts, Post));
    }
    return res.status(404).send("There arent posts around here");
  } catch (error:any) {
    console.log(error);
    return res.sendStatus(500); // mysql error
  }
});

// router.get("/post/:id", async (req: Request, res: Response) => {
//   try {
//     const post:any = await MySqlConnection.Query("", [req.params.id]);
//     if(await post.length) {
//       post[0].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ? ORDER BY id DESC", [post[0].id]);
//       return res.json(jsonConvert.serializeObject(post[0], Post));
//     }
//     return res.sendStatus(404);
//   } catch(error: any) {
//     console.log(error);
//     return res.sendStatus(500); // mysql error
//   }
// });

// router.get("/user/:id", async (req: Request, res: Response) => {
//   try {
//     const posts:any = await MySqlConnection.Query("", [req.params.id]);
//     if(posts.length) {
//       for(let i = 0; i < posts.length; i++) {
//         posts[i].comments = await MySqlConnection.Query("SELECT * FROM comments WHERE postId = ?", [posts[i].id]);
//       }
//       return res.json(jsonConvert.serializeArray(posts, Post));
//     }
//     return res.sendStatus(404);
//   } catch(error: any) {
//     console.log(error);
//     return res.sendStatus(500); // mysql error
//   }
// });

router.post("/", authoMiddleware, async (req: Request, res: Response) => {
  try {
    const newPost = {
      userId: res.locals.user.id,
      title: req.body.title,
      code: req.body.code,
      languaje: req.body.languaje,
      created: req.body.created,
    }

    await MySqlConnection.Query("INSERT INTO posts SET ?", [newPost]);
    const lastPosts:any = await MySqlConnection.Query(`
      SELECT posts.*, users.username, COUNT(likes.postId) AS likes
        FROM posts
          LEFT JOIN users ON users.id = posts.userId
          LEFT JOIN likes ON likes.postId = posts.id
            WHERE posts.id = (SELECT MAX(id) FROM posts WHERE userId = ?)`,
      [newPost.userId]
    );
    var postJson = jsonConvert.serialize(lastPosts[0], Post);
    postJson.comments = [];
    return res.json(postJson); // ok
  } catch(error: any) { 
    return res.sendStatus(500); // mysql error
  }
});

async function getLikesOfPost(postId: number): Promise<any> {
  return await MySqlConnection.Query(`
  SELECT COUNT(likes.postId) AS likes FROM posts LEFT JOIN likes ON likes.postId = posts.id WHERE posts.id = ?
  `, [postId])
}

router.post("/like", authoMiddleware, async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.user.id;
    const postId: number = req.body.postId;

    if(userId && postId)
    {
      const dbRes:any = await MySqlConnection.Query(`
        INSERT INTO likes(userId, postId)
          SELECT ?, ? FROM dual
          WHERE NOT EXISTS (SELECT * FROM likes WHERE userId = ? AND postId = ?);`,
        [userId, postId, userId, postId]
      );

      if(dbRes.affectedRows) {
        const likes:any = await getLikesOfPost(postId);
        return res.json(likes[0]);
      }
      else return res.status(400).send("You already like it");
    }

    return res.sendStatus(400).send("token or postId missing");
  } catch (error:any) {
    console.log(error);
  }
});

router.delete("/like/:postId", authoMiddleware, async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.user.id;
    const postId = req.params.postId;
    if(userId && postId)
    {
      await MySqlConnection.Query("DELETE FROM likes WHERE (userId = ? AND postId = ?)", [userId, postId]);
      const likes:any = await getLikesOfPost(Number(postId));
      return res.json(likes[0]);
    }

    return res.sendStatus(400).send("token or postId missing");
  } catch (error:any) {
    console.log(error);
  }
});

router.post("/bookmark", authoMiddleware, async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.user.id;
    const postId: number = req.body.postId;

    if(userId && postId)
    {
      const dbRes:any = await MySqlConnection.Query(`
        INSERT INTO bookmarks(userId, postId)
          SELECT ?, ? FROM dual
          WHERE NOT EXISTS (SELECT * FROM bookmarks WHERE userId = ? AND postId = ?);`,
        [userId, postId, userId, postId]
      );

      if(dbRes.affectedRows) {
        return res.sendStatus(200);
      }
      else return res.status(400).send("You already like it");
    }

    return res.sendStatus(400).send("token or postId missing");
  } catch (error:any) {
    console.log(error);
  }
});


router.delete("/bookmark/:postId", authoMiddleware, async (req: Request, res: Response) => {
  try {
    const userId: number = res.locals.user.id;
    const postId = req.params.postId;
    if(userId && postId)
    {
      await MySqlConnection.Query("DELETE FROM bookmarks WHERE (userId = ? AND postId = ?)", [userId, postId]);
      return res.sendStatus(200);
    }

    return res.sendStatus(400).send("token or postId missing");
  } catch (error:any) {
    console.log(error);
  }
});


router.post("/comment", authoMiddleware, async (req: Request, res: Response) => {
  try {
    
  } catch (error:any) {
    console.log(error);
  }
});

export default router;