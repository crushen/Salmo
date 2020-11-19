<template>
  <div>
    <div class="tools-card">
      <h2 class="margin-m bottom">When would you like to start the day count? (3/3)</h2>

      <div class="inner">
        <p>Home Office calculates your ILR record by <b>the day you submit the application</b>. Therefore, the day you start your day count will determine <b>the earliest day</b> you can submit your application.</p>

        <p class="margin-s top">If you came to the UK on any visa <b>before</b> your initial visa started, as long as the time in between the two visas was <b>less than 180 days</b>, your first entry date can be from the entry date of that first visa.</p>

        <p class="margin-s top">For example :</p>
        <p>You were about to come to study in the UK, but before you got your student visa, you entered with a visitor visa to sort out some errands. After completion, you went home to process your student visa and returned to the UK in two months. In this case, you may start from the visitor visa.</p>

        <img src="@/assets/illustrations/ilr-tracker/day-count.svg" alt="" class="margin-m top">

        <p class="margin-m top">If this not the case, please state the starting day as <b>the entry date of your initial visa</b> into the UK.</p>

        <p class="margin-s top">For example :</p>
        <p>You first came to the UK as a student and have entered the UK with a student visa. In this case, your student visa would be your initial visa to stay in the UK.</p>

        <img src="@/assets/illustrations/ilr-tracker/day-count-2.svg" alt="" class="margin-m top">
      </div>
    </div>

    <div class="tools-card margin-m top">
      <h2>My Starting Day is...</h2>

      <div class="inner">
        <FormulateInput
          v-model="startDate"
          type="date"
          aria-label="date"
          validation="bail|required|date"
          class="grey-label margin-m top" />
      </div>
    </div>

    <div v-if="date" class="content btn-container margin-m top">
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
      startDate: null,
      error: null
    }
  },
  methods: {
    submitForm() {
      if(this.date) {
        this.profileToUpdate.ilrTracker.startDate = this.startDate
        this.$store.dispatch('auth/updateProfile', this.profileToUpdate)
      } else {
        this.error = 'Please select a date to continue'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

img {
  width: 100%;
}

.btn-container {
  text-align: right;

  button {
    min-width: 120px;
  }
}
</style>
