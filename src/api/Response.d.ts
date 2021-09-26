interface ServerResponse<T> {
  /**
   * 响应代码,0表示请求成功
   */
  code: number
  /**
   * 对相应代码的描述
   */
  message: string
  /**
   * 装载的数据
   */
  data: T
}

/**
 * 获取打卡统计
 */
interface SignStatistic {
  /**
   * 打卡人数
   */
  signCount: number
  /**
   * 总人数
   */
  totalCount: number
}

interface GroupStatistic {
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

interface GroupInfo {
  groupName: string
  groupCode: string
}

interface UserInfo {
  level: number
  allowedGroup: Array<GroupInfo>
}
