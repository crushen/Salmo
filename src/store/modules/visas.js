const visas = [
  {
    name: 'Tier 5 Creative and Sporting',
    category: 'work',
    slug: 'T5-creative-and-sporting',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Government Authorised Exchange',
    category: 'work',
    slug: 'T5-gov-authorised-exchange',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 2 Intra-company Transfer',
    category: 'work',
    slug: 'T2-intra-company-transfer',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Family (needs expanding)',
    category: 'family',
    slug: 'family',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Global Talent',
    category: 'business',
    slug: 'global-talent',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Innovator',
    category: 'business',
    slug: 'innovator',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Startup',
    category: 'business',
    slug: 'startup',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 1 Investor',
    category: 'business',
    slug: 'T1-investor',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: true },
        { name: 'Extend', status: true }
        
      ]
    }
  },
  {
    name: 'Tier 2 General Work',
    category: 'work',
    slug: 'T2-general-work',
    card: {
      subTitle: 'Great for individuals who wish to start their own business in the UK.',
      checklist: [
        { name: 'Switch', status: false },
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Dependants', status: true },
        { name: 'Extend', status: false },
        { name: 'Study', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 2 Minister of Religion',
    category: 'work',
    slug: 'T2-minister-of-religion',
    card: {
      subTitle: 'Great for individuals who wish to start their own business in the UK.',
      checklist: [
        { name: 'Switch', status: false },
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Dependants', status: true },
        { name: 'Extend', status: false },
        { name: 'Study', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 2 Sportsperson',
    category: 'work',
    slug: 'T2-sportsperson',
    card: {
      subTitle: 'Great for individuals who wish to start their own business in the UK.',
      checklist: [
        { name: 'Switch', status: false },
        { name: 'ILR', status: false },
        { name: 'Work', status: true },
        { name: 'Dependants', status: true },
        { name: 'Extend', status: false },
        { name: 'Study', status: 'maybe' }
      ]
    }
  },
  {
    name: 'Tier 4 General Student',
    category: 'study',
    slug: 'T4-general-student',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 4 Short Term Study',
    category: 'study',
    slug: 'T4-short-term-study',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Charity Worker',
    category: 'work',
    slug: 'T5-charity-worker',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 International Agreement',
    category: 'work',
    slug: 'T5-international-agreement',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Religious Worker',
    category: 'work',
    slug: 'T5-religious-worker',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Seasonal Worker',
    category: 'work',
    slug: 'T5-seasonal-worker',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 5 Youth Mobility Scheme',
    category: 'youth-mobility',
    slug: 'youth-mobility-scheme',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  },
  {
    name: 'Tier 4 Child Student',
    category: 'child',
    slug: 'T4-child-student',
    card: {
      subTitle: 'Awesome for individuals who wish to invest in UK business.',
      quickTip: {
        header: 'The more you can invest in the UK, the quicker you can achieve permanent residency:',
        list: [
          'with £2 million, you will gain permanent residency in 5 years', 
          'with £5 million, you will gain permanent residency in 3 years', 
          'with £10 million, you will gain permanent residency in 2 years'
        ]
      },
      checklist: [
        { name: 'ILR', status: true },
        { name: 'Work', status: true },
        { name: 'Study', status: 'maybe' },
        { name: 'Dependants', status: true },
        { name: 'Switch', status: false },
        { name: 'Extend', status: true }
      ]
    }
  }
]

const documentChecklist = [
  {
    name: 'Tier 5 Creative and Sporting',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 5 Government Authorised Exchange',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 2 Intra-company Transfer',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Family (needs expanding)',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Global Talent',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Innovator',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Startup',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 1 Investor',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 2 General Work',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 2 Minister of Religion',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 2 Sportsperson',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 4 General Student',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 4 Short Term Study',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 5 Charity Worker',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 5 International Agreement',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 5 Religious Worker',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 5 Seasonal Worker',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 5 Youth Mobility Scheme',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  },
  {
    name: 'Tier 4 Child Student',
    checklist: [
      { 
        label: 'Current passport (or travel documentation with blank page)',
        checked: false
      },
      { 
        label: 'TB test results',
        checked: false
      },
      { 
        label: "Criminal record certificate (from any country you've been in for longer than 12 months in the last 10 years)",
        checked: false
      }
    ]
  }
]

export default {
  namespaced: true,
  state: {
    visaList: visas,
    documentChecklist: documentChecklist
  }
}
