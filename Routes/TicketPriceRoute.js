const router = require("express").Router();
const { PostTicketPrice, UpdateTicketPrice, getTicketPrice, getTicketPriceById } = require("../Controllers/TicketPriceController");

router.get("/get", getTicketPrice);
router.post("/post", PostTicketPrice);
router.put("/update/:id", UpdateTicketPrice);
router.get("/get/:id", getTicketPriceById);

module.exports = router;
