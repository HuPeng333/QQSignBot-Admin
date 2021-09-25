import { MockType } from '@/mock/MockType'
import { randomInteger } from '@/mock/Random'

export default [
  new MockType<ServerResponse<UserInfo>>('/user/info', {
    code: 0,
    message: 'ok',
    data: {
      level: 3,
      allowedGroup: [randomInteger(100, 1000000).toString(), randomInteger(100, 1000000).toString(), randomInteger(100, 1000000).toString()]
    }
  })
]
