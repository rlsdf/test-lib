module.exports = [
  {
    output: `${__dirname}/i18n/resource`,
    format: 'json',
    advanced: true,
    target: {
      service: 'LINETIMELINE-MYHOME',
      device: 'WEB BROWSER',
      subService: '3.0.0',
      filters: ['*'],
    },
  },
  {
    output: `${__dirname}/i18n/resource`,
    format: 'json',
    advanced: true,
    target: {
      service: 'TL_Creator_Studio',
      device: 'WEB BROWSER',
      subService: 'Monetization_PC',
      filters: ['*'],
    },
  },
  {
    output: `${__dirname}/i18n/resource`,
    format: 'json',
    advanced: true,
    target: {
      service: 'TL_Creator_Studio',
      device: 'WEB BROWSER',
      subService: 'Insight_PC',
      filters: ['*'],
    },
  },
  {
    output: `${__dirname}/i18n/resource`,
    format: 'json',
    advanced: true,
    target: {
      service: 'TL_Creator_Studio',
      device: 'WEB BROWSER',
      subService: 'Timeline_PC',
      filters: ['*'],
    },
  },
  {
    output: `${__dirname}/i18n/resource`,
    format: 'json',
    advanced: true,
    target: {
      service: 'TL_Creator_Studio',
      device: 'WEB BROWSER',
      subService: 'Basic_PC',
      filters: ['*'],
    },
  },
  {
    output: `${__dirname}/i18n/resource`,
    format: 'json',
    advanced: true,
    target: {
      service: 'TL_Creator_Studio',
      device: 'WEB BROWSER',
      subService: 'Common_PC',
      filters: ['*'],
    },
  },
];
