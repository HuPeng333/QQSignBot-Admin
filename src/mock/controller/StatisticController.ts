import { MockType } from '@/mock/MockType'
import { randomInteger, randomString } from '@/mock/Random'

export default [
  new MockType(/\/statistic\/alive\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    data: {
      name: randomString(),
      submitCount: randomInteger(0, 10),
      totalCount: randomInteger(10, 30),
      'id|0-100': 100,
      startTime: /1632\d{9}/
    }
  }),
  new MockType(/\/statistic\/finished\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    data: [
      {
        name: randomString(),
        submitCount: randomInteger(0, 10),
        totalCount: randomInteger(10, 30)
      },
      {
        name: randomString(),
        submitCount: randomInteger(0, 10),
        totalCount: randomInteger(10, 30)
      },
      {
        name: randomString(),
        submitCount: randomInteger(0, 10),
        totalCount: randomInteger(10, 30)
      }
    ]
  }),
  new MockType(/\/statistic\/list\?\w+/, {
    code: 0,
    message: 'ok',
    'data|12': [
      {
        name: '@first',
        'totalCount|20-30': 10,
        'submitCount|0-20': 20,
        'id|0-100': 100,
        startTime: /1632\d{9}/
      }
    ]
  }),
  new MockType(/\/statistic\/max\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    'data|1-20': 20
  }),
  new MockType(/\/statistic\/detail\?\w+/, {
    code: 0,
    message: 'ok',
    data: {
      name: '@first',
      'id|0-100': 100,
      'submittedData|1-10': [
        {
          text: '@title(5)',
          submitTime: /1632\d{9}/,
          qq: /\d{10}/
        }
      ],
      'uncommittedUsers|1-10': [
        {
          qq: /\d{10}/,
          nickName: '@first'
        }
      ]
    }
  }),
  new MockType(
    '/statistic/stop',
    {
      code: 0,
      message: 'ok'
    },
    'post'
  )
]
