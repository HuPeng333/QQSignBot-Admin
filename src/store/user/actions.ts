import { getUserInfo } from '@/api/controller/UserController'
import Type from './mutations-type'
import { ActionContext } from 'vuex'
export default {
  initUserInfo(context: ActionContext<UserState, unknown>): void {
    getUserInfo().then((resp) => {
      if (resp.code === 0) {
        context.commit(Type.GET_USERINFO, resp.data)
      }
    })
  }
}
