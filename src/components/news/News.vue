<template>
  <section>
    <h2>Latest UK visa news</h2>

    <news-card 
      v-for="card in news"
      :key="card.title"
      :title="card.title"
      :subTitle="card.subTitle"
      :source="card.source"/>

  </section>
</template>

<script>
import newsCard from '@/components/news/NewsCard';

export default {
  components: {
    newsCard
  },
  data() {
    return {
      news: [
        {
          title: 'Look at what Boris did again.',
          subTitle: 'Read this article to find out more bithces',
          source: 'Guardian'
        },
        {
          title: 'Honestly what is going on?',
          subTitle: 'Read this article to find out more bithces',
          source: 'BBC News'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

h2 {
  margin-bottom: $spacing*4;
}
</style>
