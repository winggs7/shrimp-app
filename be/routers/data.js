const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const moment = require("moment");
const connection = require("../config/dbconnection");

router.post("/", async (req, res) => {
  try {
    let id = uuid.v4();
    let statId = req.body.statId;
    console.log(statId);

    let date = moment().format("YYYY-MM-DD HH:mm:ss");
    let num_stat = req.body.num_stat;

    let sql =
      "INSERT INTO DATASET (ID, statID, history_date, num_stat) VALUES (?,?,?,?)";

    if (id && statId && num_stat) {
      connection.query(sql, [id, statId, date, num_stat], (err, results) => {
        if (err) {
          res.status(400).json("Cannot save a data!");
        } else {
          res.status(200).json(results);
        }
      });
    }
    return;
  } catch (error) {
    console.log("he");
    res.status(500).json(error);
  }
});

module.exports = router;
