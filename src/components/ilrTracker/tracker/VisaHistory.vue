<template>
  <ul class="visa-history">
    <li
      v-for="visa in sortByDate"
      :key="visa.appliedDate"
      class="visa">
      <p class="name"><b>{{ visa.name }}</b></p>
      <p><b>valid from {{ date(visa.start) }} to {{ date(visa.end) }}</b></p>
      <p>Applied on <b>{{ date(visa.appliedDate) }}</b> in; <b>{{ visa.locationApplied }}</b></p>
      <p v-if="visa.entryDate">Entered the UK on <b>{{ visa.entryDate }}</b></p>
    </li>

    <li class="current visa">
      <p class="name">
        <b>{{ user.profile.currentVisa.name }}</b>
        <img class="current-visa-img" src="@/assets/icons/red/star-solid.svg" alt="">
      </p>
      <p><b>valid from {{ date(user.profile.currentVisa.start) }} to {{ date(user.profile.currentVisa.end) }}</b></p>
      <!-- <p>Applied on {{ date(visa.appliedDate) }} in; {{ visa.locationApplied }}</p> -->
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true }
  },
  computed: {
    sortByDate() {
      const array = this.user.profile.pastVisas
      return array.sort((a, b) => new Date(b.start) - new Date(a.start)).reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.visa-history {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .visa {
    width: 100%;
    background: #D4E7ED;
    margin-top: 0.5rem;
    border: 4px solid #D4E7ED;
    border-radius: $radius;
    padding: 0.2rem 1rem;

    b {
      font-weight: 500;
    }

    .name {
      font-size: 18px;
    }

    &.current {
      .name {
        display: flex;
        align-items: center;

        img {
          width: 24px;
          margin-left: 0.5rem;
        }
      }
    }

    &:nth-of-type(even) {
      background: white;
    }
  }
}
</style>
