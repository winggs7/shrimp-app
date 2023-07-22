const express = require("express");
const app = express();
var cors = require("cors");

const connection = require('./config/dbconnection');
const userRouter = require('./routers/user');
const pondRouter = require('./routers/pond');
const cropRouter = require('./routers/crop');
const statRouter = require('./routers/stat');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

connection.connect((err) => {
    if (err) throw err
    console.log("DB connected!")
})

app.use('/user', userRouter);
app.use('/pond', pondRouter);
app.use('/crop', cropRouter);
app.use('/stat', statRouter);

app.listen(7000, () => {
    console.log("Backend already!")
})