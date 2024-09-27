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

<style lang="scss" scoped>
.card {
  position: relative;

  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .attribution {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: end;

    height: 50%;
    padding: 10px;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    color: white;
    text-align: center;

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

  @media screen and (min-width: 768px) {
    aspect-ratio: 9 / 10;
    height: 100%;
    grid-row: span 10;

    &:first-child {
      grid-row: span 7;
    }

    &:nth-child(3) {
      grid-row: span 9;
    }
  }
}
</style>
