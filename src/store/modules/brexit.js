import { documentChecklist } from '@/assets/js/documentChecklist';

export default {
  namespaced: true,
  state: {
    url: 'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
    brexitPage: null
  },
  actions: {
    async getBrexitPage({state, commit}, slug) {
      try {
        const response = await fetch(
          state.url,
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetVisa($slug: String) {
                  visa(where: {slug: $slug}) {
                    name
                    subtitle
                    slug
                    sections {
                      id
                      title
                      subsections {
                        id
                        title
                        slug
                        content {
                          html
                        }
                      }
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
        commit('setBrexitPage', data.visa);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setBrexitPage(state, visa) {
      state.brexitPage = visa;
    }
  }
}
