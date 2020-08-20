export default {
  namespaced: true,
  state: {
    url: 'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
    articles: []
  },
  actions: {
    async getArticles({state, commit}) {
      try {
        const response = await fetch(
          state.url, 
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetNewsArticles {
                  newsArticles {
                    id
                    colour
                    title
                    link
                    source
                    image {
                      url
                    }
                  }
                }
              `
            })
          }
        );
        const { data } = await response.json();
        commit('setArticles', data.newsArticles);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    clearArticles(state) {
      state.articles = [];
    },
    setArticles(state, articles) {
      state.articles = articles;
    }
  }
}
