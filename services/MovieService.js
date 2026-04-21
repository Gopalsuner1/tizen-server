
const apiClient = require("../api/axiosins");
const categoriesD = [
  {
    category_id: "240",
    category_name: "OSCAR WINNING MOVIES",
    parent_id: "0",
  },
  {
    category_id: "412",
    category_name: "AWARDS SHOW",
    parent_id: "0",
  },
  {
    category_id: "34",
    category_name: "BLOCKBUSTER",
    parent_id: "0",
  },
  {
    category_id: "179",
    category_name: "(MULTI LANGUAGE)",
    parent_id: "0",
  },
  {
    category_id: "26",
    category_name: "ENGLISH HINDI DUBBED",
    parent_id: "0",
  },
  {
    category_id: "623",
    category_name: "ENGLISH HINDI DUBBED (CAM)",
    parent_id: "0",
  },
  {
    category_id: "168",
    category_name: "NETFLIX MOVIES HINDI",
    parent_id: "0",
  },
  {
    category_id: "169",
    category_name: "NETFLIX MOVIES ENGLISH",
    parent_id: "0",
  },
  {
    category_id: "147",
    category_name: "Marvel Movies Collection",
    parent_id: "0",
  },
  {
    category_id: "233",
    category_name: "Dubbed Multi Language",
    parent_id: "0",
  },
  {
    category_id: "262",
    category_name: "Romantic Movies",
    parent_id: "0",
  },
  {
    category_id: "120",
    category_name: "INDIAN (4K)",
    parent_id: "0",
  },
  {
    category_id: "766",
    category_name: "INDIAN FHD (2026)",
    parent_id: "0",
  },
  {
    category_id: "757",
    category_name: "INDIAN (2026) (CAM)",
    parent_id: "0",
  },
  {
    category_id: "599",
    category_name: "INDIAN FHD (2025)",
    parent_id: "0",
  },
  {
    category_id: "527",
    category_name: "INDIAN FHD (2024)",
    parent_id: "0",
  },
  {
    category_id: "364",
    category_name: "INDIAN FHD (2023)",
    parent_id: "0",
  },
  {
    category_id: "258",
    category_name: "INDIAN FHD (2022)",
    parent_id: "0",
  },
  {
    category_id: "125",
    category_name: "INDIAN FHD (2021)",
    parent_id: "0",
  },
  {
    category_id: "61",
    category_name: "INDIAN FHD (2020)",
    parent_id: "0",
  },
];

const getMovieInfo = async (vod_id) => {
  try {
    if (!vod_id) {
      throw new Error("vod_id is required");
    }
    const response = await apiClient.get("/", {
      params: {
        action: "get_vod_info",
        vod_id,
      },
    });

    return response.data; // ✅ important
  } catch (err) {
    console.error("Error fetching movie info:", err.message);
    throw err;
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 15 * 60 * 1000; // 5 minutes

const categories = async () => {
  const now = Date.now();

  // ✅ Return cached data if still valid
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    console.log("⚡ Serving from cache");
    return cache.data;
  }
  console.log("🌐 Fetching fresh data...");
  const results = [];
  for (const item of categoriesD) {
    try {
      const response = await apiClient.get("", {
        params: {
          action: "get_vod_streams",
          category_id: item.category_id,
        },
      });

      results.push({
        ...item,
        movies: response.data.slice(0, 25),
      });
    } catch (err) {
      console.error(`Error in category ${item.category_id}:`, err.message);

      results.push({
        ...item,
        movies: [],
      });
    }

    await delay(150);
  }

  // ✅ Save to cache
  cache = {
    data: results,
    timestamp: now,
  };
  return results;
};

const searchMovies = async (query) => {
  if (!query) return [];

  const categoriesData = await categories();
  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const category of categoriesData) {
    for (const movie of category.movies) {
      const name = movie.name || movie.title || "";

      if (name.toLowerCase().includes(lowerQuery)) {
        results.push({
          ...movie,
          category_name: category.category_name,
        });
      }
    }
  }
  return results;
};

module.exports = {
  getMovieInfo,
  categories,
  searchMovies
};
