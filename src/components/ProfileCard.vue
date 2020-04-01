<template>
  <div
    class="profile-card">
    <div class="child one">
      <div class="picture"></div>
    </div>

    <div class="child two">
      <div>
        <p class="label">Username</p> 
        <p>{{ user.profile.firstName }}</p>
      </div>
      <div>
        <p class="label">Date of birth</p> 
        <p>{{ user.profile.age }}</p>
      </div>
    </div>

    <div class="child three">
      <div>
        <p class="label">Nationality</p> 
        <p>{{ user.profile.country }}</p>
      </div>
    </div>

    <div class="child four">
      <div>
        <p class="label">Dependants</p> 
        <p>{{ user.profile.dependants }}</p>
      </div>
    </div>

    <div class="child five">
      <div>
        <p class="label">Current Visa</p> 
        <p>{{ user.profile.currentVisa }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: { required: true, type: Object }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';

.profile-card {
  max-width: 400px;
  min-height: 260px;
  background: $dark-grey;
  color: $light-font;
  padding: 10px;
  margin: $spacing*4 auto 0 auto;
  border-radius: $border-radius;
  @include grid(repeat(2, 1fr), 2fr 1fr 1fr, 10px);

  & .picture {
    width: 35vw;
    height: 35vw;
    background: $light-grey;
    border-radius: $border-radius;
  }

  & .two {
    @include grid(1fr, repeat(2, 1fr), 10px);
  }

  & .five {
    grid-column: 1 /  3;
    grid-row: 3 / 4;
    display: flex;
  }
}
</style>
