import sendAjax from '../core/Ajax'
import { ServerResponse, UserInfo } from '@/api/Response'

/**
 * 获取用户信息
 */
export const getUserInfo = (): Promise<ServerResponse<UserInfo>> => sendAjax<ServerResponse<UserInfo>>('/user/info')
