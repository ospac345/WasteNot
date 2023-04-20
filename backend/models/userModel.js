const nedb = require("nedb");
const bcrypt = require("bcrypt");



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
            householdName: householdName
        };

        return new Promise((resolve, reject) => {
            this.userDb.findOne({ username: username }, (err, foundUser) => {
                if (err) {
                    reject(err);
                } else if (foundUser) {
                    reject({ message: 'User with this username already exists' });
                } else {
                    bcrypt.hash(password, 10, (error, hash) => {
                        if (error) {
                            reject(error);
                        } else {
                            user.password = hash;
                            this.userDb.insert(user, (insertError, doc) => {
                                if (insertError) {
                                    reject(insertError);
                                } else {
                                    resolve(doc);
                                }
                            });
                        }
                    });
                }
            });
        });
    }


    getUser(username, password) {
        return new Promise((resolve, reject) => {
            this.userDb.findOne({ username: username }, (err, foundUser) => {
                if (err) {
                    reject(err);
                } else if (!foundUser) {
                    reject({ message: 'Incorrect username or password' });
                } else {
                    bcrypt.compare(password, foundUser.password, (error, result) => {
                        if (error) {
                            reject(error);
                        } else if (!result) {
                            reject({ message: 'Incorrect username or password' });
                        } else {
                            resolve({ _id: foundUser._id, username: foundUser.username });
                        }
                    });
                }
            });
        });
    }


}

module.exports = UserModel;