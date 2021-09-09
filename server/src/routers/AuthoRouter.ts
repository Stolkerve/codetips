import { Router, Request, Response } from "express";
import { MySqlConnection } from "../database";
import { generateToken } from "../middlewares/tokenTools";
import Encrypt from "../Encrypt";
import User from "../models/User";

const router: Router = Router();
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhYmxvIiwiaWF0IjoxNjMxMTIyMzQ3LCJleHAiOjE2MzEyMDg3NDd9.OC1sQIsRvDq_orQLaTHBo4a148t82qd0CdBh2l-YnC0"
//Pablo / 123456789
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const newUser:User = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    const existingUsers:any = await MySqlConnection.Query("SELECT username, email FROM users WHERE username = ? OR email = ?", [newUser.username, newUser.email]);

    var existUser: boolean = false;
    var existEmail: boolean = false;

    if(existingUsers[0]) {
      existUser = existingUsers[0].username === newUser.username;
      existEmail = existingUsers[0].email === newUser.email;
    }

    if(!existUser && !existEmail)
    {
      newUser.password = await Encrypt.hash(newUser.password);
      
      MySqlConnection.Query("INSERT INTO users SET ?", [newUser]);
      //const token = generateToken({username: newUser.username});
      return res.json({ auth: true });
    }

    return res.status(500).send("Username or email already exists!");
  } catch (error: any) {
    console.error(error);
    return res.status(500).send("server error");
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
        })
      });
    }

    return res.sendStatus(403);
  } catch(error: any) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  return res.json({auth: false, token: null});
});

export default router;