<template>
  <base-alert
    @confirm="confirm"
    @cancel="cancel"
    confirmText="Are you sure you want to change your next visa?">
 
    <p>You are about to change <b>{{ user.profile.nextVisa.name }}</b> to <b>{{ profileToUpdate.nextVisa.name }}</b>.</p> 
    <p>Changing your next visa will restart your documentation list and anything you’ve made to the list will be lost.</p>
  </base-alert>
</template>

<script>
import baseAlert from '@/components/alerts/BaseAlert'

export default {
  props: {
    user: { required: true, type: Object },
    profileToUpdate: { required: true, type: Object }
  },
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
