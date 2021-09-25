import sendAjax from '../core/Ajax'

export const getSign = (): Promise<GetSignStatistic> => sendAjax<GetSignStatistic>('/sign/getSignStatistic')
