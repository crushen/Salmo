<template>
  <div>
    <router-link
      tag="div"
      class="result-link"
      :to="{ name: 'visa-page', params: { slug: visa.slug } }">
      <p>{{ visa.name }}</p>
      <p>Switch: {{ visa.switch }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['visa']
}
</script>
<style scoped lang="scss">

</style>
