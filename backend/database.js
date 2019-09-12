const mongoose = require('mongoose');
const UserModel = require('./model/user');

const dbName = 'TEST_DB';//process.env.BOOKLING_DB_NAME;
const dbHost = '127.0.0.1';//process.env.BOOKLING_DB_HOST;
const dbPort = 27017;//process.env.BOOKLING_DB_PORT;
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, (err) => {
    if (err) throw err;
    console.log('Successfull connect');
});

const allUsers = (res, size) => {
    UserModel.find({})
    .limit(size)
    .then((users) => {
        res.send(users);
    });
};

const saveUser = (json) => {
    let user = new UserModel(json);  
    user.save((err) => {
        if(err) throw err;
        console.log(`Create '${user._name}' user!`);
    }); 
};

module.exports = { allUsers, saveUser };