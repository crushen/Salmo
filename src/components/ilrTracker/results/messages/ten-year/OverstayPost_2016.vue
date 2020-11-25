<template>
  <div class="message-inner margin-m top">
    <div class="line" />

    <div class="inner-text">
      <p><b>Bad news</b>, you have overstayed your visa, which means your residency is <b>no longer</b> continuous to be considered for ILR.</p>
      
      <p>This means that after your visa expired, you continued to stay in the UK. With the change of rules from 24 November 2016, (if you would like to know more, please read this Help Centre article), there are less exemptions.</p>

      <p class="margin-s top bottom">The new exemptions are (all rules must be met):</p>

      <ol>
        <li>
          You have left the UK with a valid visa.
        </li>

        <li class="margin-s bottom">
          You have applied for a new visa within 14 days of the expiry date of your previous visa AND a good reason to explain your overstay.
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
