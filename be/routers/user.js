const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/dbconnection");
const { PythonShell } = require("python-shell");

//Log in
router.post("/", async (req, res) => {
  try {
    let mail = req.body.email;
    let username = mail.split("@")[0];
    let password = req.body.password;

    let sql = "SELECT * FROM USER WHERE USER.name = ?;";

    sql &&
      connection.query(sql, username, (err, results) => {
        if (err) res.status(401).json(err);
        console.log(results);
        if (results[0] && bcrypt.compareSync(password, results[0].password)) {
          const accessToken = jwt.sign(
            {
              user: username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "15s",
            }
          );

          const refreshToken = jwt.sign(
            {
              user: username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: process.env.TIME_REFRESH_TOKEN,
            }
          );

          sql =
            "UPDATE USER AS U SET U.accessToken = ?, U.refreshToken = ? WHERE U.name = ?;";

          sql &&
            connection.query(
              sql,
              [accessToken, refreshToken, username],
              (err, results) => {
                if (err) res.status(401).json(err);
              }
            );

          const { password, ...info } = results[0];

          res.status(200).json({
            ...info,
            refresh_token: refreshToken,
            access_token: accessToken,
          });
        } else {
          res.status(401).json("Wrong password or username");
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Sign up
router.post("/register", async (req, res) => {
  try {
    let mail = req.body.email;
    let name = mail.split("@")[0];
    let password = req.body.password;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let sql = "INSERT INTO USER (name, password) VALUES (?,?);";

    sql &&
      name &&
      password &&
      connection.query(sql, [name, hash], (err, results) => {
        if (err) res.status(401).json(err);
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Refresh token
router.post("/refreshToken", (req, res, next) => {
  const accessToken = req.header("authorization").split(" ")[1];
  const refreshToken = req.body.refreshToken;
  const username = req.body.username;

  console.log(accessToken);

  !refreshToken && res.sendStatus(401);

  let sql = "SELECT refreshToken FROM USER WHERE USER.name = ?;";
  sql &&
    connection.query(sql, [username], (err, results) => {
      if (err) return res.status(401).json(err);
      if (results[0].refreshToken !== refreshToken) {
        return res.sendStatus(403);
      } else {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, data) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
              {
                user: username,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: process.env.TIME_ACCESS_TOKEN,
              }
            );

            sql = "UPDATE USER AS U SET U.accessToken = ? WHERE U.name = ?;";

            sql &&
              connection.query(sql, [accessToken, username], (err, results) => {
                if (err) res.status(401).json(err);
              });

            res.json({
              accessToken,
            });
          }
        );
      }
    });
});

const spawn = require("child_process").spawn;

router.get("/name", (req, res) => {
  var process = spawn("python", [
    `${__dirname}/test-server.py`,
    req.query.firstname,
    req.query.lastname,
  ]);
  let output = "";
  process.stdout.setEncoding("utf-8");
  process.stdout.on("data", function (data) {
    output += data.toString();
  });
  process.stderr.on("data", function (data) {
    output += data.toString();
  });
  process.stdout.on("end", () => {
    res.status(200).json(output);
  });
});

module.exports = router;
