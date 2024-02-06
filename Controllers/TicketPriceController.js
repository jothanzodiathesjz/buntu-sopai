const TicketPrice = require("../Models/TicketPriceModel");

const getTicketPrice = async (req, res) => {
  const dataTicketPrice = await TicketPrice.find({});
  res.status(200).json({ dataTicketPrice });
};
const getTicketPriceById = async (req, res) => {
  const { id } = req.params;
  const dataTicketPrice = await TicketPrice.findOne({ _id: id });
  res.status(200).json({ dataTicketPrice });
};
const PostTicketPrice = async (req, res) => {
  await TicketPrice.create(req.body);
  res.status(201).json({ msg: "success" });
};

const UpdateTicketPrice = async (req, res) => {
  const { id } = req.params;
  const { text, price } = req.body;
  let result;
  const ticketPrice = await TicketPrice.findOne({ _id: id });
  let data = {
    text: text || ticketPrice.text,
    price: price || ticketPrice.price,
  };
  await TicketPrice.findOneAndUpdate({ _id: id }, data);
  res.status(201).json({ msg: "update success" });
};

module.exports = {
  PostTicketPrice,
  UpdateTicketPrice,
  getTicketPrice,
  getTicketPriceById,
};
