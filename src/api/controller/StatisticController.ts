import sendAjax from '@/api/core/Ajax'
import { GroupStatistic, GroupStatisticInfo, ServerResponse } from '@/api/Response'

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
export const getAliveStatisticProcess = (param: groupStatisticParam): Promise<ServerResponse<GroupStatistic | null>> =>
  sendAjax<ServerResponse<GroupStatistic>>('/statistic/alive', param)

/**
 * 获取已经完成的收集任务的相关情况
 * @param param qq群号
 */
export const getFinishedStatisticProcess = (param: groupStatisticParam): Promise<ServerResponse<Array<GroupStatistic>>> =>
  sendAjax<ServerResponse<Array<GroupStatistic>>>('/statistic/finished', param)

interface GetStatisticsParam {
  /**
   * 群号
   */
  groupCode: string
  /**
   * 获取第几页的数据,注意:页数是从零开始计算
   */
  page?: number
}
/**
 * 获取已经收集完毕的收集列表
 */
export const getStatistics = (param: GetStatisticsParam): Promise<ServerResponse<Array<GroupStatistic>>> =>
  sendAjax<ServerResponse<Array<GroupStatistic>>>('/statistic/list', param)

/**
 * 获取收集最大可用分页数,一页的数据最多12行, 分页最小可以用0,最大不包含Max[0, Max)
 * @return {Promise<number>} 最大可用分页数,不包含该值,如返回1,则表示只有一页数据可用
 */
export const getMaxStatisticPageLength = (param: groupStatisticParam): Promise<ServerResponse<number>> =>
  sendAjax<ServerResponse<number>>('/statistic/max', param)

/**
 * 获取某条统计的详细信息
 * @param id
 */
export const getStatisticDetail = (id: number): Promise<ServerResponse<GroupStatisticInfo>> =>
  sendAjax<ServerResponse<GroupStatisticInfo>>('/statistic/detail', { id })

/**
 * 停止收集
 * @param id 收集的id
 */
export const stopStatistic = (id: number): Promise<ServerResponse<unknown>> => sendAjax<ServerResponse<unknown>>('/statistic/stop', { id }, 'POST')
