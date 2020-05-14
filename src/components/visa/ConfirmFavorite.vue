<template>
  <div class="modal">
    <p>This will change your favorite visa from <span>{{ user.favoriteVisa.name }}</span> to <span>{{ visa.name }}</span>.</p>
    <p>Changing your favorite visa will also change your documentation list, and any changes you've made to it will be lost</p>
    <p><span>Are you sure you want to change your favorite visa?</span></p>

    <div class="buttons">
      <button @click="handleConfirm" class="secondary">No Thanks</button>
      <button @click="handleConfirm" class="pink">Yes!</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    visa: { required: true, type: Object },
    user: { required: true, type: Object }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('visas', ['documentChecklist']),
    newVisa() {
      return this.documentChecklist.find(item => item.name === this.visa.name);
    }
  },
  methods: {
    handleConfirm(event) {
      if(event.target.textContent === 'No Thanks') {
        this.$emit('closeModal');
      } else {
        this.user.favoriteVisa = this.newVisa;
        this.$store.dispatch('auth/updateProfile', this.user);
        this.$emit('closeModal');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.modal {
  width: 90%;
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 40;
  padding: $spacing*3;
  background: $background;
  color: $dark-font;
  text-align: left;
  border-radius: $border-radius;
  border: 6px solid $primary-yellow;

  span {
    font-weight: 600;
  }

  p:not(:first-of-type) {
    margin-top: $spacing*3;
  }
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: $spacing*4;

  button {
    width: 50%;
    max-width: 140px;
    font-size: 4.5vw;

    &:nth-of-type(2) {
      width: 42%;
      max-width: 116px;
    }
  }
}
</style>
