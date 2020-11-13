<template>
  <div>
    <div class="tools-card margin-m bottom">
      <h2>What is ILR?</h2>

      <div class="inner">
        <p class="margin-s top">ILR (Indefinite Leave to Remain) is the term for permanent residency in the United Kingdom. You can apply ILR after living in the country for a certain amount of time.</p>

        <p class="margin-s top">However, ILR is famous for restrictions, it can be like walking on a minefield. This is why we designed this feature to help you get through this journey!</p>

        <p class="margin-s top">You will need to fill out some details before we organise your tracker:</p>
      </div>
    </div>

    <div class="content btn-container">
      <button @click="$emit('next-stage')" class="primary">Continue</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.btn-container {
  text-align: right;

  button {
    min-width: 120px;
  }
}
</style>
