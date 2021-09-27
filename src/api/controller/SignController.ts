import sendAjax from '../core/Ajax'
import { GroupUserInfo, ServerResponse, SignStatistic } from '@/api/Response'

interface getSignParam {
  groupCode: string
}
/**
 * 获取粗略的打卡统计
 */
export const getSign = (param: getSignParam): Promise<ServerResponse<SignStatistic>> => sendAjax<ServerResponse<SignStatistic>>('/sign/getSignStatistic', param)

interface getUnsignedUserParam {
  groupCode: string
}
/**
 * 获取未打卡的详细成员
 */
export const getUnsignedUser = (param: getUnsignedUserParam): Promise<ServerResponse<Array<GroupUserInfo>>> =>
  sendAjax<ServerResponse<Array<GroupUserInfo>>>('/sign/getUnsignedUser', param)

interface getSignedUserParam {
  groupCode: string
}
export const getSignedUser = (param: getSignedUserParam): Promise<ServerResponse<Array<GroupUserInfo>>> =>
  sendAjax<ServerResponse<Array<GroupUserInfo>>>('/sign/getSignedUser', param)
