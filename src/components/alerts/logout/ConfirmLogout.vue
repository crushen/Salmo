<template>
  <base-alert
    @confirm="confirm"
    @cancel="cancel"
    confirmText="Are you sure you want to sign out?">
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
 