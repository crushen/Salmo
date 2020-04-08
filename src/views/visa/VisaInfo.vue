<template>
  <section class="content">
    <!-- <h1>Visa Info</h1>
    <div 
      v-for="visa in visas"
      :key="visa.name">
      <router-link :to="{ name: 'visa-page', params: { slug: visa.slug } }">{{ visa.name }}</router-link>
    </div> -->

    <h1>Looking for an overview of all UK visas?</h1>

    <div class="buttons">
      <p>To start, let us know where you are from.</p>
      <div class="container">
        <button>Non - EU</button>
        <button>EU</button>
        <button>Help Centre</button>
      </div>
    </div>
  </section>
</template>

<script>


export default {
  data() {
    return {
      visas: this.$store.state.visas.visaList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $top-padding 0;
}

.buttons {
  margin-top: 14vw;

  .container {
    text-align: center;
  }

  button {
    width: 125px;
    margin: $spacing*4 $spacing 0;
  }
}

</style>
