<template>
  <div class="message-inner margin-m top">
    <div class="line" />

    <div class="inner-text">
      <p><b>Bad news</b>, you have overstayed your visa and didn’t apply for a new visa right after your visa expires, which means your residency is <b>no longer</b> continuous to be considered for ILR.</p>
      
      <p class="margin-s top">This means that after your visa expired, you continued to stay in the UK. Luckily, because this happened before the change of rules (if you would like to know more, please read this Help Centre article), which means there are some exemptions.</p>

      <p class="margin-s top bottom">The old exemptions were (all rules must be met):</p>

      <ol>
        <li>
          You have left the UK with or without an expired visa.
        </li>

        <li>
          You have applied for a new visa within 28 days of the expiry date of your previous visa.
        </li>

        <li class="margin-s bottom">
          Your application was successful and re-entered the country with your new visa.
        </li>
      </ol>

      <p class="margin-s bottom">Unfortunately, you only met some (or none) of the requirements, therefore the exemption could not be used on you.</p>
      
      <p class="margin-s bottom">You now have one option:</p>

      <ol>
        <li>Reset the starting day of your ILR to the day you arrived in the UK from the overstayed trip. You can reset the changes by clicking the button <span><img src="@/assets/icons/red/edit.svg" alt=""></span> beside “ILR Tracker”. Example: Starting date was 01/01/2011, you came back from the trip with the new visa on 30/06/2014. Your restarting date is 30/06/2014.</li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.message-inner {
  .line {
    background: $red;
  }
}

img {
  width: 20px;
}
</style>
