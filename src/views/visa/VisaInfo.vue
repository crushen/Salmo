<template>
  <section class="content">
    <h1>Visa Info</h1>
    <div 
      v-for="visa in visas"
      :key="visa.name">
      <router-link :to="{ name: 'visa-page', params: { slug: visa.slug } }">{{ visa.name }}</router-link>
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
