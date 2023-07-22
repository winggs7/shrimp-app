const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/dbconnection");

//Log in
router.post('/', async (req, res) => {
    try {
        let mail = req.body.mail;
        let username = mail.split("@")[0];
        let password = req.body.password;

        let sql = "SELECT * FROM USER WHERE USER.name = ?;"

        sql && connection.query(sql, username, (err, results) => {
            if (err) res.status(401).json(err);
            if (results[0] && bcrypt.compareSync(password, results[0].password)) {
                const accessToken = jwt.sign({
                    user: username
                }, process.env.ACCESS_TOKEN_SECRET);

                // const refreshToken = jwt.sign({
                //     user: username
                // }, process.env.REFRESH_TOKEN_SECRET);

                // sql = "UPDATE USER AS U SET U.refreshToken = ? WHERE U.name = ?;";

                // sql && connection.query(sql, [refreshToken, username], (err, results) => {
                //     if (err) res.status(401).json(err);
                // });

                const {
                    password,
                    ...info
                } = results[0];

                res.status(200).json({
                    ...info,
                    // refreshToken,
                    accessToken
                });
            } else {
                res.status(401).json("Wrong password or username");
            }
        });

    } catch (error) {
        res.status(500).json(error);
    }
})

//Sign up
router.post('/signup', async (req, res) => {
    try {
        let mail = req.body.mail;
        let name = mail.split("@")[0];
        let password = req.body.password;

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        let sql = "INSERT INTO USER (name, password) VALUES (?,?);"

        sql && name && password && connection.query(sql, [name, hash], (err, results) => {
            if (err) res.status(401).json(err);
            res.status(200).json(results);
        });

    } catch (error) {
        res.status(500).json(error);
    }
})

//Log out
// router.post('/logout', async (req, res) => {
//     const username = req.body.username;

//     let sql = "UPDATE USER AS U SET U.refreshToken = null WHERE U.name = ? AND U.refreshToken = ?;";

//     sql && refreshToken && connection.query(sql, [username, refreshToken], (err, results) => {
//         if (err) res.status(401).json(err);
//         res.status(200).json(results);
//     })
// })

//Refresh token
// router.post("/refreshToken", (req, res, next) => {
//     const refreshToken = req.body.token;
//     const username = req.body.username;

//     !refreshToken && res.sendStatus(401);

//     let sql = "SELECT refreshToken FROM USER WHERE USER.name = ?;";
//     sql && connection.query(sql, username, (err, results) => {
//         if (err) return res.status(401).json(err);
//         if (results[0].refreshToken !== refreshToken) {
//             return res.sendStatus(403);
//         } else {
//             jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
//                 if (err) return res.sendStatus(403);
//                 const accessToken = jwt.sign({
//                     user: username
//                 }, process.env.ACCESS_TOKEN_SECRET, {
//                     expiresIn: "30s"
//                 });

//                 res.json({
//                     accessToken
//                 })
//             });
//         }
//     });
// })

module.exports = router;