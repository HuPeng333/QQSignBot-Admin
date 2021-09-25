import sendAjax from '@/api/core/Ajax'

type groupStatisticParam = {
  /**
   * 群号
   */
  groupCode: string
}
/**
 * 获取当前正在激活中的收集任务情况
 * @param param qq群号
 */
export const getAliveGroupStatistic = (param: groupStatisticParam): Promise<AliveGroupStatistic> =>
  sendAjax<AliveGroupStatistic>('/statistic/alive', param, 'GET')

/**
 * 获取已经完成的收集任务的相关情况
 * @param param qq群号
 */
export const getFinishedStatistic = (param: groupStatisticParam): Promise<FinishedGroupStatistic> =>
  sendAjax<FinishedGroupStatistic>('/statistic/finished', param, 'GET')
