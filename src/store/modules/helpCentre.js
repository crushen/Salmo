export default {
  namespaced: true,
  state: {
    url: 'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
    buttons: [],
    article: null
  },
  actions: {
    async getButtons({state, commit}) {
      try {
        const response = await fetch(
          state.url, 
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                {
                  helpCentreArticles {
                    title
                    slug
                    background
                    tags
                  }
                }
              `
            })
          }
        );
        const { data } = await response.json();
        commit('setButtons', data.helpCentreArticles);
      } catch(error) {
        console.log(error);
      }
    },
    async getArticle({state, commit}, slug) {
      commit('clearArticle');
      try {
        const response = await fetch(
          state.url,
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetArticle($slug: String) {
                  helpCentreArticle(where: {slug: $slug}) {
                    title
                    content {
                      html
                    }
                  }
                }
              `,
              variables: {
                slug: slug
              }
            })
          }
        );
        const { data } = await response.json();
        commit('setArticle', data.helpCentreArticle);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setButtons(state, data) {
      state.buttons = data;
    },
    clearArticle(state) {
      state.article = null;
    },
    setArticle(state, article) {
      state.article = article;
    }
  }
}
