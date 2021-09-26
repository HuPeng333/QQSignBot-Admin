import Type from './mutations-type'
export default {
  [Type.SET_CUR_GROUP](state: RootState, groupCode: string): void {
    state.curGroup = groupCode
  }
}
