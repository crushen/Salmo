<template>
  <base-alert
    @confirm="confirm"
    @cancel="cancel"
    confirmText="Are you sure you want to uncheck?">
 
    <p>Unchecking this item will make it resume to it's original status.</p>
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
 