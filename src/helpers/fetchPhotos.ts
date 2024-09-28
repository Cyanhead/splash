import { createApi } from 'unsplash-js';
import { API_KEY, PHOTOS_PER_PAGE } from '../constants';

export async function fetchPhotos(query: string, page: number = 1) {
  const api = createApi({
    accessKey: API_KEY,
  });

  return await api.search.getPhotos({
    query,
    orientation: 'landscape',
    page,
    perPage: PHOTOS_PER_PAGE,
  });
}
