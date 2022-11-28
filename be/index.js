const express = require("express");
const app = express();

const connection = require('./config/dbconnection');
const pondRouter = require('./routers/pond');
const cropRouter = require('./routers/crop');
const statRouter = require('./routers/stat');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

connection.connect((err) => {
    if (err) throw err
    console.log("DB connected!")
})

app.use('/pond', pondRouter);
app.use('/crop', cropRouter);
app.use('/stat', statRouter);

app.listen(3000, () => {
    console.log("Backend already!")
})