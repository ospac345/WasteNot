const nedb = require("nedb");

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

    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.list.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

}

module.exports = ListModel;