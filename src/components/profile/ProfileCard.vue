<template>
  <div
    class="profile-card">
    <div class="child one">
      <img :src="profilePictures[Math.floor(Math.random()*10) + 1]" class="profile-pic" alt="Randomised profile picture">
    </div>

    <div class="child two">
      <div>
        <p class="label">Username</p> 
        <p class="user-info">{{ user.profile.username }}</p>
      </div>
      <div>
        <p class="label">Date of birth</p> 
        <p class="user-info">{{ birthday }}</p>
      </div>
    </div>

    <div class="child three">
      <div>
        <p class="label">Nationality</p> 
        <p class="user-info">{{ user.profile.nationality }}</p>
      </div>
    </div>

    <div class="child four">
      <div>
        <p class="label">Dependants</p> 
        <p class="user-info">{{ user.profile.dependants }}</p>
      </div>
    </div>

    <div class="child five">
      <div>
        <p class="label">Current Visa</p> 
        <p class="user-info">{{ user.profile.currentVisa.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '@/assets/illustrations/profilePages/profilePictures/Profile 1.svg';
import img2 from '@/assets/illustrations/profilePages/profilePictures/Profile 2.svg';
import img3 from '@/assets/illustrations/profilePages/profilePictures/Profile 3.svg';
import img4 from '@/assets/illustrations/profilePages/profilePictures/Profile 4.svg';
import img5 from '@/assets/illustrations/profilePages/profilePictures/Profile 5.svg';
import img6 from '@/assets/illustrations/profilePages/profilePictures/Profile 6.svg';
import img7 from '@/assets/illustrations/profilePages/profilePictures/Profile 7.svg';
import img8 from '@/assets/illustrations/profilePages/profilePictures/Profile 8.svg';
import img9 from '@/assets/illustrations/profilePages/profilePictures/Profile 9.svg';
import img10 from '@/assets/illustrations/profilePages/profilePictures/Profile 10.svg';

export default {
  props: {
    user: { required: true, type: Object }
  },
  data() {
    return {
      profilePictures: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
    }
  },
  computed: {
    birthday() {
      const date = this.user.profile.birthday.split('-');
      return date.reverse().join('/');
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.profile-card {
  max-width: 320px;
  min-height: 260px;
  padding-bottom: $spacing;
  margin: $spacing*5 auto 0 auto;
  background: $secondary-light-blue;
  border-radius: $border-radius;
  box-shadow: $shadow;
  @include grid(repeat(2, 1fr), 2fr 1fr 1fr, 10px);
  align-items: center;

  p {
  
    &.label {
      color: $primary-blue;
    }

    &.user-info {
      background: white;
      padding: 3px 6px;
      border-radius: 4px;
    }
  }

  .one {
    height: 120px;
    padding: 12px 0 0 $spacing;
    align-self: end;

    img {
      width: 100%;
      height: 110px;
      background: white;
      border-radius: 4px;
    }
  }

  .two {
    align-self: end;
    padding-right: $spacing;
    @include grid(1fr, repeat(2, 1fr), 10px);
  }

  .three {
    padding-left: $spacing;
  }

  .four {
    padding-right: $spacing;
  }

  .five {
    grid-column: 1 /  3;
    grid-row: 3 / 4;
    display: flex;
    padding: 0 $spacing;

    div {
      width: 100%;
    }
  }
}
</style>
