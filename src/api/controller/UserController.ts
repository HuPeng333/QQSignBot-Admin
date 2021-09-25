import sendAjax from '../core/Ajax'

/**
 * 获取用户信息
 */
export const getUserInfo = (): Promise<ServerResponse<UserInfo>> => sendAjax<ServerResponse<UserInfo>>('/user/info')
