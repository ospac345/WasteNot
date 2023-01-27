const listDAO = require("../models/listModel");
const list = new listDAO({ filename: "list.db", autoload: true });

// Path: backend/controllers/listController.js

exports.newList = function (req, res) {
    list.init();
    res.redirect("/api");
};

exports.listAll = function (req, res) {
    list.getAllEntries()
        .then((list) => {
            res.json(list);
            console.log(list);
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

