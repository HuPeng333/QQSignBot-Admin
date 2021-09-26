import sendAjax from '../core/Ajax'

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
 * 获取详细的打卡统计
 */
export const getUnsignedUser = (param: getUnsignedUserParam): Promise<ServerResponse<Array<GroupUserInfo>>> =>
  sendAjax<ServerResponse<Array<GroupUserInfo>>>('/sign/getUnsignedUser', param)
