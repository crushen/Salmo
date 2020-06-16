<template>
  <div class='box'>
    <div class='wave -one'></div>
    <div class='wave -two'></div>
    <div class='wave -three'></div>
    <div class='wave -four'></div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.box {
	position: fixed;
	top: 33%;
  left: 56.5%;
	transform: rotate(80deg);
}

.wave {
  position: absolute;
  z-index: 1;
  top: 3%;
  left: 10%;
  background: $primary-yellow;
  width: 580px;
  height: 580px;
  margin-left: -150px;
  margin-top: -250px;
  transform-origin: 50% 48%;
  border-radius: 50%;
  animation: drift 12s infinite linear;
}

.wave.-two {
  animation: drift 9s infinite linear;
	position: fixed;
	background-color: $primary-yellow;
  border-radius: 60%;
}

.wave.-three {
  animation: drift 6s infinite linear;
  background: $primary-yellow;
	position: fixed;
  border-radius: 80%;
}

.wave.-four {
  animation: drift 3s infinite linear;
  background: $primary-yellow;
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
