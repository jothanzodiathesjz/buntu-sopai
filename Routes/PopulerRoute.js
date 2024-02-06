const router = require("express").Router();
const {
  PostPopuler,
  UpdatePopuler,
  getPopuler,
  getPopulerById,
  deletePopuler
} = require("../Controllers/PopulerController");
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

router.get("/get", getPopuler);
router.post("/post", upload.single("img"), PostPopuler);
router.put("/update/:id", upload.single("img"), UpdatePopuler);
router.get("/get/:id", getPopulerById);
router.delete("/del/:id", deletePopuler);

module.exports = router;
