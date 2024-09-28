import { createApi } from 'unsplash-js';

export async function fetchPhotos(query: string, page: number = 1) {
  const api = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
  });

  return await api.search.getPhotos({
    query,
    orientation: 'landscape',
    page,
    perPage: 10,
  });
}
