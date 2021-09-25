interface ServerResponse {
  /**
   * 响应代码,0表示请求成功
   */
  code: number
  /**
   * 对相应代码的描述
   */
  message: string
}

/**
 * 获取打卡统计
 */
interface GetSignStatistic extends ServerResponse {
  data: string
}
