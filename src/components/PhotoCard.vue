<template>
  <div class="card">
    <img :src="photo.urls.thumb" alt="" />
    <div class="attribution">
      <h3>
        {{ photo.user.name }}
      </h3>
      <p>
        {{ photo?.user?.location }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Photo } from '../types';

defineProps<{ photo: Photo }>();
</script>

<style lang="scss" src="./styles.scss" scoped></style>
<style lang="scss" scoped>
div.card {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .attribution {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));

    h3 {
      font-weight: 500;
    }

    p {
      font-size: 16px;

      @media screen and (min-width: 768px) {
        font-size: 14px;
      }
    }
  }
}
</style>
