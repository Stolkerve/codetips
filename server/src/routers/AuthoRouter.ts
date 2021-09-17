import { Router, Request, Response } from "express";
import { MySqlConnection } from "../database";
import { generateToken } from "../tools/tokenTools";
import Encrypt from "../Encrypt";
import User from "../models/User";

const router: Router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isAdmin: 0
    };

    newUser.password = await Encrypt.hash(newUser.password);
    
    await MySqlConnection.Query("INSERT INTO users SET ?", [newUser]);

    return res.json({ auth: true });

  } catch (error: any) {
    console.log(error);
    return res.status(500).send("Username or email already exists!");
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user: User = req.body;
    const existingUsers:any = await MySqlConnection.Query("SELECT * FROM users WHERE email = ?", [user.email]);
    if(!existingUsers[0]) {
      return res.status(404).send("The email does not exists!")
    }
    if(await Encrypt.compare(user.password, existingUsers[0].password)) {
      return res.json({
        token: generateToken({
          id: existingUsers[0].id,
          username: existingUsers[0].username,
          email: existingUsers[0].email,
          isAdmin: existingUsers[0].isAdmin
        }),
        user: {
          username: existingUsers[0].username,
          email: existingUsers[0].email,
        }
      });
    }

    return res.sendStatus(403);
  } catch(error: any) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  return res.json({auth: false, token: null});
});

export default router;