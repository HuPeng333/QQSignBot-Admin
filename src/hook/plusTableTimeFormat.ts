/**
 * 用于格式化时间戳
 * <b>该方法仅适用于element-plus的表格</b>
 * @param row 列
 * @param column 行
 * @param cellValue 当前表格的值
 */
export default function (row: number, column: number, cellValue: string): string {
  const date = new Date(Number.parseInt(cellValue))
  const fixZero = (num: number): string => (num < 10 ? '0' + num : num.toString())
  return `${fixZero(date.getMonth())}-${fixZero(date.getDate())} ${fixZero(date.getHours())}:${fixZero(date.getMinutes())}`
}
