const nedb = require("nedb");


class UserModel {
    constructor(userFilePath) {
        console.log('UserFilePath', userFilePath);
        if (userFilePath) {
            this.userDb = new nedb(userFilePath);
            console.log("User connected to " + userFilePath);
            userFilePath;
        } else {
            this.userDb = new nedb();
        }
    }

    registerUser(username, password, householdName) {
        let user = {
            username: username,
            password: password,
            householdName: householdName
        };
        //  console.log('coming from user Model registerUser', user)
        return new Promise((resolve, reject) => {
            this.userDb.findOne({ username: username }, (err, foundUser) => {
                if (err) {
                    reject(err);
                } else if (foundUser) {
                    reject({ message: 'User with this username already exists' });
                } else {
                    this.userDb.insert(user, (error, doc) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(doc);
                        }
                    });
                }
            });
        });
    }



    getUser(username, password) {
        console.log('coming from user Model getUser', username, password);
        return new Promise((resolve, reject) => {
            this.userDb.find({ username: username, password: password }, (err, docs) => {
                if (err) {
                    reject(err);
                } else if (docs.length === 0) {
                    reject({ message: 'Incorrect username or password' });
                } else {
                    resolve(docs);
                }
            });
        });
    }


}

module.exports = UserModel;