const visas = [
  {
    name: 'Tier 5 Creative and Sporting',
    category: 'work',
    slug: 'T5-creative-and-sporting'
  },
  {
    name: 'Tier 5 Government Authorised Exchange',
    category: 'work',
    slug: 'T5-gov-authorised-exchange'
  },
  {
    name: 'Tier 2 Intra-company Transfer',
    category: 'work',
    slug: 'T2-intra-company-transfer'
  },
  {
    name: 'Family (needs expanding)',
    category: 'family',
    slug: 'family'
  },
  {
    name: 'Global Talent',
    category: 'business',
    slug: 'global-talent'
  },
  {
    name: 'Innovator',
    category: 'business',
    slug: 'innovator'
  },
  {
    name: 'Startup',
    category: 'business',
    slug: 'startup',
    card: {
      subTitle: 'Great for individuals who wish to start their own business in the UK.',
      checklist: [
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Dependants', status: true },
        { name: 'Extend', status: false },
        { name: 'Study', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 1 Investor',
    category: 'business',
    slug: 'T1-investor',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Dependants', status: false }, // actually true, this is just for testing
        { name: 'Extend', status: true },
        { name: 'Study', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 2 General Work',
    category: 'work',
    slug: 'T2-general-work'
  },
  {
    name: 'Tier 2 Minister of Religion',
    category: 'work',
    slug: 'T2-minister-of-religion'
  },
  {
    name: 'Tier 2 Sportsperson',
    category: 'work',
    slug: 'T2-sportsperson'
  },
  {
    name: 'Tier 4 General Student',
    category: 'study',
    slug: 'T4-general-student'
  },
  {
    name: 'Tier 4 Short Term Study',
    category: 'study',
    slug: 'T4-short-term-study'
  },
  {
    name: 'Tier 5 Charity Worker',
    category: 'work',
    slug: 'T5-charity-worker'
  },
  {
    name: 'Tier 5 International Agreement',
    category: 'work',
    slug: 'T5-international-agreement'
  },
  {
    name: 'Tier 5 Religious Worker',
    category: 'work',
    slug: 'T5-religious-worker'
  },
  {
    name: 'Tier 5 Seasonal Worker',
    category: 'work',
    slug: 'T5-seasonal-worker'
  },
  {
    name: 'Tier 5 Youth Mobility Scheme',
    category: 'youth-mobility',
    slug: 'youth-mobility-scheme'
  }
]

export default {
  namespaced: true,
  state: {
    visaList: visas
  }
}
