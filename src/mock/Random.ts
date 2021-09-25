/**
 * 获取随机整数,最小值和最大值都可能会取到
 * @param min 最小值
 * @param max 最大值
 */
export const randomInteger = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min)

/**
 * 获取随机字符串
 * @param length 字符串的长度
 */
export const randomString = (length = 10): string => {
  let str = Math.random().toString(36).substring(2)
  while (str.length < length) {
    str = Math.random().toString(36).substring(2)
  }
  return str.substring(0, length)
}
