const express = require("express");
const router = express.Router();
const {
  getMovieInfoCont,
  categoriesGet,
  searchMoviesC
} = require("../controllers/MovieController");
router.get("/info/:stream_id", getMovieInfoCont);
router.get("/all", categoriesGet);
router.get("/search/:name", searchMoviesC);
module.exports = router;