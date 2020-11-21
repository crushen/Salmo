<template>
  <base-modal @closeModal="closeModal">
    <h1>Edit Preferences</h1>

    <h2 class="margin-s top bottom">Current ILR Plan</h2>

    <div class="plan-btns margin-m bottom">
      <button @click="selectPlan" class="none">
        <img
          :class="form.selectedPlan === '5 year plan' ? 'border' : ''"
          src="@/assets/illustrations/ilr-tracker/5.svg"
          alt="">
        5 year plan
      </button>

      <button @click="selectPlan" class="none margin-s top">
        <img
          :class="form.selectedPlan === '10 year plan' ? 'border' : ''"
          src="@/assets/illustrations/ilr-tracker/10.svg"
          alt="">
        10 year plan
      </button>
    </div>

    <div class="flex">
      <h2>Past Visas</h2>

      <button @click="$emit('add-past-visa')" class="none">
        <img src="@/assets/icons/red/plus.svg" alt="">
      </button>
    </div>

    <ul v-if="pastVisas.length" class="past-visa-list margin-m top">
      <li
        v-for="(visa, index) in sortByDate"
        :key="visa.name">
        <div class="text">
          <p><b>{{ visa.name }}</b></p>
          <p>{{ date(visa.start) }} to {{ date(visa.end) }}</p>
        </div>

        <div class="buttons">
          <button @click="$emit('edit-past-visa', index)" class="none">
            <img src="@/assets/icons/red/edit.svg" alt="">
          </button>

          <button @click="$emit('delete-past-visa', index)" class="none">
            <img src="@/assets/icons/red/cross.svg" alt="">
          </button>
        </div>
      </li>
    </ul>

    <div class="button-center margin-m top">
      <button @click="handleSubmit" class="outline">
        Save
      </button>
    </div>
  </base-modal>
</template>

<script>
import baseModal from '@/components/modals/BaseModal'

export default {
  props: {
    profileToUpdate: { required: true, type: Object },
    user: { required: true, type: Object }
  },
  components: { baseModal },
  data() {
    return {
      form: {
        selectedPlan: this.profileToUpdate.ilrPlan,
        pastVisas: []
      }
    }
  },
  computed: {
    pastVisas() {
      return this.user.profile.pastVisas
    },
    sortByDate() {
      const array = this.pastVisas
      return array.sort((a, b) => new Date(a.start) - new Date(b.start))
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    handleSubmit() {
      this.$emit('submitModal', this.form)
    },
    selectPlan(event) {
      this.form.selectedPlan = event.target.parentElement.textContent.trim()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.plan-btns {
  display: flex;
  align-items: center;
  justify-content: space-around;

  button {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      border: 4px solid transparent;
      border-radius: 100%;

      &.border {
        border: 4px solid $red;
      }
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.past-visa-list {
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:first-of-type) {
      margin-top: 1rem;
    }

    p {
      margin: 0;
    }

    button {
      margin-left: 0.5rem;
    }
  }
}
</style>
