//file conn.js


const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
//console.log(Db)

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();
  
//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

module.exports = {
    connectToServer: async function (callback) {
    //console.log('client',client)
    //console.log('client.connect',client.connect)
     //await client.connect( );
     let _client = await client.connect();
     _db = _client.db('blog')
     
     //console.log('client')
  },

  // connectToServer: async function (callback) {
  //   try {
  //     // Connect to the MongoDB cluster
  //     await client.connect();
      
  //     // Set the _db variable to the "blog" database
  //     _db = client.db('blog');

  //     //client.getDb("blog")
  //     //console.log('_db', client.db("blog"))

  //     if(_db){
  //       console.log("Successfully connected to MongoDB."); 
  //     }
      
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   //return callback(e);
  // },

  getDb: function () {
    //console.log('_db',_db)
    return _db //client.connect;
  },
};
