<template>
  <section class="content">
    <h1>{{ visa.name }}</h1>

    <tabbed-card :card="card" />
  </section>
</template>

<script>
import tabbedCard from '@/components/tabbed-card/Card';
import { mapState } from 'vuex';

export default {
  components: {
    tabbedCard
  },
  data() {
    return {
      slug: this.$route.params.slug,
      card: {
        pages: [
          {
            sections: [
              {
                title: 'Why this visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              },
              {
                title: 'Is this visa right for me?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              }
            ]
          },
          {
            sections: [
              {
                title: 'How long is the visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              },
              {
                title: 'When can I apply?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              }
            ]
          },
          {
            sections: [
              {
                title: 'Why this visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              },
              {
                title: 'Is this visa right for me?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              }
            ]
          },
          {
            sections: [
              {
                title: 'How long is the visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              },
              {
                title: 'When can I apply?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              }
            ]
          },
          {
            sections: [
              {
                title: 'Why this visa?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?',
                tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti paritur.'
              },
              {
                title: 'Is this visa right for me?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptates in corrupti pariatur at suscipit molestiae maxime nam expedita, velit eos esse doloribus sit explicabo, delectus laborum obcaecati soluta earum?'
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('visas', ['visaList']),
    visa() {
      return this.visaList.find(item => item.slug === this.slug);
    }
  },
  mounted() {
    if(!this.visa) {
      this.$router.push({name: 'not-found'});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0 $spacing*6;
}

h1 {
  margin-bottom: $spacing*5;
}
</style>
