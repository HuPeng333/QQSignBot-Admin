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
        lastSign: /163273\d{7}/
      }
    ]
  }),
  new MockType(/\/sign\/getSignedUser\?groupCode=\d+/, {
    code: 0,
    message: 'ok',
    'data|5-30': [
      {
        qq: /\d{10}/,
        nickName: '@first',
        lastSign: /163275\d{7}/
      }
    ]
  }),
  new MockType(
    '/sign/tip',
    {
      code: 0,
      message: '请求成功'
    },
    'post'
  ),
  new MockType(
    '/sign/help',
    {
      code: 0,
      message: '请求成功'
    },
    'post'
  )
]
