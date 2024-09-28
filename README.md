# Splash - Unsplash Clone

Splash is a simple Unsplash clone built with **Vue 3's Composition API**. It allows users to search for photos using the **Unsplash API** and displays the results with infinite scrolling for a smooth and dynamic user experience. Splash is designed to be lightweight and responsive.

#### The demo is hosted [here](https://splash-unsplash.netlify.app/).

## Features

- **Photo Search**: Users can search for images from the Unsplash API by typing a query into the search bar.
- **Infinite Scrolling**: Automatically load more photos as the user scrolls down the page, providing a continuous photo feed without pagination.
- **Responsive Design**: The app works seamlessly on various screen sizes, making it mobile-friendly.
- **Lazy Loading**: Images load progressively as the user scrolls, improving performance.

## Technologies

- **Vite** (Bundler)
- **Vue 3** (Composition API)
- **TypeScript** (for static typing)
- **Unsplash API** (for fetching images)
- **SCSS** (for styling)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (>=14.x recommended)
- [Unsplash Developer Account](https://unsplash.com/developers) (You will need an access key to use the API)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/splash.git
cd splash
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Create Environment Variables

Create a .env file in the root directory of the project and add your Unsplash API Access Key:

```makefile
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

Replace `your-unsplash-access-key` with the actual key obtained from Unsplash.

### 4. Run the Application

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

This will start the app at `http://localhost:5173/` or another available port.

### 5. Build for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

## Usage

- **Search**: Enter a search term into the search input and press Enter or click the search button.
- **Infinite Scrolling**: Scroll down to load more images. The page automatically fetches the next batch of photos using the Unsplash API.
- **Responsive**: The layout adapts to different screen sizes for a smooth mobile and desktop experience.

```graphql
src/
├── assets/              # Icons
├── components/          # Vue components
│   ├── Gallery.vue      # Displays photos in grid with infinite scrolling
│   ├── Modal.vue        # Modal component
│   ├── PhotoCard.vue    # Single photo card component
│   ├── PhotoViewer.vue  # Modal wrapped component to view photo
│   ├── SearchBar.vue    # Search input component
│   ├── Skeleton.vue     # Loader component shown while fetching photos
│   ├── index.ts         # Export components from one file
│   ├── style.scss       # Shared styles
├── helpers/             # Custom composition API hooks
│   └── fetchPhotos.ts   # Function for fetching photos from Unsplash API
├── App.vue              # Main App component
├── constants.ts         # Constants used globally
├── main.ts              # Entry point for Vue app
├── types.ts             # Types used globally
```

### Key Files

- **SearchBar.vue**: Component to handle user input for searching photos.
- **Gallery.vue**: Renders the photos in a grid layout, handling infinite scrolling.
- **PhotoCard.vue**: Represents individual photo items, including image and author information.
- **PhotoViewer.vue**: Represents individual photo items, including image and author information using a modal view.

### Example of Gallery.vue

```html
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
```
