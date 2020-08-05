//import { helpPages } from '@/assets/js/helpCentreArticles'

export default {
  namespaced: true,
  state: {
    helpCentreArticles: []
  },
  actions: {
    async getArticles({commit}) {
      try {
        const response = await fetch(
          'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
          {
            method: 'POST',
            body: JSON.stringify({
              query: `{ helpCentreArticles { title slug background tags } }`,
            }),
          }
        );
        const { data } = await response.json();
        commit('setArticles', data.helpCentreArticles)
      } catch(e) {
        console.log(e)
      }
    }
  },
  mutations: {
    setArticles(state, data) {
      state.helpCentreArticles = data;
    }
  }
}
