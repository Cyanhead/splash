<template>
  <button class="card" type="button" @click="viewPhoto = true">
    <img :src="photo.urls.thumb" :alt="`photo of ${searchQuery}`" />
    <div class="attribution">
      <h3>
        {{ photo.user.name }}
      </h3>
      <p>
        {{ photo?.user?.location }}
      </p>
    </div>
  </button>

  <PhotoViewer v-if="viewPhoto" :photo="photo" @close="viewPhoto = false" />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { Photo } from '../types';
import PhotoViewer from './PhotoViewer.vue';

defineProps<{ photo: Photo }>();
const searchQuery = inject<string>('searchQuery', 'African');

const viewPhoto = ref<boolean>(false);
</script>

<style lang="scss" src="./styles.scss" scoped></style>
<style lang="scss" scoped>
button.card {
  border: none;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .attribution {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
  }
}
</style>
