<template>
  <div class="content">
    <div class="profile-card">
      <img :src="profilePicture" class="profile-pic" alt="Randomised profile picture">

      <div class="info">
        <p class="name title">{{ user.profile.name }}</p>
        <div class="details">
          <p>{{ birthday }}</p>
          <p>{{ user.profile.nationality }}</p>
          <p>{{ dependants }}</p>
        </div>
      </div>

      <router-link
        :to="{ name: 'settings', params: { username: user.profile.username } }"
        tag="button"
        class="none">
        <img src="@/assets/icons/edit.svg" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
import img1 from '@/assets/illustrations/profile-pictures/1.svg'
import img2 from '@/assets/illustrations/profile-pictures/2.svg'
import img3 from '@/assets/illustrations/profile-pictures/3.svg'
import img4 from '@/assets/illustrations/profile-pictures/4.svg'
import img5 from '@/assets/illustrations/profile-pictures/5.svg'
import img6 from '@/assets/illustrations/profile-pictures/6.svg'
import img7 from '@/assets/illustrations/profile-pictures/7.svg'
import img8 from '@/assets/illustrations/profile-pictures/8.svg'
import img9 from '@/assets/illustrations/profile-pictures/9.svg'
import img10 from '@/assets/illustrations/profile-pictures/10.svg'

export default {
  props: { user: { required: true, type: Object } },
  data() {
    return { profilePictures: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10] }
  },
  computed: {
    profilePicture() {
      return this.profilePictures[Math.floor(Math.random()*10)]
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
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.profile-card {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.info {
  width: 35%;

  .name {
    color: $blue;
  }

  .details {
    font-size: 0.9em;
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      border-bottom: 1px solid #B4D5DE;
    }
  }
}

button {
  align-self: flex-start;
}
</style>
