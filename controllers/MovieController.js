
const apiClient = require("../api/axiosins");
const {
  getMovieInfo,
  categories,
  searchMovies
} = require("../services/MovieService");



const getMovieInfoCont = async (req, res) => {
  const { stream_id } = req.params;
  try {
    const movieInfo = await getMovieInfo(stream_id);
    res.json(movieInfo);
  } catch (err) { 

  }
}
const categoriesGet = async (req, res) => {
  const data = await categories();
  res.json(data)
};
const searchMoviesC = async (req, res) => {
  const {name} = req.params; 
  const data = await searchMovies(name);
  res.json(data)
};



module.exports = {
  getMovieInfoCont,
  categoriesGet,
  searchMoviesC
};
