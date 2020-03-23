const visas = [
  {
    name: 'Tier 4 General Student Visa',
    slug: 'T4-general-student'
  },
  {
    name: 'Tier 2 General Work Visa',
    slug: 'T2-general-work'
  },
  {
    name: 'Tier 4 Short Term Study Visa',
    slug: 'T4-short-term-study'
  },
  {
    name: 'Family Visa - Apply on the basis of your private life',
    slug: 'family-visa'
  }
]

export default {
  namespaced: true,
  state: {
    visaList: visas
  }
}
