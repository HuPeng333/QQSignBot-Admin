import axios, { CancelToken, CancelTokenSource } from 'axios'

export default class MissionStack {
  private stackMap: Map<string, CancelTokenSource> = new Map<string, CancelTokenSource>()

  /**
   * 生产axios令牌,用于终止任务
   * @private
   */
  private static token = axios.CancelToken

  /**
   * 添加一个请求到栈中,并且停止之前相同的请求
   * @param path 请求路径
   * @return 该请求的token
   */
  public addMission(path: string): CancelToken {
    const tokenSource = MissionStack.token.source()
    const source = this.stackMap.get(path)
    if (source) {
      // task存在,删除该任务
      source.cancel('no repeat mission')
    }
    // 添加该请求到栈中
    this.stackMap.set(path, tokenSource)
    return tokenSource.token
  }

  /**
   * 删除一个栈中请求
   * 一般在任务完成后删除
   * @param path 请求路径
   */
  public deleteMission(path: string): void {
    this.stackMap.delete(path)
  }
}
