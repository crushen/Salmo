<template>
  <div class="profile-card">
    <img :src="profilePicture" class="profile-pic" alt="Randomised profile picture">

    <div class="info">
      <p>{{ user.profile.name }}</p>
      <p>{{ birthday }}</p>
      <p>{{ user.profile.nationality }}</p>
      <p>{{ dependants }}</p>
    </div>

    <router-link
      :to="{ name: 'settings', params: { username: user.profile.username } }"
      tag="button">
      Edit
    </router-link>
  </div>
</template>

<script>
import img1 from '@/assets/illustrations/profilePages/profilePictures/Profile 1.svg'
import img2 from '@/assets/illustrations/profilePages/profilePictures/Profile 2.svg'
import img3 from '@/assets/illustrations/profilePages/profilePictures/Profile 3.svg'
import img4 from '@/assets/illustrations/profilePages/profilePictures/Profile 4.svg'
import img5 from '@/assets/illustrations/profilePages/profilePictures/Profile 5.svg'
import img6 from '@/assets/illustrations/profilePages/profilePictures/Profile 6.svg'
import img7 from '@/assets/illustrations/profilePages/profilePictures/Profile 7.svg'
import img8 from '@/assets/illustrations/profilePages/profilePictures/Profile 8.svg'
import img9 from '@/assets/illustrations/profilePages/profilePictures/Profile 9.svg'
import img10 from '@/assets/illustrations/profilePages/profilePictures/Profile 10.svg'

export default {
  props: { user: { required: true, type: Object } },
  data() {
    return { profilePictures: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10] }
  },
  computed: {
    profilePicture() {
      return this.profilePictures[Math.floor(Math.random()*10) + 1];
    },
    birthday() {
      const date = this.user.profile.birthday.split('-');
      return date.reverse().join('/');
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
.profile-card {
  display: flex;
  align-items: center;
}
</style>
