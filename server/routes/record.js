//file record.js
const express = require("express");

const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the posts.
recordRoutes.route("/record").get(async function (req, res) {
let db_connect = await dbo.getDb();

   let _posts = await db_connect
    .collection("posts")
    .find({})
    .toArray();

    let result = [];
    _posts.forEach(function(doc) {
     // console.log(doc);
      result.push(doc)

    });
    //console.log('result', result)
    res.json(result);
 });


// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  let db_connect = await dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };
  try {
    const result = await db_connect.collection("posts").findOne(myquery);
    if (!result) {
      res.status(404).send(`Record with id ${req.params.id} not found`);
      return;
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error finding record");
  }
});

    
   // This section will help you create a new record.
   recordRoutes.route("/record/add").post(function (req, response) {
    console.log('create')
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      age: req.body.age,    };
    db_connect.collection("posts").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });
    
   // This section will help you update a record by id.
   recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    db_connect
      .collection("posts")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
   });
    
   // This section will help you delete a record
   recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
   });
    
   module.exports = recordRoutes;