import { Ref, watch } from 'vue'

type callback = () => void

/**
 * 在确保某个值存在的情况后发送相关请求,若值不存在
 * @param prop 要确保存在的值
 * @param callback 当prop存在时,会调用该函数
 */
export default function (prop: Ref, callback: callback): void {
  if (prop.value) {
    callback()
  } else {
    // 监视该属性,若值修改则调用回调
    const watchEvent = watch(prop, () => {
      if (prop.value) {
        // 停止监听
        watchEvent()
        callback()
      }
    })
  }
}
