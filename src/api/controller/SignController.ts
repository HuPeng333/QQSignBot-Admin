import sendAjax from '../core/Ajax'
import { GroupUserInfo, ServerResponse, SignStatistic } from '@/api/Response'

/**
 * 获取粗略的打卡统计
 */
interface GetSignParam {
  groupCode: string
}
export const getSign = (param: GetSignParam): Promise<ServerResponse<SignStatistic>> => sendAjax<ServerResponse<SignStatistic>>('/sign/getSignStatistic', param)

/**
 * 获取未打卡的详细成员
 */
interface getUnsignedUserParam {
  groupCode: string
}
export const getUnsignedUser = (param: getUnsignedUserParam): Promise<ServerResponse<Array<GroupUserInfo>>> =>
  sendAjax<ServerResponse<Array<GroupUserInfo>>>('/sign/getUnsignedUser', param)

/**
 * 获取已经打卡了的详细成员
 */
interface getSignedUserParam {
  groupCode: string
}
export const getSignedUser = (param: getSignedUserParam): Promise<ServerResponse<Array<GroupUserInfo>>> =>
  sendAjax<ServerResponse<Array<GroupUserInfo>>>('/sign/getSignedUser', param)

/**
 * 提醒未打卡的成员和帮助成员打卡
 */
interface SignParam {
  // 存放用户的qq号数组
  users: Array<string>
  // 当前控制的群的群号
  curGroup: string
}
// 提醒未打卡
export const tipUnsignedUsers = (param: SignParam): Promise<ServerResponse<unknown>> => sendAjax<ServerResponse<unknown>>('/sign/tip', param, 'POST')
// 帮助打卡
export const helpUsersToSign = (param: SignParam): Promise<ServerResponse<unknown>> => sendAjax<ServerResponse<unknown>>('/sign/help', param, 'POST')
