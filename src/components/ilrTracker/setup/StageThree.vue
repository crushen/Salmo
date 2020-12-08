<template>
  <div>
    <div class="tools-card">
      <h2>Which ILR plan to go for? (2/3)</h2>

      <div class="inner">
        <p v-if="qualifiesForFive" class="margin-s top">Based on your past visas and your current profile, you have two options for the ILR route. Click the one you want to for:</p>
        
        <p v-else>Based on your past visas and your current profile, you currently only qualify for the 10 year plan. Please click the 10 year plan to continue:</p>
        
        <!-- <div v-else class="margin-s top">
          <div v-if="profileToUpdate.currentVisa.name === 'Tier 4 : Student' && !profileToUpdate.pastVisas.length">
            <p class="margin-s top">Based on your past visas and your current profile, you currently only qualify for the 10 year plan.</p>
            <p class="margin-s top">However, if your next visa is a Tier 1 or Tier 2 visa, you may then qualify for the 5 year plan. Please click the 10 year plan to contiue (but don't worry, you can change this later):</p>
          </div>
        </div> -->
      </div>

      <div class="plan-btns">
        <div
          v-if="qualifiesForFive"
          :class="selectedPlan === '5 year plan' ? 'border' : ''"
          class="five margin-m bottom">
          <button @click="selectedPlan = '5 year plan'" class="none">
            <img src="@/assets/illustrations/ilr-tracker/5.svg" alt="">
            5 year plan
          </button>

          <div class="inner-text">
            <p><b>Pros:</b></p>
            <ul>
              <li>- more days to travel outside the UK</li>
            </ul>

            <p class="margin-s top"><b>Cons:</b></p>
            <ul>
              <li>- less flexibility for exemptions</li>
              <li>- complicated rules</li>
              <li>- only for certain visas</li>
            </ul>
          </div>
        </div>

        <div :class="selectedPlan === '10 year plan' ? 'border' : ''" class="ten">
          <button @click="selectedPlan = '10 year plan'" class="none">
            <img src="@/assets/illustrations/ilr-tracker/10.svg" alt="">
            10 year plan
          </button>

          <div class="inner-text">
            <p><b>Pros:</b></p>
            <ul>
              <li>- any legal leave can  be counted </li>
              <li>- more flexibility for exemptions</li>
            </ul>

            <p class="margin-s top"><b>Cons:</b></p>
            <ul>
              <li>- more years</li>
              <li>- more restrictions on days you can travel</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedPlan" class="content btn-container margin-m top">
      <button @click="submitForm" class="primary">
        Save
      </button>
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
      error: null,
      validVisas: [
        'Tier 1 : Global Talent',
        'Tier 1 : Exceptional Talent',
        'Tier 1 : Innovator',
        'Tier 1 : Entrepreneur',
        'Tier 1 : Investor',
        'Tier 2 : General Work',
        'Tier 2 : Health and Care'
      ]
    }
  },
  computed: {
    qualifiesForFive() {
      const currentVisa = this.profileToUpdate.currentVisa.name,
            pastVisas = this.profileToUpdate.pastVisas,
            currentType = this.profileToUpdate.currentVisa.type;

      let qualifies = false

      // If their current visa is a tier 1 or tier 2 visa
      if(this.validVisas.includes(currentVisa)) {
        qualifies = true
        // // If they have no past visas
        // if(!pastVisas.length) {
        //   qualifies = true
        // } else {
        //   // If their only past visa is Student visa
        //   if(pastVisas.length === 1) {
        //     if(pastVisas[0].name === 'Tier 4 : Student') {
        //       qualifies = true
        //     }
        //   } else {
        //     // If their first past visa is Student and every visa after is Tier 1 or Tier 2
        //     const removeFirst = pastVisas.slice(1),
        //           allTierOneTierTwo = visa => visa.name.includes('Tier 1') || visa.name.includes('Tier 2');

        //     if(removeFirst.every(allTierOneTierTwo) && pastVisas[0].name === 'Tier 4 : Student'){
        //       qualifies = true
        //     } else {
        //       // If all their past visas are Tier 1 or Tier 2
        //       if(pastVisas.every(allTierOneTierTwo)) {
        //         qualifies = true
        //       }
        //     }
        //   }
        // }
      }

      // If any of their past or current visas were swithced
      if(currentType === 'switch') {
        qualifies = false
      }
      
      if(pastVisas && pastVisas.find(visa => visa.type === 'switch')) {
        qualifies = false
      }

      return qualifies
    }
  },
  methods: {
    submitForm() {
      if(this.selectedPlan) {
        this.profileToUpdate.ilrTracker = {}
        this.profileToUpdate.ilrTracker.plan = this.selectedPlan
        this.$emit('next-stage')
        this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
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
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .five, .ten {
    padding: 0.2rem 0.5rem;
    margin: auto;
    border: 4px solid transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: $radius;

    .inner-text {
      width: 55%;
    }

    &.border {
      border: 4px solid $red;
    }
  }

  .five {
    flex-direction: row-reverse;
    margin-bottom: 2rem;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35%;

    img {
      width: 100%;
    }
  }
}

.btn-container {
  text-align: right;

  button {
    min-width: 120px;
  }
}

.error {
  text-align: center;
}

@media screen and (min-width: 700px) {
  .plan-btns {
    flex-direction: row;
    max-width: 500px;
    margin: auto;

    .five, .ten {
      flex-direction: column;

      .inner-text {
        width: 80%;
        margin-top: 2rem;
      }
    }

    .five {
      margin: auto;
    }

    button {
      width: 100px;

      img {
        width: 100px;
      }
    }
  }
}
</style>
