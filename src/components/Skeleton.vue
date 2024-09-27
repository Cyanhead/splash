<template>
  <div class="card">
    <div class="attribution">
      <div class="shimmer artist"></div>
      <div class="shimmer location"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;

  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;

  background-color: #f5f5f5;

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

.attribution {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;
  gap: 8px;

  padding: 24px;

  div {
    height: 20px;
    background-color: #e6e6e6;
  }

  .artist {
    width: 60%;
  }

  .location {
    width: 40%;
  }
}

.shimmer {
  background-image: linear-gradient(90deg, #e6e6e6, #cccccc, #e6e6e6);

  background-size: 120px;
  background-repeat: no-repeat;

  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -150px;
  }
  40%,
  100% {
    background-position: 150px;
  }
}
</style>
