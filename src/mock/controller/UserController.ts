import { MockType } from '@/mock/MockType'
import { randomInteger, randomString } from '@/mock/Random'

export default [
  new MockType<ServerResponse<UserInfo>>('/user/info', {
    code: 0,
    message: 'ok',
    data: {
      level: 3,
      allowedGroup: [
        {
          groupName: randomString(8),
          groupCode: randomInteger(1000, 1000000).toString()
        },
        {
          groupName: randomString(8),
          groupCode: randomInteger(1000, 1000000).toString()
        },
        {
          groupName: randomString(8),
          groupCode: randomInteger(1000, 1000000).toString()
        }
      ]
    }
  })
]
