<template>
  <div>
    <div class="tools-card">
      <h2>Which ILR plan to go for? (2/3)</h2>

      <div class="inner">
        <p class="margin-s top">Based on your past visas and your current profile, you have two options for the ILR route. Click the one you want to for :</p>

        <div class="plan-btns margin-s top">
          <div :class="selectedPlan === '5 year plan' ? 'border' : ''" class="five">
            <button @click="selectedPlan = '5 year plan'" class="none">
              <img src="@/assets/illustrations/ilr-tracker/5.svg" alt="">
              5 year plan
            </button>

            <p>Pros:</p>
            <ul>
              <li>- more days to travel outside the UK</li>
            </ul>

            <p>Cons:</p>
            <ul>
              <li>- less flexibility for exemptions</li>
              <li>- complicated rules</li>
              <li>- only for certain visas</li>
            </ul>
          </div>

          <div :class="selectedPlan === '10 year plan' ? 'border' : ''" class="ten">
            <button @click="selectedPlan = '10 year plan'" class="none">
              <img src="@/assets/illustrations/ilr-tracker/10.svg" alt="">
              10 year plan
            </button>

            <p>Pros:</p>
            <ul>
              <li>- any legal leave can  be counted </li>
              <li>- more flexibility for exemptions</li>
            </ul>

            <p>Cons:</p>
            <ul>
              <li>- more years</li>
              <li>- more restrictions on days you can travel</li>
            </ul>
          </div>
        </div>
        
        <p v-if="error && !selectedPlan" class="error margin-s top bottom">{{ error }}</p>
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
      error: null
    }
  },
  methods: {
    submitForm() {
      if(this.selectedPlan) {
        this.profileToUpdate.ilrTracker = {}
        this.profileToUpdate.ilrTracker.plan = this.selectedPlan
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
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .five, .ten {
    border: 4px solid transparent;
    border-radius: $radius;

    &.border {
      border: 4px solid $red;
    }
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 100%;
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
</style>
