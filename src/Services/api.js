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

export const getPopularAnimes = async () => {
  const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`);
  const data = await response.json();
  return data.data;
};

export const getRecentAnimes = async () => {
  const response = await fetch(`https://api.jikan.moe/v4/seasons/now`);
  const data = await response.json();
  return data.data;
};

export const getGenreWiseAnimes = async (genre) => {
  const genreID = (genreList.find(gen => gen.name.toLowerCase() === genre)).id;
  const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreID}&order_by=score&sort=desc`);
  const data = await response.json();
  return data.data;


};

export const getUpcomingAnimes = async () => {
  const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming`);
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

