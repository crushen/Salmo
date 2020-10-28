<template>
  <div class="container">
    <div class='box'>
      <div class='wave -one' :style="{'background': background}"></div>
      <div class='wave -two' :style="{'background': background}"></div>
      <div class='wave -three' :style="{'background': background}"></div>
      <div class='wave -four' :style="{'background': background}"></div>
    </div>
  </div>

</template>

<script>
export default {
  computed: {
    background() {
      let colour;

      if(this.$route.name === 'login') {
        colour = '#077594';
      } else if(this.$route.name === 'visa-info') {
        colour = '#FFD275';
      }

      return colour;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.box {
	position: relative;
}

.wave {
  position: absolute;
  z-index: 1;
  width: 580px;
  height: 580px;
  margin-left: -240px;
  margin-top: -280px;
  transform-origin: 50% 48%;
  border-radius: 50%;
  animation: drift 12s infinite linear;
}

.wave.-two {
  animation: drift 9s infinite linear;
	position: fixed;
  border-radius: 60%;
}

.wave.-three {
  animation: drift 6s infinite linear;
	position: fixed;
  border-radius: 80%;
}

.wave.-four {
  animation: drift 3s infinite linear;
	position: fixed;
  border-radius: 100%;
}

.box:after {
  content: '';
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  transform: translate3d(0, 0, 0);
}

@keyframes drift {
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
}
</style>
