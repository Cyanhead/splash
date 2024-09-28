<template>
  <main>
    <section class="container">
      <div class="grid">
        <template v-if="status === 'loading' || isLoadingInitial">
          <template v-for="_ in PHOTOS_PER_PAGE" :key="_">
            <Skeleton />
          </template>
        </template>

        <template v-for="photo in photos" :key="photo.id">
          <PhotoCard :photo="photo" />
        </template>

        <template v-if="isLoadingMore">
          <template v-for="_ in PHOTOS_PER_PAGE" :key="_">
            <Skeleton />
          </template>
        </template>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Photo, Status } from '../types';
import PhotoCard from './PhotoCard.vue';
import Skeleton from './Skeleton.vue';
import { PHOTOS_PER_PAGE } from '../constants';

defineProps<{
  photos: Photo[];
  status: Status;
  isLoadingInitial: boolean;
  isLoadingMore: boolean;
}>();
</script>

<style scoped lang="scss">
main {
  width: 100%;
  margin-top: -30px;

  @media screen and (min-width: 768px) {
    margin-top: -40px;
  }
}

.container {
  display: flex;
  align-items: center;

  width: 100%;
  max-width: var(--wrapper-width);
  margin: 0 auto;
  padding: var(--wrapper-padding-sm);
  padding-top: 0;

  @media screen and (min-width: 768px) {
    padding: var(--wrapper-padding-md);
    padding-top: 0;
  }

  @media screen and (min-width: 1024px) {
    padding: var(--wrapper-padding-lg);
    padding-top: 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  width: 100%;
  max-width: 1024px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 64px;
    row-gap: 42px;
  }
  @media screen and (min-width: 1200px) {
    margin-left: 64px;
  }
}
</style>
