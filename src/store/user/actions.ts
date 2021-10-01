import { getUserInfo } from '@/api/controller/UserController'
import Type from './mutations-type'
import { ActionContext } from 'vuex'
import { UserState } from '@/store/user/userModule'
export default {
  async initUserInfo(context: ActionContext<UserState, unknown>): Promise<string> {
    return new Promise((resolve) => {
      getUserInfo().then((resp) => {
        if (resp.code === 0) {
          context.commit(Type.GET_USERINFO, resp.data)
          resolve(resp.data.allowedGroup[0].groupCode)
        }
      })
    })
  }
}
