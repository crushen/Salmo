<template>
  <ul class="visa-history">
    <li
      v-for="visa in sortByDate"
      :key="visa.appliedDate"
      @click="handleEditVisa(visa)"
      :class="{'editing': editVisas}"
      class="visa">
      <p class="name"><b>{{ visa.name }}</b></p>
      <p><b>valid from {{ date(visa.start) }} to {{ date(visa.end) }}</b></p>

      <div class="bottom">
        <p>Applied on <b>{{ date(visa.appliedDate) }}</b> in; <b>{{ visa.locationApplied }}</b></p>
        <p v-if="visa.entryDate">Entered the UK on <b>{{ date(visa.entryDate) }}</b></p>
      </div>
    </li>

    <li
      @click="handleEditVisa(user.profile.currentVisa)"
      :class="{'editing': editVisas}"
      class="current visa">
      <p class="name">
        <b>{{ user.profile.currentVisa.name }}</b>
        <img class="current-visa-img" src="@/assets/icons/red/star-solid.svg" alt="">
      </p>
      <p><b>valid from {{ date(user.profile.currentVisa.start) }} to {{ date(user.profile.currentVisa.end) }}</b></p>

      <div class="bottom">
        <p>Applied on <b>{{ date(user.profile.currentVisa.appliedDate) }}</b> in; <b>{{ user.profile.currentVisa.locationApplied }}</b></p>
        <p v-if="user.profile.currentVisa.entryDate">Entered the UK on <b>{{ date(user.profile.currentVisa.entryDate) }}</b></p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    profileToUpdate: { type: Object, required: true },
    sortByDate: { type: Array, required: true },
    editVisas: { type: Boolean, required: true }
  },
  methods: {
    handleEditVisa(visa) {
      if(this.editVisas) {
        this.$emit('editVisa', visa)
      }
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
    min-height: 110px;
    position: relative;

    b {
      font-weight: 500;
    }

    .name {
      font-size: 18px;

      p {
        font-size: 18px;
      }
      
    }

    .bottom {
      position: absolute;
      left: 1rem;
      bottom: 0.2rem;
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

    &.editing {
      cursor: pointer;
      border: 4px solid $red;
      background: white;
      transition: 0.2s;

      p {
        color: $red;
      }

      &:hover {
        background: $red;

        p {
          color: $light-font;
        }
      }
    }

    &:nth-of-type(even) {
      background: white;
    }
  }
}
</style>
