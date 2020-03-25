const visas = [
  {
    name: 'Family Visa (needs expanding)',
    category: 'family',
    slug: 'family-visa'
  },
  {
    name: 'Global Talent Visa',
    category: 'business',
    slug: 'global-talent-visa'
  },
  {
    name: 'Innovator Visa',
    category: 'business',
    slug: 'innovator-visa'
  },
  {
    name: 'Startup Visa',
    category: 'business',
    slug: 'startup-visa'
  },
  {
    name: 'Tier 1 Investor Visa',
    category: 'business',
    slug: 'T1-investor'
  },
  {
    name: 'Tier 2 General Work Visa',
    category: 'work',
    slug: 'T2-general-work'
  },
  {
    name: 'Tier 2 Intra-company Transfer Graduate Trainee Visa',
    category: 'work',
    slug: 'T2-intra-company-transfer-graduate'
  },
  {
    name: 'Tier 2 Intra-company Transfer Long-term Staff Visa',
    category: 'work',
    slug: 'T2-intra-company-transfer'
  },
  {
    name: 'Tier 2 Minister of Religion Visa',
    category: 'work',
    slug: 'T2-minister-of-religion'
  },
  {
    name: 'Tier 2 Sportsperson Visa',
    category: 'work',
    slug: 'T2-sportsperson'
  },
  {
    name: 'Tier 4 General Student Visa',
    category: 'study',
    slug: 'T4-general-student'
  },
  {
    name: 'Tier 4 Short Term Study Visa',
    category: 'study',
    slug: 'T4-short-term-study'
  },
  {
    name: 'Tier 5 Charity Worker Visa',
    category: 'work',
    slug: 'T5-charity-worker'
  },
  {
    name: 'Tier 5 Creative and Sporting Visa',
    category: 'work',
    slug: 'T5-creative-and-sporting'
  },
  {
    name: 'Tier 5 Government Authorised Exchange Visa',
    category: 'work',
    slug: 'T5-gov-authorised-exchange'
  },
  {
    name: 'Tier 5 International Agreement Visa',
    category: 'work',
    slug: 'T5-international-agreement'
  },
  {
    name: 'Tier 5 Religious Worker Visa',
    category: 'work',
    slug: 'T5-religious-worker'
  },
  {
    name: 'Tier 5 Seasonal Worker Visa',
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
