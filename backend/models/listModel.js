const nedb = require("nedb");
const uniqid = require('uniqid');


class ListModel {
    constructor(listFilePath) {
        console.log(listFilePath);
        if (listFilePath) {
            this.list = new nedb(listFilePath);
            console.log("List connected to " + listFilePath);
            listFilePath;
        } else {
            this.list = new nedb();
        }
    }

    init() {
        this.list.insert(
            {
                "username": "test@test.com",
                "items": [
                    {
                        "_id": 1,
                        "name": "banana",
                        "quantity": 2,
                        "expiration_date": new Date("2023-10-29"),
                        "category": "fruit",
                        "location": "pantry",
                        "notes": ""
                    },
                    {
                        "_id": 2,
                        "name": "apple",
                        "quantity": 2,
                        "expiration_date": new Date("2023-10-29"),
                        "category": "fruit",
                        "location": "pantry",
                        "notes": ""
                    }
                ]
            }
        );
    }


    getEntriesForUser(username) {
        return new Promise((resolve, reject) => {
            this.list.find({ username: username }, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }



    addEntry(username, entry) {
        const newItem = { ...entry, _id: uniqid() };

        return new Promise((resolve, reject) => {
            this.list.update({ username }, { $push: { items: newItem } }, { upsert: false }, (err, numAffected) => {
                if (err) {
                    reject(err);
                } else if (numAffected === 0) {
                    reject(new Error("Username not found"));
                } else {
                    resolve(newItem);
                }
            });
        });
    }

    removeEntries = (username, itemIds) => {
        return new Promise((resolve, reject) => {
            this.list.update({ username }, { $pull: { items: { _id: { $in: itemIds } } } }, { multi: true }, (err, numAffected) => {
                if (err) return reject(err);
                resolve(numAffected);
            });
        });
    };


    updateEntry = (username, item) => {
        this.list.find({ username, "items._id": item._id }, function (err, docs) {
            console.log(docs);
        });
    };

    // updateEntry = (username, item) => {
    //     return new Promise((resolve, reject) => {
    //         this.list.update(
    //             { username, "items._id": item._id },
    //             {
    //                 $set: {
    //                     "items.name": item.name,
    //                     "items.quantity": item.quantity,
    //                     "items.unit": item.unit,
    //                     "items.expiration_date": item.expiration_date,
    //                     "items.category": item.category,
    //                     "items.location": item.location,
    //                     "items.notes": item.notes
    //                 }
    //             },
    //             {},
    //             (err, numAffected) => {
    //                 if (err) return reject(err);
    //                 resolve(numAffected);
    //                 console.log("numAffected", numAffected);
    //             }
    //         );
    //     });
    // };







}

module.exports = ListModel;