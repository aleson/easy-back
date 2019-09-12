const MongoClient = require('mongodb').MongoClient;

const dbName = process.env.BOOKLING_DB_NAME;
const dbHost = process.env.BOOKLING_DB_HOST;
const dbPort = process.env.BOOKLING_DB_PORT;

const all = (collectionName, response) => { 
    MongoClient.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, (err, client) => {
        if (err) throw err;
        let db = client.db(dbName);
        db.collection(collectionName).find().toArray((err, result) => {
            if (err) throw err;
            response.json(result);
            client.close();
        });
    });
};

module.exports = { all };