const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
console.log(Db)
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


module.exports = {
  // connectToServer: async function (callback) {
  //   //console.log('client',client)
  //   //console.log('client.connect',client.connect)
  //    await client.connect(  function (err, db) {
  //     // Verify we got a good "db" object
  //     console.log('db',db)
  //     console.log('err',err)

  //     if (db)
  //     {
  //       _db = db.db("test");
  //       console.log("Successfully connected to MongoDB."); 
  //     }
  //     return callback(err);
        
  //   });
  // },

  connectToServer: async ()=> {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
  

    const client = new MongoClient(Db);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
       let _connection = client.db('blog')
        console.log('_connection', _connection.collection('posts').find())
        _db = client
        // Make the appropriate DB calls
       // await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
},
 
  getDb: function () {
    return _db;
  },
};