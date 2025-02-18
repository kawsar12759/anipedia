
export const getPopularAnimes = async () => {
  const response = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`);
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