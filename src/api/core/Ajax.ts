import axios from 'axios'
import MissionStackFactory from '@/api/core/MissionStackFactory'

// axios.defaults.baseURL = ''
class Ajax {
  /**
   * 发送ajax请求
   * @param url 请求url
   * @param param 参数
   * @param method 请求方式
   */
  public static SendAjax<T>(url: string, param?: unknown, method: 'GET' | 'POST' = 'GET'): Promise<T> {
    // 将任务入栈
    const token = MissionStackFactory.getMissionStack().addMission(url)
    return new Promise<T>((resolve, reject) => {
      if (!method || method === 'GET') {
        // GET
        axios
          .get(url, {
            params: param,
            cancelToken: token
          })
          .then((resp) => {
            if (resp.data.code === 0) {
              resolve(resp.data)
            } else {
              reject(resp.data)
            }
          })
          .catch((e) => {
            reject(e)
          })
          .finally(() => {
            // 删除任务
            MissionStackFactory.getMissionStack().deleteMission(url)
          })
      } else {
        // POST
        axios
          .post(url, param, {
            cancelToken: token
          })
          .then((resp) => {
            if (resp.data.code === 0) {
              resolve(resp.data)
            } else {
              reject(resp.data)
            }
          })
          .catch((e) => {
            reject(e)
          })
          .finally(() => {
            MissionStackFactory.getMissionStack().deleteMission(url)
          })
      }
    })
  }
}

export default Ajax.SendAjax
