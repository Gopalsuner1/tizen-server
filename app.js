const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./routes/MovieRoute");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/movies", movieRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});