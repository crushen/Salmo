<template>
  <section class="content">
    <h1>Pre-Settled Status</h1>

    <!-- <tabbed-card 
      :card="card"
      class="card" /> -->
  </section>
</template>

<script>
// import tabbedCard from '@/components/tabbed-card/Card';

export default {
  components: {
    // tabbedCard
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.content {
  padding: $spacing*12 0;
}

h1 {
  margin-bottom: $spacing*5;
}

// Tablet
@media screen and (min-width: 600px) {
  h1 {
    margin-bottom: $spacing*8;
  }
}

// Desktop
@media screen and (min-width: 1100px) {
  h1 {
    margin-bottom: $spacing*10;
  }
  
  .card {
    width: 75%;
    margin: auto;
  }
}
</style>
