const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 4200;
const DbUrl = process.env.DB_URL
const DbName = process.env.DBNAME
const DbTable = process.env.DBTABLE

const client = new mongodb.MongoClient(DbUrl)
app.post("/register", async(req, res) => {
    const username = req.body.username.trim()
    const password = req.body.password.trim()
    if(username.length==0 ||password.length ==0){
        res.send("invalid username or password")
    }
    const userprofile = {
        username:username,
        password:password
    }
    const feedback = await client.db(DbName).collection(DbTable).insertOne(userprofile)
    if(feedback.acknowledged){
        res.send("success")
    }
    
})

// retrieve all datas
app.get("/users", async(req, res) => {
    const feedback = await client.db(DbName).collection(DbTable).find().toArray()
    res.send(feedback)
})

// update data
app.post("/update", async(req, res) => {
    const username = req.body.username
    const password = req.body.password
    const feedback = await client.db(DbName).collection(DbTable).updateOne({username:username},{$set:{password:password}})
    if(feedback.acknowledged){
        res.send("success")
    }
})

// delete data
app.post("/delete", async(req, res) => {
    const username = req.body.username
    const feedback = await client.db(DbName).collection(DbTable).deleteOne({username:username})
    if(feedback.acknowledged){
        res.send("success")
    }
})
// get single user
app.get("/singleuser", async(req, res) => {
    const username = req.body.username
    const feedback = await client.db(DbName).collection(DbTable).findOne({username:username})
    res.send(feedback)
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})