interface Response {
  code: number
  message: string
}

type Collection = {
  id: number
  groupCode: string
  name: string
  active: boolean
}

declare interface FinishedCollection extends Response {
  data: Array<Collection>
}
