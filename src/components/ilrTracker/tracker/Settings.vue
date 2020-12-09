<template>
  <div>
    <div class="tools-card margin-m bottom">
      <h2>Edit your ILR</h2>

      <div class="inner">
        <p v-if="qualifiesForFive" class="margin-s top">You can change your ILR plan or starting day of your day count right here:</p>
        <p v-else class="margin-s top">You currently only qualify for the 10 year plan, but you can change starting day of your day count right here:</p>
      </div>
      
      <h3>ILR Plan</h3>

      <div class="inner">
        <div class="plan-btns" :class="qualifiesForFive ? '' : 'center'">
          <button
            v-if="qualifiesForFive"
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
import { cloneDeep } from 'lodash'

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
  computed: {
    qualifiesForFive() {
      const currentVisa = cloneDeep(this.profileToUpdate.currentVisa),
            pastVisas = cloneDeep(this.profileToUpdate.pastVisas),
            allVisas = pastVisas.concat(currentVisa),
            currentType = this.profileToUpdate.currentVisa.type,
            validVisas = [
              'Tier 1 : Global Talent',
              'Tier 1 : Exceptional Talent',
              'Tier 1 : Innovator',
              'Tier 1 : Entrepreneur',
              'Tier 1 : Investor',
              'Tier 2 : General Work',
              'Tier 2 : Health and Care'
            ];

      let errors = []

      allVisas.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

      allVisas.forEach((visa, index) => {
        const previousVisa = allVisas[index - 1]

        if(validVisas.includes(visa.name)) {
          if(visa.type === 'switch') {
            if(validVisas.includes(previousVisa.name)) {
              errors.push(visa)
            }
          }

          if(visa.type === 'extend') {
            if(validVisas.includes(previousVisa.name)) {
              errors.push(visa)
            }
          }
        }
      })

      if(!validVisas.includes(currentVisa.name)) {
        errors.push(currentVisa)
      }

      return errors
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
  max-width: 350px;
  margin: 2rem auto 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &.center {
    justify-content: center;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%;
    max-width: 150px;
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
