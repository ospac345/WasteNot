const userDAO = require('../models/userModel');
const user = new userDAO({ filename: 'user.db', autoload: true });

// Path: backend/controllers/userController.js

exports.registerUser = function (req, res) {
    user.registerUser(req.body.username, req.body.password, req.body.householdName)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("promise rejected with error: ", err);
            if (err.message === 'User with this username already exists') {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        });
};



exports.getUser = function (req, res) {
    user.getUser(req.body.username, req.body.password)
        .then((result) => {
            if (result.length === 0) {
                res.status(401).json({ error: 'Invalid username or password' });
            } else {
                res.json(result);
            }
        })
        .catch((err) => {
            console.error("promise rejected with error: ", err);
            res.status(500).json({ error: err.message });
        });
}
