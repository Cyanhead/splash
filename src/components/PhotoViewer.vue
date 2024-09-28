<template>
  <Modal @close="$emit('close')">
    <div class="image-wrapper">
      <img class="photo-banner" :src="photo.urls.regular" alt="" />
    </div>
    <div class="attribution">
      <h3>
        {{ photo.user.name }}
      </h3>
      <p>
        {{ photo?.user?.location }}
      </p>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { Photo } from '../types';
import Modal from './Modal.vue';

defineProps<{
  photo: Photo;
}>();

defineEmits(['close']);

onMounted(() => {
  window.document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  window.document.body.style.overflow = 'auto';
});
</script>

<style lang="scss" src="./styles.scss" scoped></style>
<style lang="scss" scoped>
.image-wrapper {
  height: 70vh;
  height: 70dvh;
  max-width: 90vw;
  overflow-x: auto;

  background-color: var(--bg-gray);

  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  img.photo-banner {
    height: 100%;
    min-width: 1000px;

    object-fit: cover;
  }
}

.attribution {
  position: static;

  display: flex;
  flex-direction: column;
  gap: 4px;

  background-color: var(--bg-light);

  padding: 28px 40px;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;

  p {
    color: var(--text-gray);
  }
}
</style>
