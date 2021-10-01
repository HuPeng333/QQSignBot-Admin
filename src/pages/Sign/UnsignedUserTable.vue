<template>
  <div class="unsigned-user">
    <div class="sign-h2-title" ref="test">
      <span>未打卡成员</span>
    </div>
    <el-table
      class="sign-table"
      :data="unsignedGroupUser"
      :cell-style="{ padding: '5px 0' }"
      ref="unsignedUsersTable"
      @selection-change="handleUnsignedSelectEvent"
      @row-click="fastSelectUnsigned"
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="QQ" prop="qq"></el-table-column>
      <el-table-column label="昵称" prop="nickName"></el-table-column>
      <el-table-column label="上次打卡时间" prop="lastSign" :formatter="plusTableTimeFormat"></el-table-column>
    </el-table>
    <div class="sign-buttons">
      <el-button type="warning" round :disabled="selectedUnsignedUser.length === 0" @click="showTipUnsignedDialog = true">提醒打卡</el-button>
      <el-button type="success" round :disabled="selectedUnsignedUser.length === 0" @click="showHelpSignDialog = true">手动帮TA打卡</el-button>
    </div>
  </div>
  <!-- 提醒打卡的对话框 -->
  <el-dialog v-model="showTipUnsignedDialog" title="提醒打卡" :lock-scroll="false" destroy-on-close>
    <div>
      <span>将提醒以下人员的打卡情况</span>
    </div>
    <br />
    <div class="sign-decoration">
      <span>(机器人将会在群里at这些人)</span>
    </div>
    <ul class="sign-user-list">
      <!-- 最多显示15个人,防止屏幕放不下 -->
      <li v-for="(item, index) in selectedUnsignedUser.slice(0, 15)" :key="index">{{ item.qq }}({{ item.nickName }})</li>
      <li v-if="selectedUnsignedUser.length > 15">......</li>
    </ul>
    <div v-if="selectedUnsignedUser.length > 15" class="sign-decoration">
      <span>由于显示的人数过多,部分成员已经被隐藏</span>
    </div>
    <template #footer>
      <el-button type="primary" @click="sendTipRequest">确定</el-button>
      <el-button type="info" @click="showTipUnsignedDialog = false">取消</el-button>
    </template>
  </el-dialog>
  <!-- 帮助打卡的对话框 -->
  <el-dialog v-model="showHelpSignDialog" title="帮助打卡" :lock-scroll="false" destroy-on-close>
    <div>
      <span>将帮助以下人员打卡</span>
    </div>
    <br />
    <div class="sign-decoration">
      <span>该方案操作主要用于机器人出BUG后的应急操作!</span>
    </div>
    <ul class="sign-user-list">
      <!-- 最多显示15个人,防止屏幕放不下 -->
      <li v-for="(item, index) in selectedUnsignedUser.slice(0, 15)" :key="index">{{ item.qq }}({{ item.nickName }})</li>
      <li v-if="selectedUnsignedUser.length > 15">......</li>
    </ul>
    <div v-if="selectedUnsignedUser.length > 15" class="sign-decoration">
      <span>由于显示的人数过多,部分成员已经被隐藏</span>
    </div>
    <template #footer>
      <el-button type="primary" @click="helpSign">确定</el-button>
      <el-button type="info" @click="showHelpSignDialog = false">取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import { GroupUserInfo } from '@/api/Response'
import { ElLoading, ElMessage, ElTable, ElButton, ElDialog, ElTableColumn } from 'element-plus'
import { getUnsignedUser, helpUsersToSign, tipUnsignedUsers } from '@/api/controller/SignController'
import { useStore } from 'vuex'
import safetyAjax from '@/hook/safetyAjax'
import plusTableTimeFormat from '@/hook/plusTableTimeFormat'

