<template>
  <header>
    <section class="container">
      <div v-show="status === 'idle'" class="search-bar-wrapper">
        <div class="search-icon-wrapper">
          <img class="search-icon" src="../assets/search_icon.svg" alt="" />
        </div>
        <input
          type="search"
          v-model.lazy="searchTerm"
          placeholder="Search for photo"
        />
      </div>
      <!--  CONSIDER: adding a go back button -->
      <h2 v-show="status === 'loading'">
        Searching for <span>"{{ searchTerm }}"</span>
      </h2>
      <h2 v-show="status === 'success'">
        Search Results for <span>"{{ searchTerm }}"</span>
      </h2>
    </section>
  </header>
</template>

<script setup lang="ts">
import { Status } from '../types';

defineProps<{ status: Status }>();

const searchTerm = defineModel({ default: '' });
</script>

<style scoped lang="scss">
header {
  width: 100%;
  background-color: #dee2e7;
  padding-bottom: 20px;

  @media screen and (min-width: 768px) {
    padding-bottom: 40px;
  }

  @media screen and (min-width: 1024px) {
    padding-bottom: 40px;
  }
}

.container {
  display: flex;
  align-items: center;

  width: 100%;
  max-width: var(--wrapper-width);
  margin: 0 auto;
  padding: var(--wrapper-padding-sm);

  @media screen and (min-width: 768px) {
    padding: var(--wrapper-padding-md);
  }

  @media screen and (min-width: 1024px) {
    padding: var(--wrapper-padding-lg);
  }
}

h2 {
  line-height: 56px;
  color: #2c3553;

  span {
    color: #747d8d;
  }
}

.search-bar-wrapper {
  display: flex;

  width: 100%;
  height: 60px;
  border-radius: 4px;
  border: 1px solid transparent;

  overflow: hidden;

  &:focus-within {
    border: 1px solid black;
  }
  ::placeholder {
    color: var(--text-dark);
  }
}

input[type='search'] {
  flex: 1;

  background-color: var(--bg-light);
  color: var(--text-dark);

  border: none;
  outline: none;
}

.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;

  background-color: var(--bg-light);
  color: grey;

  .search-icon {
    width: 24px;
  }
}
</style>
