<template>
  <Searchbar v-model="searchQuery" :status="fetchStatus" />

  <h3 v-if="fetchError">
    {{ fetchError }}
  </h3>

  <template v-if="fetchStatus !== 'error'">
    <Gallery
      :photos="photos"
      :status="fetchStatus"
      :is-loading-initial="isLoadingInitial"
      :is-loading-more="isLoadingMore"
    />
  </template>

  <div v-if="isLoadingMore && fetchStatus === 'success'">Loading...</div>
  <div ref="sentinel" class="sentinel"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Gallery, Searchbar } from './components';
import { Photo, Status } from './types';
import { fetchPhotos } from './helpers';

const searchQuery = ref<string>('');
const fetchStatus = ref<Status>('idle');
const fetchError = ref<string | null>(null);
const photos = ref<Photo[]>([]);
const page = ref(1);
const isLoadingInitial = ref(false);
const isLoadingMore = ref(false);

const observer = ref<IntersectionObserver | null>(null);
const sentinel = ref(null);

// watch for changes in the queryTerm and trigger a search
watch(searchQuery, async newTerm => {
  if (newTerm) {
    await searchPhotos(newTerm);
  }
});

onMounted(async () => {
  // fetch initial photos on mount
  await loadInitialPhotos();
  setupIntersectionObserver();
});

async function loadInitialPhotos() {
  isLoadingInitial.value = true;
  fetchError.value = null;

  try {
    const data = await fetchPhotos('African');

    if (data && data.response && data.response.results) {
      photos.value = data.response.results;
    } else {
      throw new Error('No results');
    }
  } catch (err: any) {
    fetchError.value = err.message || 'Error loading initial photos';
  } finally {
    isLoadingInitial.value = false;
  }
}

async function searchPhotos(newSearchQuery: string) {
  fetchError.value = null;
  fetchStatus.value = 'loading';
  searchQuery.value = newSearchQuery;
  page.value = 1; // reset page for new search
  photos.value = []; // clear current photos

  try {
    const data = await fetchPhotos(newSearchQuery);

    if (data && data.response && data.response.results) {
      photos.value = data.response.results;
      fetchStatus.value = 'success';
    } else {
      throw new Error('No results');
    }
  } catch (err: any) {
    fetchError.value = err.message || 'Error fetching images';
    fetchStatus.value = 'error';
  }
}

async function loadMorePhotos() {
  isLoadingMore.value = true;
  fetchError.value = null;
  page.value++;
  try {
    const data = await fetchPhotos(searchQuery.value || 'African', page.value);

    if (data && data.response && data.response.results) {
      photos.value = [...photos.value, ...data.response.results];
    } else {
      throw new Error('No results');
    }
  } catch (err: any) {
    fetchError.value = err.message || 'Error loading more photos';
  } finally {
    isLoadingMore.value = false;
  }
}

const setupIntersectionObserver = () => {
  observer.value = new IntersectionObserver(
    async entries => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoadingMore.value) {
        await loadMorePhotos();
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }
  );

  if (sentinel.value && observer.value) {
    (observer.value as IntersectionObserver).observe(sentinel.value);
  }
};

onBeforeUnmount(() => {
  if (sentinel.value && observer.value) {
    (observer.value as IntersectionObserver).unobserve(sentinel.value);
  }
});
</script>

<style scoped lang="scss">
.sentinel {
  height: 100px;
  visibility: hidden;
}
</style>
