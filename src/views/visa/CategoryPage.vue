<template>
  <section id="category-page">
    <div class="content">
      <h1>{{ category }} Visas</h1>
    </div>
    
    <div class="content">
      <visa-card 
        v-for="visa in visas"
        :key="visa.name"
        :visa="visa"
        :category="category"
        class="visa-card">
        <template #quickTip>
          <quick-tip :visa="visa"/>
        </template>
      </visa-card>
    </div>
  </section>
</template>

<script>
import visaCard from '@/components/visa/VisaCard';
import quickTip from '@/components/visa/QuickTip';
import { mapState } from 'vuex';

export default {
  components: {
    visaCard,
    quickTip
  },
  data() {
    return {
      category: this.$route.params.category,
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visas() {
      return this.visaList.filter(item => item.category === this.category);
    }
  },
  mounted() {
    if(!this.visas.length) {
      this.$router.push({name: 'not-found'});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

#category-page {
  padding: $spacing*12 0 $spacing*8;
}

h1 {
  text-transform: capitalize;
  margin-bottom: $spacing*5;
}

.visa-card {
  margin-bottom: $spacing*4;
}

// Tablet
@media screen and (min-width: 600px) {
  #category-page {
    padding: $spacing*15 0 $spacing*8;
  }

  h1 {
    margin-bottom: $spacing*8;
  }

  .visa-card {
    margin-bottom: $spacing*6;
  }
}
</style>
