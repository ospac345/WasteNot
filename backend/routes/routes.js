const express = require("express");
const router = express.Router();
const controller = require("../controllers/listController");
const userController = require("../controllers/userController");

router.get("/api", controller.listAll);
router.get("/new", controller.newList);
router.post("/api/addNewEntry", controller.addEntry);
router.post("/api/remove", controller.removeEntry);
router.post("/api/update", controller.updateEntry);
router.post('/login', userController.getUser);
router.post('/register', userController.registerUser);



router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 NOT found.');
});

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

module.exports = router;