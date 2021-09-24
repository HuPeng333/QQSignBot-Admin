import axios, { CancelTokenSource } from 'axios'

// axios.defaults.baseURL = ''
axios.interceptors.response.use((resp) => {
  MissionStackFactory.getMissionStack().deleteMission(<string>resp.config.url)
  return resp
})
class Ajax {
  public static SendAjax(url: string, param?: unknown, method?: 'GET' | 'POST'): Promise<unknown> {
    // 生产token
    const source = MissionStackFactory.getSource()
    // 将任务入栈
    MissionStackFactory.getMissionStack().addMission(url, source)
    return new Promise<unknown>((resolve, reject) => {
      if (!method || method === 'GET') {
        // GET
        axios
          .get(url, {
            params: param,
            cancelToken: source.token
          })
          .then((resp) => {
            if (resp.data.code === 0) {
              resolve(resp.data)
            } else {
              reject(resp.data)
            }
          })
          .catch((e) => {
            MissionStackFactory.getMissionStack().deleteMission(url)
            reject(e)
          })
      } else {
        // POST
        axios
          .post(url, param, {
            cancelToken: source.token
          })
          .then((resp) => {
            if (resp.data.code === 0) {
              resolve(resp.data)
            } else {
              reject(resp.data)
            }
          })
          .catch((e) => {
            MissionStackFactory.getMissionStack().deleteMission(url)
            reject(e)
          })
      }
    })
  }
}

class MissionStack {
  private stackMap: Map<string, CancelTokenSource> = new Map<string, CancelTokenSource>()

  /**
   * 添加一个请求到栈中
   * @param path 请求路径
   * @param token token
   */
  public addMission(path: string, token: CancelTokenSource) {
    console.log(this.stackMap)
    const source = this.stackMap.get(path)
    if (source) {
      // task存在,删除该任务
      source.cancel('no repeat mission')
    }
    // 重新发送请求
    this.stackMap.set(path, token)
  }

  /**
   * 删除一个栈中请求
   * 一般在任务完成后删除
   * @param path 请求路径
   */
  public deleteMission(path: string) {
    this.stackMap.delete(path)
  }
}

class MissionStackFactory {
  private static missionStack: MissionStack
  /**
   * 生产axios令牌,用于终止任务
   * @private
   */
  private static token = axios.CancelToken
  /**
   * 单例模式
   */
  static getMissionStack(): MissionStack {
    if (MissionStackFactory.missionStack === undefined) {
      MissionStackFactory.missionStack = new MissionStack()
    }
    return MissionStackFactory.missionStack
  }

  /**
   * 生成一个token
   */
  static getSource(): CancelTokenSource {
    return MissionStackFactory.token.source()
  }
}

export const sendAjax = Ajax.SendAjax
