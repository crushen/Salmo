<template>
  <div
    class="profile-card">
    <div class="child one">
      <div class="picture"></div>
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
export default {
  props: {
    user: { required: true, type: Object }
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
  max-width: 400px;
  min-height: 260px;
  padding-bottom: $spacing;
  margin: $spacing*5 auto 0 auto;
  background: $secondary-light-blue;
  // border: 4px solid $secondary-light-blue;
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

    .picture {
      width: 100%;
      height: 100%;
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
