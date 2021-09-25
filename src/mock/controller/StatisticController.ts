import { MockType } from '@/mock/MockType'
import { randomInteger, randomString } from '@/mock/Random'

export default [
  new MockType<AliveGroupStatistic>(/\/statistic\/alive\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    data: {
      name: randomString(),
      submitCount: randomInteger(0, 10),
      totalCount: randomInteger(10, 30)
    }
  }),
  new MockType<FinishedGroupStatistic>(/\/statistic\/finished\?groupCode=\d+/, {
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
  })
]
