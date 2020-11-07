<template>
  <base-alert
    @confirm="confirm"
    @cancel="cancel"
    confirmText="Are you sure you want to delete?">
 
    <p>The item you’ve selected is ready to be erased.</p>
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
