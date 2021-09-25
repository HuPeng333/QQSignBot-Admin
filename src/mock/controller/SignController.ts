import { MockType } from '@/mock/MockType'
import { randomInteger } from '@/mock/Random'

export default [
  new MockType<GetSignStatistic>('/sign/getSignStatistic', {
    code: 0,
    message: 'ok',
    data: {
      signCount: randomInteger(0, 10),
      totalCount: randomInteger(10, 30)
    }
  })
]
