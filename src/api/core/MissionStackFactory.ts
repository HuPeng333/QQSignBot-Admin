import MissionStack from '@/api/core/MissionStack'

export default class MissionStackFactory {
  private static missionStack: MissionStack
  /**
   * 单例模式
   */
  static getMissionStack(): MissionStack {
    if (MissionStackFactory.missionStack === undefined) {
      MissionStackFactory.missionStack = new MissionStack()
    }
    return MissionStackFactory.missionStack
  }
}
