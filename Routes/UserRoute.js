const router = require("express").Router();
const { CreateUser, Login } = require("../Controllers/User");

router.post("/create", CreateUser);
router.post("/login", Login);

module.exports = router;
