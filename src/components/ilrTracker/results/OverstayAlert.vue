<template>
  <div>
    <transition name="dialog" mode="out-in">
      <overstay-reason
        v-if="giveReason"
        @closeModal="giveReason = false"
        :overstayHoliday="overstayHoliday" />
    </transition>

    <div
      :class="colourClass"
      class="overstay-alert">
      <div class="top">
        <p><b>{{ overstayText }}</b></p>
        <p>{{ overstayHoliday.overstayDays }} days</p>
      </div>
      
      <button
        v-if="canGiveReason"
        @click="giveReason = true"
        class="tertiary">
        do you have a reason?
      </button>
    </div>
  </div>
</template>

<script>
import overstayReason from '@/components/modals/ilrTracker/red/OverstayReason'

export default {
  props: {
    overstayHoliday: { type: Object, required: true }
  },
  components: { overstayReason },
  data() {
    return {
      giveReason: false
    }
  },
  computed: {
    overstayText() {
      if(this.overstayHoliday.reason.haveReason === 'yes') {
        return 'Making Application'
      } else {
        return 'Overstayed'
      }
    },
    canGiveReason() {
      let reason = false
      
      if(this.overstayHoliday.within_28) {
        reason = true

        if(this.overstayHoliday.reason.haveReason === 'no' || !this.overstayHoliday.reason.haveReason) {
          reason = true
        } else {
          reason = false
        }
      }

      return reason
    },
    colourClass() {
      let colour = 'red'

      if(this.overstayHoliday.within_28) {
        colour = 'blue'

        if(!this.overstayHoliday.reason.haveReason) {
          colour = 'blue'
        }

        if(this.overstayHoliday.reason.haveReason === 'no') {
          colour = 'red'
        }

        if(this.overstayHoliday.reason.haveReason === 'yes') {
          colour = 'med-blue'
        }
      }

      return colour
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.overstay-alert {
  margin-top: 0.5rem;
  border-radius: $radius;
  padding: 0.2rem 1rem;

  &.red {
    border: 4px solid $red;
    background: $red;
  }

  &.blue {
    border: 4px solid $blue;
    background: $blue;
  }

  &.med-blue {
    border: 4px solid $med-blue;
    background: $med-blue;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  p,
  .tertiary {
    color: white;
  }
}
</style>
