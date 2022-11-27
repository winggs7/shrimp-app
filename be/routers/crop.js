const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const moment = require('moment');
const connection = require("../config/dbconnection");

//Get info of a pond
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let sql = "SELECT * FROM CROP WHERE CROP.ID = ?;";

        id && connection.query(sql, id, (err, results) => {
            if (err) res.status(500).json(err);

            results.length > 0 ?
                res.status(200).json(results) :
                res.status(200).json("Cant find any crop!");
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

//Create a pond
router.post('/', async (req, res) => {
    try {
        let id = uuid.v4();
        let pondID = req.body.pondID;
        let type = req.body.type;
        let number = req.body.number;

        let date = moment().format('YYYY-MM-DD');

        const sql = "INSERT INTO CROP (ID, pondID, type, number, startDate) VALUES (?,?,?,?,?);";

        if (id && pondID && type && number) {

            connection.query(sql, [id, pondID, type, number, date], (err, results) => {
                if (err) res.status(500).json(err);
                res.status(200).json(results);
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//Delete a crop
router.delete('/:id', async (req, res) => {
    try {

        let id = req.params.id;

        //Delete crop-stat
        let sql = "DELETE FROM CROP_STAT " +
            "WHERE CROP_STAT.cropID IN " +
            "( SELECT c.ID FROM CROP AS c " +
            "WHERE c.ID = ? );";

        //Delete daily history
        sql += "DELETE FROM DAILY_HISTORY " +
            "WHERE DAILY_HISTORY.cropID IN " +
            "( SELECT c.ID FROM CROP AS c " +
            "WHERE c.ID = ? );";

        //Delete crops and pond
        sql += "DELETE FROM CROP WHERE CROP.ID = ?;";

        id && connection.query(sql, [id, id, id, id], (err, results) => {
            if (err) res.status(500).json(err);
            res.status(200).json(results);
        })

    } catch (error) {
        res.status(500).json(error);
    }
});

//Update a pond
router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let type = req.body.type;
        let number = req.body.number;

        let cropInfo = {
            type: JSON.stringify(type),
            number
        }

        let sql = "UPDATE CROP AS P SET ,{0},{1} WHERE P.ID = ?;";

        Object.keys(cropInfo).forEach((key, index) => {
            cropInfo[key] ?
                sql = sql.replace(`,{${index}}`, `P.${key} = ${cropInfo[key]},`) :
                sql = sql.replace(`,{${index}}`, ``);
            if (index == 1) sql = sql.replace(', WHERE', ' WHERE');
        })

        if (type || number) {
            connection.query(sql, id, (err, results) => {
                if (err) res.status(500).json(err);
                res.status(200).json(results);
            })
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

//Choose stats to track for a crop
router.post('/stat/:id', async (req, res) => {
    try {

        let id = req.params.id;
        let statId = req.body.statID;

        let sql = "INSERT INTO CROP_STAT (cropID, statID) VALUES (?, ?);";

        id && connection.query(sql, [id, statId], (err, results) => {
            if (err) res.status(500).json(err);
            res.status(200).json(results);
        })

    } catch (error) {
        res.status(500).json(error);
    }
})

//Get all histories 
router.get('/history/all/:id', async (req, res) => {
    try {
        let cropID = req.params.id;

        let sql = "SELECT * FROM DAILY_HISTORY WHERE DAILY_HISTORY.cropID = ?;";

        cropID && connection.query(sql, cropID, (err, results) => {
            if (err) res.status(500).json(err);

            results.length > 0 ?
                res.status(200).json(results) :
                res.status(200).json("Cant find any history!");
        })

    } catch (error) {
        res.status(500).json(error);
    }
})

//Get one history
router.get('/history/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let sql = "SELECT * FROM DAILY_HISTORY WHERE DAILY_HISTORY.ID = ?;";

        id && connection.query(sql, id, (err, results) => {
            if (err) res.status(500).json(err);

            results.length > 0 ?
                res.status(200).json(results) :
                res.status(200).json("Cant find any history!");
        })

    } catch (error) {
        res.status(500).json(error);
    }
})

//Create/Save history
router.post('/history', async (req, res) => {
    try {
        let id = uuid.v4();
        let cropID = req.body.cropID;
        let statID = req.body.statID;

        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let num_stat = req.body.num_stat;
        let description = req.body.description;

        let sql = "INSERT INTO DAILY_HISTORY (ID, cropID, statID, history_date, num_stat, description) VALUES (?,?,?,?,?,?)"

        if (id && cropID && statID && num_stat) {
            connection.query(sql, [id, cropID, statID, date, num_stat, description], (err, results) => {
                if (err) res.status(500).json(err);
                res.status(200).json(results);
            })
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

//Delete history
router.delete('/history/:id', async (req, res) => {
    try {
        let id = req.params.id;

        let sql = "DELETE FROM DAILY_HISTORY AS D WHERE D.ID = ?;";

        id && connection.query(sql, id, (err, results) => {
            if (err) res.status(500).json(err);
            res.status(200).json(results);
        })

    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;