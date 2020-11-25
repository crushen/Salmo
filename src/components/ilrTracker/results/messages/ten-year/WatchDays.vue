<template>
  <div class="message-inner margin-m top">
    <div class="inner-text">
      <p><b>You’re down to your last {{ days }} days to travel.</b></p>

      <p v-if="days <= 100 && days > 60">As long you don’t take an extremely long holiday in the remaining years, then you have nothing to worry about. Make sure you plan your trips carefully from now on!</p>

      <p v-else-if="days <= 60 && days > 30">As long you don’t take an extremely long holiday in the remaining years, make sure you plan your trips carefully from now on, so you have some days left just in case!</p>
      
      <p v-else-if="days <= 30 && days > 10">It’s getting into the last bits of your available absent period. Make sure you plan your trips carefully from now on!</p>
      
      <p v-else-if="days <= 10 && days > 5">It’s getting into the last bits of your available absent period. Make sure you plan your future trips carefully so you don’t go over the 540 days!</p>
      
      <p v-else-if="days <= 5">It’s getting into the last bits of your available absent period. You probably have one or two trips available left to leave the country, be very careful so you don’t go over the 540 days!</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    days: { type: Number, required: true }
  }
}
</script>
