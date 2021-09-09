import mysql2, {Connection} from "mysql2/promise"

export class MySqlConnection
{
  private static connection: Connection;
  static async Init() {
    this.connection = await mysql2.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "123",
      dateStrings: true,
    })

    if(!this.connection) {
      process.exit(1);
    }

    await this.Query("CREATE DATABASE IF NOT EXISTS code_tips");

    await this.Query("USE code_tips");

    await this.Query(
      `CREATE TABLE IF NOT EXISTS users
      (
        id      INT AUTO_INCREMENT NOT NULL,
        username VARCHAR(30) NOT NULL,
        email    VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin TINYINT(1) NOT NULL,
        
        PRIMARY KEY (id)
      );
    `);

    await this.Query(`
      CREATE TABLE IF NOT EXISTS posts
      (
        id       INT AUTO_INCREMENT NOT NULL ,
        userId   INT NOT NULL ,
        title    VARCHAR(50) NOT NULL ,
        code     TEXT NOT NULL ,
        languaje VARCHAR(25) NOT NULL ,
        created  DATE NOT NULL ,
        likes    INT NOT NULL ,
        
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);

    await this.Query(`
      CREATE TABLE IF NOT EXISTS comments
      (
        id      INT AUTO_INCREMENT NOT NULL ,
        userId  INT NOT NULL ,
        postId  INT NOT NULL ,
        commentParentId  INT NULL ,
        content  varchar(5000) NOT NULL ,
        created  DATE NOT NULL ,
        likes    INT NOT NULL ,
        
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (postId) REFERENCES posts(id),
        FOREIGN KEY (commentParentId) REFERENCES comments(id)
      );
    `);
  }

  static async Query(query: string, values: any | any[] | { [param: string]: any } = undefined) {
    return (await this.connection.query(query, values))[0];
  }

}