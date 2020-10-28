<template>
  <section v-if="articles.length">
    <h2>Latest UK visa news</h2>

    <div class="cards">
      <news-card 
        v-for="article in articles"
        :key="article.id"
        :article="article" />
    </div>
  </section>
</template>

<script>
import newsCard from '@/components/news/NewsCard';
import { mapState } from 'vuex';

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
  },
  computed: {
    ...mapState('news', ['articles'])
  },
  created() {
    this.$store.dispatch('news/getArticles');
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

h2 {
  margin-bottom: $spacing*4;
}

// Tablet
@media screen and (min-width: 600px) {
  .cards {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
