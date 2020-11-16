<template>
  <div>
    <div class="tools-card margin-m bottom">
      <h2>Edit your ILR</h2>

      <div class="inner">
        <p class="margin-s top">You can change your ILR plan or starting day of your day count right here:</p>
      </div>
      
      <h3>ILR Plan</h3>

      <div class="inner">
        <div class="plan-btns margin-s top">
          <button
            @click="selectedPlan = '5 year plan'"
            :class="selectedPlan === '5 year plan' ? 'border' : ''"
            class="none">
            <img src="@/assets/illustrations/ilr-tracker/5.svg" alt="">
            5 year plan
          </button>

          <button
            @click="selectedPlan = '10 year plan'"
            :class="selectedPlan === '10 year plan' ? 'border' : ''"
            class="none">
            <img src="@/assets/illustrations/ilr-tracker/10.svg" alt="">
            10 year plan
          </button>
        </div>
      </div>

      <h3>Starting Day</h3>

      <div class="inner">
        <p class="margin-s top bottom">Your starting day of the qualifying period will determine the earliest application date you can apply for ILR! If you already have trips before your chosen starting day, they will not be counted.</p>
        
        <FormulateInput
          v-model="startDate"
          type="date"
          label="date"
          validation="bail|required|date"
          class="grey-label margin-m top" />
      </div>

      <div class="inner">
        <div class="submit-buttons">
          <button
            @click="submitForm"
            class="primary margin-m top">
            Save
          </button>

          <button
            @click="cancel"
            class="outline margin-s top">
            Cancel
          </button>
        </div>
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
      selectedPlan: this.profileToUpdate.ilrTracker.plan,
      startDate: this.profileToUpdate.ilrTracker.startDate
    }
  },
  methods: {
    submitForm() {
      this.profileToUpdate.ilrTracker.plan = this.selectedPlan
      this.profileToUpdate.ilrTracker.startDate = this.startDate
      this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      .then(() => this.$emit('cancel'))
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

h3 {
  font-size: 20px;
  font-weight: 500;
}

.plan-btns {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%;
    border-radius: $radius;
    padding: 0.5rem;

    &.border {
      border: 4px solid $red;
    }

    img {
      width: 100%;
    }
  }
}

.submit-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 105px;
  }
}
</style>
