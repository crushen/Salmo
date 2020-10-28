<template>
  <main class="content page padding top bottom">
    <h1>Settings</h1>

    <section class="margin-m top">
      <div class="title">
        <h2>Account</h2>
        <button @click="modalIsOpen = true" class="none">
          <img src="@/assets/icons/edit.svg" alt="">
        </button>
      </div>

      <div class="margin-s top">
        <p>Full Name: {{ user.profile.name }}</p>
        <p>Username: {{ user.profile.username }}</p>
      </div>

      <transition name="dialog" mode="out-in">
        <edit-account
          v-if="modalIsOpen"
          @closeModal="closeModal"
          @submitModal="submitModal"
          :profileToUpdate="profileToUpdate"
          :user="user" />
      </transition>

      <transition name="dialog" mode="out-in">
        <edit-account-alert
          v-if="confirmingClose"
          @confirm="confirmClose"
          @cancel="confirmingClose = false" />
      </transition>
    </section>

    <section class="margin-m top">
      <h2>Notifications</h2>

      <div class="margin-s top">
        <FormulateInput
          v-model="profileToUpdate.notifications.newsletters"
          type="checkbox"
          label="Salmo newsletters"
          :disabled="profileToUpdate.notifications.off"
          class="grey-label" />

        <FormulateInput
          v-model="profileToUpdate.notifications.timeline"
          type="checkbox"
          label="Timeline reminders"
          :disabled="profileToUpdate.notifications.off"
          class="grey-label" />

        <FormulateInput
          v-model="profileToUpdate.notifications.planner"
          type="checkbox"
          label="Visa Planner checklist reminders"
          :disabled="profileToUpdate.notifications.off"
          class="grey-label" />

        <FormulateInput
          v-model="profileToUpdate.notifications.off"
          type="checkbox"
          label="Turn off all notifications"
          class="grey-label" />
      </div>
    </section>

    <section class="margin-m top">
      <h2>Sign Out</h2>

      <button
        @click="showLogoutAlert = true"
        class="tertiary margin-s top">
        Sign Out
      </button>

      <transition name="dialog" mode="out-in">
        <logout-alert
          v-if="showLogoutAlert"
          @confirm="handleLogout"
          @cancel="showLogoutAlert = false" />
      </transition>
    </section>

    <section class="margin-m top">
      <h2>Reset Password</h2>

      <a href="#" class="margin-s top">Send Reset Password Link</a>
    </section>

    <section class="margin-m top">
      <h2>Delete Account</h2>

      <router-link
        :to="{ name: 'delete-account', params: { username: user.profile.username } }"
        class="margin-s top">
        Delete Account
      </router-link>
    </section>

    <section class="button margin-m top">
      <button @click="savePreferences" class="outline">Save</button>
    </section>
  </main>
</template>

<script>
import editAccount from '@/components/modals/EditAccount'
import editAccountAlert from '@/components/alerts/CloseEditAccount'
import logoutAlert from '@/components/alerts/logout/ConfirmLogout'

export default {
  components: { editAccount, editAccountAlert, logoutAlert },
  data() {
    return {
      user: this.$store.state.auth.user,
      modalIsOpen: false,
      confirmingClose: false,
      showLogoutAlert: false
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
    },
    handleLogout() {
      this.showLogoutAlert = false

      setTimeout(() => {
        this.$store.dispatch('auth/logOut')
        .then(() => {
          this.$store. commit('auth/setLoggedOut')
          this.$store.commit('wave/setWaveAway', false)
          this.$store.commit('wave/setFullScreen', false)
          this.$store.dispatch('wave/handleTransition')

          if(this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
      }, 800)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  display: block;
  color: $dark-font;
}

.tertiary {
  color: $dark-font;
}

.button {
  text-align: right;
}
</style>
