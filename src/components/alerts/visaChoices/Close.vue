<template>
  <base-alert
    @confirm="confirm"
    @cancel="cancel"
    confirmText="Are you sure you want to leave?">
 
    <p>Anything you’ve selected will be lost if you exit this page.</p>
  </base-alert>
</template>

<script>
import baseAlert from '@/components/alerts/BaseAlert'

export default {
  components: { baseAlert },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>
