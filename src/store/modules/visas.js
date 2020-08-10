import { documentChecklist } from '@/assets/js/documentChecklist';

export default {
  namespaced: true,
  state: {
    url: 'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
    visaList: [],
    visa: null,
    documentChecklist: documentChecklist
  },
  actions: {
    async getVisas({state, commit}, category) {
      try {
        const response = await fetch(
          state.url, 
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetVisas($category: String) {
                  visas(where: {category: $category}) {
                    name
                    slug
                    subtitle
                    category
                    cardChecklist {
                      label
                      state
                    }
                    quicktip {
                      html
                    }
                  }
                }
              `,
              variables: {
                category: category
              }
            })
          }
        );
        const { data } = await response.json();
        commit('setVisas', data.visas);
      } catch(error) {
        console.log(error);
      }
    },
    async getVisa({state, commit}, slug) {
      commit('clearVisa');
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
                    sections {
                      id
                      title
                      slug
                      subsections {
                        id
                        title
                        slug
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
        commit('setVisa', data.visa);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setVisas(state, visas) {
      state.visaList = visas;
    },
    clearVisa(state) {
      state.visa = null;
    },
    setVisa(state, visa) {
      state.visa = visa;
    }
  }
}
