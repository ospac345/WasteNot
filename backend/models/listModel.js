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
                        "id": 1,
                        "name": "banana",
                        "quantity": 2,
                        "expiration_date": new Date("2023-10-29"),
                        "category": "fruit",
                        "location": "pantry",
                        "notes": ""
                    },
                    {
                        "id": 2,
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
        const newItem = { ...entry, id: uniqid() };

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
            this.list.update({ username }, { $pull: { items: { id: { $in: itemIds } } } }, { multi: true }, (err, numAffected) => {
                if (err) return reject(err);
                resolve(numAffected);
            });
        });
    };

    updateEntry = (username, item) => {
        return new Promise((resolve, reject) => {
            this.list.findOne({ username: username }, (err, doc) => {
                if (err) {
                    reject(err);
                } else if (!doc) {
                    reject(`No document found with username "${username}"`);
                } else {
                    let items = doc.items;
                    let index = items.findIndex(i => i.id === item.id);
                    if (index === -1) {
                        reject(`No item found with id "${item.id}"`);
                    } else {
                        items[index] = item;
                        this.list.update({ _id: doc._id }, { $set: { items: items } }, (err, numAffected) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`Successfully updated ${numAffected} document(s)`);
                            }
                        });
                    }
                }
            });
        });
    };







}

module.exports = ListModel;