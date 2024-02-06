require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();

// static public
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// koneksi
const connectDB = require("./dbConnect/connect");
app.use(express.json());

// router
const UserRouter = require("./Routes/UserRoute");
const ViewRouter = require("./Routes/ViewRoute");
const ViewsRouter = require("./Routes/views/mainpage");
const FacilitiesRouter = require("./Routes/FacilitiesRoute");
const PopulerRouter = require("./Routes/PopulerRoute");
const TicketPriceRouter = require("./Routes/TicketPriceRoute");

app.use("/auth", UserRouter);
app.use("/view", ViewRouter);

app.use(ViewsRouter)


app.use("/populer", PopulerRouter);
app.use("/facilities", FacilitiesRouter);
app.use("/ticketprice", TicketPriceRouter);
const port = process.env.PORT || 5000;



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
// module.exports.handler = serverless(app);
