<template>
  <Searchbar v-model="queryTerm" :status="status" />

  <h3 v-if="status === 'loading'">Loading...</h3>
  <h3 v-if="error">
    {{ error }}
  </h3>

  <template v-if="status === 'success' || status === 'idle'">
    <Gallery :photos="photos" />
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { createApi } from 'unsplash-js';
import { Gallery, Searchbar } from './components';
import { Photo, Status } from './types';

const api = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

const queryTerm = ref<string | undefined>();
const status = ref<Status>('idle');
const isSearching = ref(false);
const error = ref<string | null>(null);
const photos = ref<Photo[]>([]);

// watch for changes in the queryTerm and trigger a search
watch(queryTerm, async newTerm => {
  if (newTerm) {
    await searchImages(newTerm);
  }
});

// fetch initial photos on mount
onMounted(async () => {
  await loadInitialPhotos();
});

async function searchImages(keyword: string) {
  isSearching.value = true;
  error.value = null;
  status.value = 'loading';

  try {
    const data = await fetchPhotos(keyword);

    if (data && data.response && data.response.results) {
      photos.value = data.response.results;
      status.value = 'success';
    } else {
      throw new Error('No results');
    }
  } catch (err: any) {
    error.value = err.message || 'Error fetching images';
    status.value = 'error';
  } finally {
    isSearching.value = false;
  }
}

async function loadInitialPhotos() {
  error.value = null;

  try {
    const data = await fetchPhotos('African'); // Default search term

    if (data && data.response && data.response.results) {
      photos.value = data.response.results;
    } else {
      throw new Error('No results');
    }
  } catch (err: any) {
    error.value = err.message || 'Error loading initial photos';
  }
}

async function fetchPhotos(query: string) {
  return await api.search.getPhotos({
    query,
    orientation: 'portrait',
  });
}
</script>
