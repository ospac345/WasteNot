const listDAO = require("../models/listModel");
const list = new listDAO({ filename: "list.db", autoload: true });

// Path: backend/controllers/listController.js

exports.newList = function (req, res) {
    list.init();
    res.redirect("/api");
};

exports.listAll = function (req, res) {
    list.getEntriesForUser('test@test.com')
        .then((list) => {
            res.json(list);
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.addEntry = function (req, res) {
    console.log('console log from controller class ', req.body);
    const item = {
        name: req.body.name,
        quantity: req.body.quantity,
        unit: req.body.unit,
        expiration_date: req.body.expiration_date,
        category: req.body.category,
        location: req.body.location,
        notes: req.body.notes
    };
    list.addEntry(req.body.username, item)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("promise rejected with error: ", err);
            res.status(500).json({ error: err.message });
        });
}

exports.removeEntry = function (req, res) {
    list.removeEntries(req.body.username, req.body.itemIds)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("promise rejected with error: ", err);
            res.status(500).json({ error: err.message });
        });
}

exports.updateEntry = function (req, res) {
    list.updateEntry(req.body.username, req.body.item)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("promise rejected with error: ", err);
            res.status(500).json({ error: err.message });
        });
}


