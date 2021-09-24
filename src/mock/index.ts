// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Mock from 'mockjs'
import { MockType } from '@/mock/MockType'
import SignController from '@/mock/SignController.ts'

const loadController = (controller: Array<MockType>) => {
  controller.forEach((mockType) => {
    Mock.mock(mockType.url, mockType.method, mockType.data)
  })
}

loadController(SignController)

export default Mock
