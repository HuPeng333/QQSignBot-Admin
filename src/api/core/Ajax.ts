import axios from 'axios'
import MissionStackFactory from '@/api/core/MissionStackFactory'

/**
 * 发送ajax请求
 * @param url 请求url
 * @param param 参数
 * @param method 请求方式
 */
const sendAjax = <T>(url: string, param?: unknown, method: 'GET' | 'POST' = 'GET'): Promise<T> => {
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
          resolve(resp.data)
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
      const data = new URLSearchParams()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.keys(param).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.append(key, <string>param[key])
      })
      axios
        .post(url, data, {
          cancelToken: token
        })
        .then((resp) => {
          resolve(resp.data)
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

export default sendAjax