export default defineComponent({
  name: 'UnsignedUserTable',
  components: {
    ElTable,
    ElButton,
    ElDialog,
    ElTableColumn
  },
  setup() {
    const store = useStore()
    /**
     * ===========发送ajax,获取未打卡成员===========
     */
    // 当前选中的组
    const curGroup = toRef(useStore().state, 'curGroup')
    // 已经打卡的成员
    const unsignedGroupUser = ref<Array<GroupUserInfo>>([])
    // 发送请求获取未打卡成员
    const getUnsignedUserFun = () => {
      getUnsignedUser({ groupCode: curGroup.value }).then((resp) => {
        if (resp.code === 0) {
          unsignedGroupUser.value = resp.data
        } else {
          ElMessage.error?.(resp.message)
        }
      })
    }
    safetyAjax(curGroup, getUnsignedUserFun)
    /**
     * ===========未打卡表格相关逻辑===========
     */
    // 未打卡成员表格的ref
    const unsignedUsersTable = ref()
    // 被选中的未打卡成员
    const selectedUnsignedUser = ref<Array<GroupUserInfo>>([])
    // 处理选中事件
    const handleUnsignedSelectEvent = (val: Array<GroupUserInfo>) => {
      selectedUnsignedUser.value = val
    }
    // 点击单元格时,快速选中或剔除用户
    const fastSelectUnsigned = (row: number) => unsignedUsersTable.value.toggleRowSelection(row)

    /**
     * 对话框和ajax请求
     */
    // 是否显示提醒打卡对话框
    const showTipUnsignedDialog = ref(false)

    // 发送提醒打卡请求
    const sendTipRequest = () => {
      const loading = ElLoading.service({ fullscreen: true })
      // 拷贝qq
      const users = sliceQQInGroup(selectedUnsignedUser.value)
      tipUnsignedUsers({ users, curGroup: store.state.curGroup })
        .then((resp) => {
          if (resp.code === 0) {
            ElMessage.success?.(resp.message)
          } else {
            ElMessage.error?.(resp.message)
          }
          // 清空选中的人
          unsignedUsersTable.value.clearSelection()
        })
        .catch(() => {
          ElMessage.error?.('服务器繁忙,请稍后重试')
        })
        .finally(() => {
          // 关闭加载
          loading.close()
          // 关闭对话框
          showTipUnsignedDialog.value = false
        })
    }

    // 是否显示帮助打卡对话框
    const showHelpSignDialog = ref(false)
    // 帮助打卡
    const helpSign = () => {
      const loading = ElLoading.service({ fullscreen: true })
      // 拷贝qq
      const users = sliceQQInGroup(selectedUnsignedUser.value)
      helpUsersToSign({ users, curGroup: store.state.curGroup })
        .then((resp) => {
          if (resp.code === 0) {
            ElMessage.success?.(resp.message)
            // 已经帮忙打卡了,清除选择的人
            selectedUnsignedUser.value.forEach((value) => {
              for (let i = 0, len = unsignedGroupUser.value.length; i < len; i++) {
                if (value.qq === unsignedGroupUser.value[i].qq) {
                  // 删除
                  unsignedGroupUser.value.splice(i, 1)
                  break
                }
              }
            })
          } else {
            ElMessage.error?.(resp.message)
          }
          // 清空选中的人
          unsignedUsersTable.value.clearSelection()
        })
        .catch(() => {
          ElMessage.error?.('服务器繁忙,请稍后重试')
        })
        .finally(() => {
          // 关闭加载
          loading.close()
          // 关闭对话框
          showHelpSignDialog.value = false
        })
    }
    /**
     * ===========一些通用方法===========
     *
     */
    // 提取GroupUserInfo的QQ
    const sliceQQInGroup = (array: Array<GroupUserInfo>): Array<string> => {
      const qqArray: string[] = []
      array.forEach((value) => {
        qqArray.push(value.qq)
      })
      return qqArray
    }
    return {
      handleUnsignedSelectEvent,
      fastSelectUnsigned,
      sendTipRequest,
      unsignedGroupUser,
      selectedUnsignedUser,
      showTipUnsignedDialog,
      unsignedUsersTable,
      showHelpSignDialog,
      helpSign,
      plusTableTimeFormat
    }
  }
})
</script>

<style lang="scss">
.sign-user-list {
  font-size: 14px;
  color: $color-info;
  > li {
    margin: 6px 0;
  }
}
.sign-buttons {
  margin: 20px 0;
}
.sign-table {
  margin-top: 10px;
}
</style>
