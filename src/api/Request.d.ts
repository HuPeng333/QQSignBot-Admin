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
  data: {
    /**
     * 打卡人数
     */
    signCount: number
    /**
     * 总人数
     */
    totalCount: number
  }
}

type groupStatistic = {
  /**
   * 收集名称
   */
  name: string
  /**
   * 一共要收集总人数
   */
  totalCount: number
  /**
   * 已经提交的人数
   */
  submitCount: number
}
/**
 * 获取当前正激活的群收集任务
 */
interface AliveGroupStatistic extends ServerResponse {
  data: groupStatistic
}

/**
 * 获取已经结束的收集任务
 */
interface FinishedGroupStatistic extends ServerResponse {
  data: Array<groupStatistic>
}
