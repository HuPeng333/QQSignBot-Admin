import { sendAjax } from '@/api/Ajax.ts'

export const getSign = (): Promise<unknown> => sendAjax('/sign/getSignStatistic')
