const router = require("express").Router();
const {
    getPopularWithView,
    getPopulerByIdWithView,
} = require("../../Controllers/PopulerController");

const { getViewWithView } = require("../../Controllers/ViewController");
const {getFacilitiesWithView} = require("../../Controllers/FacilitiesController");

router.get("/", (req, res) => {
    res.render("mainpage/index", {
        current: "home"
    });
});
router.get("/about", (req, res) => {
    res.render("mainpage/about", {
      current: "about",
    });
});

router.get("/experience", getPopularWithView);
router.get("/experience/:id", getPopulerByIdWithView);

router.get("/gallery", getViewWithView);
router.get("/facilities", getFacilitiesWithView);

module.exports = router