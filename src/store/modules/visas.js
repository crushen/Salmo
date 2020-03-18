const visas = [
  {
    name: 'Tier 4 General Student',
    slug: 'T4-general-student'
  },
  {
    name: 'Tier 2 General Work',
    slug: 'T2-general-work'
  }
]

export default {
  namespaced: true,
  state: {
    visaList: visas
  }
}
