<template>
  <main class="content">
    <h1>Settings</h1>

    <section>
      <h2>Account</h2>

      <button @click="modalIsOpen = true">Edit</button>

      <p>Full Name: {{ user.profile.name }}</p>
      <p>Username: {{ user.profile.username }}</p>

      <edit-account
        v-if="modalIsOpen"
        @closeModal="closeModal"
        @submitModal="submitModal"
        :profileToUpdate="profileToUpdate"
        :user="user" />

      <edit-account-alert
        v-if="confirmingClose"
        @confirm="confirmClose"
        @cancel="confirmingClose = false" />
    </section>

    <section>
      <h2>Notifications</h2>

      <FormulateInput
        v-model="profileToUpdate.notifications.newsletter"
        type="checkbox"
        label="I wish to receive Salmo newsletters"
        :disabled="profileToUpdate.notifications.off" />

      <FormulateInput
        v-model="profileToUpdate.notifications.timeline"
        type="checkbox"
        label="I wish to receive Timeline reminders of my visa"
        :disabled="profileToUpdate.notifications.off" />

      <FormulateInput
        v-model="profileToUpdate.notifications.planner"
        type="checkbox"
        label="I wish to receive my Visa Planner reminders for my Checklist tasks"
        :disabled="profileToUpdate.notifications.off" />

      <FormulateInput
        v-model="profileToUpdate.notifications.off"
        type="checkbox"
        label="Turn off all notifications" />
    </section>

    <section>
      <h2>Reset Password</h2>

      <a href="#">Send Reset Password Link</a>
    </section>

    <section>
      <h2>Delete Account</h2>

      <a href="#">Delete Account</a>
    </section>

    <section>
      <button @click="savePreferences">Save</button>
    </section>
  </main>
</template>

<script>
import editAccount from '@/components/modals/EditAccount'
import editAccountAlert from '@/components/alerts/CloseEditAccount'

export default {
  components: { editAccount, editAccountAlert },
  data() {
    return {
      user: this.$store.state.auth.user,
      modalIsOpen: false,
      confirmingClose: false
    }
  },
  watch: {
    'profileToUpdate.notifications.off'(val) {
      if(val) {
        this.profileToUpdate.notifications.newsletters = false
        this.profileToUpdate.notifications.timeline = false
        this.profileToUpdate.notifications.planner = false
      }
    }
  },
  computed: {
    profileToUpdate() {
      return {...this.user.profile}
    }
  },
  methods: {
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen
    },
    closeModal() {
      this.confirmingClose = true
    },
    submitModal(form) {
      this.profileToUpdate.name = form.name
      this.profileToUpdate.username = form.username

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      this.toggleModal()
    },
    confirmClose() {
      this.confirmingClose = false
      this.toggleModal()
    },
    savePreferences() {
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      this.$router.push({ name: 'profile', params: { username: this.user.profile.username } })
    }
  }
}
</script>
 