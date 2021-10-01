// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Mock from 'mockjs'
import { MockType } from '@/mock/MockType'
import SignController from '@/mock/controller/SignController.ts'
import StatisticController from '@/mock/controller/StatisticController'
import UserController from '@/mock/controller/UserController'

/**
 * 加载控制器
 * @param controller 控制器
 */
const loadController = (controller: Array<MockType>) => {
  controller.forEach((mockType) => {
    Mock.mock(mockType.url, mockType.method, mockType.data)
  })
}

Mock.setup({
  timeout: '500-1000'
})

loadController(SignController)
loadController(StatisticController)
loadController(UserController)

export default Mock
