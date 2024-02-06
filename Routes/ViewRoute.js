const router = require("express").Router();
const { PostView, UpdateView, getView, getViewById } = require("../Controllers/ViewController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
});

router.get("/get", getView);
router.post("/post", upload.single("img"), PostView);
router.put("/update/:id", upload.single("img"), UpdateView);
router.get("get/:id", getViewById);

module.exports = router;
