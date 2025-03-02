const genreList = [
  { id: 1, name: "action" },
  { id: 2, name: "adventure" },
  { id: 4, name: "comedy" },
  { id: 8, name: "drama" },
  { id: 10, name: "fantasy" },
  { id: 14, name: "horror" },
  { id: 22, name: "romance" },
  { id: 24, name: "sci-fi" },
  { id: 30, name: "sports" },
  { id: 36, name: "slice of life" },
  { id: 37, name: "supernatural" },
  { id: 41, name: "thriller" }
];

export const getPopularAnimes = async (page=1) => {
  const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`);
  const data = await response.json();
  return data.data;
};

export const getRecentAnimes = async (page=1) => {
  const response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`);
  const data = await response.json();
  return data.data;
};

export const getGenreWiseAnimes = async (genre,page=1) => {
  const genreID = (genreList.find(gen => gen.name.toLowerCase() === genre)).id;
  const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreID}&order_by=score&sort=desc&page=${page}`);
  const data = await response.json();
  return data.data;


};

export const getUpcomingAnimes = async (page=1) => {
  const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?page=${page}`);
  const data = await response.json();
  return data.data;
};


export const fetchAnimeDetails = async (id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!response.ok) throw new Error('Failed to fetch anime details');
    const data = await response.json();
    return data.data; 
};

export const searchAnimes = async (query) => {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.data;
};

