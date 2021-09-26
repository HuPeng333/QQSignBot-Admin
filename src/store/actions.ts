import Type from './mutations-type'
import { ActionContext } from 'vuex'
export default {
  /**
   * 修改当前选中的群号
   * @param context context
   * @param groupCode 群号
   */
  setCurGroup(context: ActionContext<RootState, unknown>, groupCode: string): void {
    context.commit(Type.SET_CUR_GROUP, groupCode)
  }
}
