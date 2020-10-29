<template>
  <div class="tools-pages">
    <main class="tools-pages page padding top">
      <back-button
        @go-back="$router.push({ name: 'profile', params: { username: user.profile.username } })"
        text="Back" />

      <div class="background grey">
        <h1 class="content margin-m top">Settings</h1>

        <section class="margin-m top tools-card">
          <div class="title">
            <h2>Account Details</h2>
            <button @click="modalIsOpen = true" class="none">
              <img src="@/assets/icons/red/edit.svg" alt="">
            </button>
          </div>

          <div class="inner">
            <p class="margin-s top">Full Name: {{ user.profile.name }}</p>
            <p>Username: {{ user.profile.username }}</p>
            <p>Birthday: {{ birthday }}</p>
            <p>Current Visa: {{ user.profile.currentVisa.name }}</p>
            <p>{{ dependants }}</p>
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

        <section class="tools-card margin-m top">
          <h2 class="margin-s bottom">Notifications</h2>

          <div class="inner">
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

        <!-- <section class="margin-m top">
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
        </section> -->

        <section class="tools-card margin-m top">
          <h2 class="margin-s bottom">Reset Password</h2>

          <div class="inner">
            <p class="margin-s bottom">Click the link below and we will send you an email to reset your password.</p>
            <a href="#">Send Reset Password Link</a>
          </div>
        </section>

        <section class="tools-card margin-m top">
          <h2 class="margin-s bottom">Delete Account</h2>

          <div class="inner">
            <p class="margin-s bottom">I would like to close my account and delete everything from Salmo.</p>

            <router-link
              :to="{ name: 'delete-account', params: { username: user.profile.username } }"
              class="margin-s top">
              Delete Account
            </router-link>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import backButton from '@/components/BackButton'
import editAccount from '@/components/modals/EditAccount'
import editAccountAlert from '@/components/alerts/CloseEditAccount'
// import logoutAlert from '@/components/alerts/logout/ConfirmLogout'

export default {
  components: { backButton, editAccount, editAccountAlert },
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
    },
    birthday() {
      const date = this.user.profile.birthday.split('-')
      return date.reverse().join('/')
    },
    dependants() {
      let string

      if(this.user.profile.dependants === 'no') {
        string = 'No dependants'
      } else {
        string = 'Has dependants'
      }

      return string 
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
      this.profileToUpdate.birthday = form.birthday
      this.profileToUpdate.currentVisa = form.currentVisa
      this.profileToUpdate.dependants = form.dependants

      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      this.toggleModal()
    },
    confirmClose() {
      this.confirmingClose = false
      this.toggleModal()
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

  button {
    margin: 16px 26px 0;
  }
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
