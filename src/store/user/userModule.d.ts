import { GroupInfo } from '@/api/Response'

export interface UserState {
  level: number
  allowedGroup: Array<GroupInfo>
}
