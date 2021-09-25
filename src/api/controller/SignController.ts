import sendAjax from '../core/Ajax'

export const getSign = (): Promise<ServerResponse<SignStatistic>> => sendAjax<ServerResponse<SignStatistic>>('/sign/getSignStatistic')
