import { MockType } from '@/mock/MockType'
import { randomInteger } from '@/mock/Random'

export default [
  new MockType(/\/sign\/getSignStatistic\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    data: {
      signCount: randomInteger(0, 10),
      totalCount: randomInteger(10, 30)
    }
  }),
  new MockType(/\/sign\/getUnsignedUser\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    'data|5-30': [
      {
        qq: /\d{10}/,
        nickName: '@first',
        lastSign: '@datetime(T)'
      }
    ]
  })
]
