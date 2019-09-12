const mongoose = require('mongoose');
const UserModel = require('./model/user');

const dbName = 'TEST_DB';//process.env.BOOKLING_DB_NAME;
const dbHost = '127.0.0.1';//process.env.BOOKLING_DB_HOST;
const dbPort = 27017;//process.env.BOOKLING_DB_PORT;
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
let user = new UserModel(
    { _name: 'awesome name',
      _surname: 'awesome surname',
      _description: 'awesome description',
      _password: 'awesome ********',
      _username: 'awesome username'
    }
);

db.on('error',console.error.bind(console, 'MongoDB connection error:'));

const all = (collectionName, response) => { 
    return [];   
};

const saveAwesomUser = (response) => {
    UserModel.create(user, (err) => {
        if(err) return err;
        response.send(`Save user!`);
    })
}

module.exports = { all, saveAwesomUser };