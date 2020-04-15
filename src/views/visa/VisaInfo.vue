<template>
  <section class="content">
    <h1>Looking for an overview of all UK visas?</h1>

    <div class="buttons">
      <h2>To start, let us know where you are from below:</h2>
      <div class="container">
        <router-link 
          :to="{name: 'non-eu'}"
          tag="button"
          class="pink">
          Non - EU
        </router-link>
        <button class="pink">EU</button>
        <button class="secondary">Help Centre</button>
      </div>
    </div>

    <div class="placeholder-image"></div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $top-padding 0;
}

.buttons {
  margin-top: 12vw;

  .container {
    text-align: center;
  }

  button {
    width: 35vw;
    margin: 10vw $spacing 0;

    &:last-of-type {
      width: 41vw;
    }
  }
}

.placeholder-image {
  width: 25vw;
  height: 35vw;
  background: $light-grey;
  position: absolute;
  bottom: 0;
  left: 5vw;
}
</style>
