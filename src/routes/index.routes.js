const express = require("express");
const router = express.Router();
// Helpers
const { hostname } = require("../helpers/functions");
// Controllers
const { renderIndex, renderAbout } = require("../controllers/index.controller");

router.get("/",hostname ,renderIndex);
router.get("/about", renderAbout);

module.exports = router;
