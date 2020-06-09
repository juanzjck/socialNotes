const express = require("express");
const router = express.Router();

// Controllers
const { searchByCategory } = require("../controllers/category.controller");

router.get("/categories/notes/:category", searchByCategory);
module.exports = router;
