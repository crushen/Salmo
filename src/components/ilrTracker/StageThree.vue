<template>
  <div class="tools-card">
    <h2>Which ILR plan to go for?</h2>

    <div class="inner">
      <p class="margin-s top">There are two options to ILR, 5 year plan and 10 year plan. But they can be a bit complicated. Be sure to take a look at our <a>Help Centre Article</a> before making your decision!</p>

      <div class="plan-btns margin-s top">
        <button @click="selectPlan" class="none">
          <img
            :class="selectedPlan === '5 year plan' ? 'border' : ''"
            src="@/assets/illustrations/ilr-tracker/5.svg"
            alt="">
          5 year plan
        </button>

        <button @click="selectPlan" class="none margin-s top">
          <img
            :class="selectedPlan === '10 year plan' ? 'border' : ''"
            src="@/assets/illustrations/ilr-tracker/10.svg"
            alt="">
          10 year plan
        </button>
      </div>
      
      <p v-if="error && !selectedPlan" class="error margin-s top bottom">{{ error }}</p>

      <div class="btn-container margin-m top">
        <button @click="saveDetails" class="primary">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profileToUpdate: { type: Object, required: true }
  },
  data() {
    return {
      selectedPlan: null,
      error: null
    }
  },
  methods: {
    selectPlan(event) {
      this.selectedPlan = event.target.parentElement.textContent.trim()
    },
    saveDetails() {
      if(this.selectedPlan) {
        this.profileToUpdate.ilrPlan = this.selectedPlan
        this.$emit('next-stage')
        this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      } else {
        this.error = 'Please select a plan to continue'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

a {
  color: $dark-font;
  font-weight: 500;
  text-decoration: underline;
}

.plan-btns {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border: 4px solid transparent;
      border-radius: 100%;

      &.border {
        border: 4px solid $red;
      }
    }
  }
}

.error {
  text-align: center;
}
</style>
