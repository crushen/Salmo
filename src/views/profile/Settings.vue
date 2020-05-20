<template>
  <section id="settings" class="content">
    <h1>Settings</h1>

    <section class="notifications section">
      <h3>Notifications</h3>

      <div class="switches">
        <pretty-check class="p-switch p-fill">Notify you.</pretty-check>
        <!-- <pretty-check class="p-switch p-fill">Notify you about important dates by email.</pretty-check>
        <pretty-check class="p-switch p-fill">Notify you about important dates by email.</pretty-check> -->
      </div>
    </section>

    <section class="privacy section">
      <h3>Privacy</h3>
    </section>

    <section class="delete section">
      <h3>Delete Account</h3>
    </section>
  </section>
</template>

<script>
import prettyCheck from 'pretty-checkbox-vue/check';

export default {
  components: {
    prettyCheck
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#settings {
  padding: $spacing*10 0;
}

.section {
  margin-top: $spacing*5;
}
</style>