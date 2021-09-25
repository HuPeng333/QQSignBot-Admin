import { MockType } from '@/mock/MockType'

export default [
  new MockType<GetSignStatistic>('/sign/getSignStatistic', {
    code: 0,
    message: 'ok',
    data: 'hello world'
  })
]
