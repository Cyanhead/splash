<template>
  <div class="card">
    <div class="attribution">
      <div class="shimmer artist"></div>
      <div class="shimmer location"></div>
    </div>
  </div>
</template>

<style lang="scss" src="./styles.scss" scoped></style>
<style lang="scss" scoped>
.attribution {
  gap: 8px;

  div {
    height: 20px;
    background-color: var(--bg-gray-2);
  }

  .artist {
    width: 60%;
  }

  .location {
    width: 40%;
  }
}

.shimmer {
  background-image: linear-gradient(
    90deg,
    var(--bg-gray-2),
    #cccccc,
    var(--bg-gray-2)
  );

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
