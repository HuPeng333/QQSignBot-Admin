export interface ServerResponse<T> {
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
export interface SignStatistic {
  /**
   * 打卡人数
   */
  signCount: number
  /**
   * 总人数
   */
  totalCount: number
}

export interface GroupStatistic {
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
  /**
   * 该收集的id
   */
  id: number
  /**
   * 开始时间
   */
  startTime: string
}

export interface GroupInfo {
  groupName: string
  groupCode: string
}

/**
 * 当前登录的用户信息
 */
export interface UserInfo {
  level: number
  allowedGroup: Array<GroupInfo>
}

/**
 * 群成员打卡的信息
 */
export interface GroupUserInfo {
  qq: string
  nickName: string
  /**
   * 上次打卡时间(时间戳)
   */
  lastSign: string
}

export interface StatisticData {
  /**
   * 群收集回复的内容
   */
  text: string
  /**
   * 提交的时间戳
   */
  submitTime: string
  /**
   * 提交用户的qq
   */
  qq: string
}

/**
 * 群收集的详细信息
 */
export interface GroupStatisticInfo {
  id: number
  name: string
  submittedData: Array<StatisticData>
  /**
   * 未提交的用户
   */
  uncommittedUsers: Array<GroupUserInfo>
}
