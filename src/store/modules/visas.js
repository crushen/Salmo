import { documentChecklist } from '@/assets/js/documentChecklist';

export default {
  namespaced: true,
  state: {
    url: 'https://api-eu-central-1.graphcms.com/v2/ckcxaziyh148x01usg2uiehoe/master',
    visaList: [],
    visa: null,
    favoriteVisa: null,
    topResult: null,
    documentChecklist: documentChecklist
  },
  actions: {
    async getAllVisas({state, commit}) {
      commit('clearVisas');
      try {
        const response = await fetch(
          state.url, 
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetAllVisas {
                  visas {
                    name
                    slug
                    subtitle
                    category
                    cardChecklist {
                      label
                      state
                    }
                  }
                }
              `
            })
          }
        );
        const { data } = await response.json();
        commit('setAllVisas', data.visas);
      } catch(error) {
        console.log(error);
      }
    },
    async getVisas({state, commit}, category) {
      commit('clearVisas');
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
                    category
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
        commit('setVisa', data.visa);
      } catch(error) {
        console.log(error);
      }
    },
    async getFaveVisa({state, commit}, name) {
      commit('clearVisa');
      try {
        const response = await fetch(
          state.url,
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetVisa($name: String) {
                  visa(where: {name: $name}) {
                    name
                    slug
                    subtitle
                    category
                    cardChecklist {
                      label
                      state
                    }
                  }
                }
              `,
              variables: {
                name: name
              }
            })
          }
        );
        const { data } = await response.json();
        commit('setFavoriteVisa', data.visa);
      } catch(error) {
        console.log(error);
      }
    },
    async getTopResult({state, commit}, name) {
      commit('clearVisa');
      try {
        const response = await fetch(
          state.url,
          {
            method: 'POST',
            body: JSON.stringify({
              query: `
                query GetVisa($name: String) {
                  visa(where: {name: $name}) {
                    name
                    slug
                    subtitle
                    category
                    cardChecklist {
                      label
                      state
                    }
                  }
                }
              `,
              variables: {
                name: name
              }
            })
          }
        );
        const { data } = await response.json();
        commit('setTopResult', data.visa);
      } catch(error) {
        console.log(error);
      }
    }
  },
  mutations: {
    setAllVisas(state, visas) {
      state.visaList = visas;
    },
    setVisas(state, visas) {
      state.visaList = visas;
    },
    clearVisas(state) {
      state.visaList = [];
    },
    clearVisa(state) {
      state.visa = null;
      state.favoriteVisa = null;
      state.topResult = null;
    },
    setVisa(state, visa) {
      state.visa = visa;
    },
    setFavoriteVisa(state, visa) {
      state.favoriteVisa = visa;
    },
    setTopResult(state, visa) {
      state.topResult = visa;
    }
  }
}
