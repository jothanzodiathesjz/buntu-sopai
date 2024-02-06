const router = require("express").Router();
const { PostFacilities, UpdateFacilities, getFacilities, getFacilitiesById } = require("../Controllers/FacilitiesController");
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

router.get("/get", getFacilities);
router.post("/post", upload.single("img"), PostFacilities);
router.put("/update/:id", upload.single("img"), UpdateFacilities);
router.get("/get/:id", getFacilitiesById);

module.exports = router;
