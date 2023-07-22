const express = require("express");
const router = express.Router();
const connection = require("../config/dbconnection");

//Update a stat
router.put("/", async (req, res) => {
  try {
    let id = req.body.id;
    let statFrom = req.body.statFrom;
    let statTo = req.body.statTo;

    let sql =
      "UPDATE STAT AS S SET S.from_stat = ?, S.to_stat = ? WHERE S.ID = ?;";

    if (statFrom < statTo) {
      connection.query(sql, [statFrom, statTo, id], (err, results) => {
        if (err) res.status(500).json(err);
        res.status(200).json(results);
      });
    } else {
      res.status(200).json("Stat-from must smaller than the Stat-to!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get a stat
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let sql = "SELECT * FROM STAT WHERE STAT.ID = ?;";

    id &&
      connection.query(sql, id, (err, results) => {
        if (err) res.status(500).json(err);
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all stat
router.get("/", async (req, res) => {
  try {
    let sql = "SELECT * FROM STAT;";

    connection.query(sql, (err, results) => {
      if (err) res.status(500).json(err);
      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
