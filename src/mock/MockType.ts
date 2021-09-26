export class MockType {
  public url: string | RegExp
  public method: string
  public data: unknown

  constructor(url: string | RegExp, data?: unknown, method: 'get' | 'post' = 'get') {
    this.url = url
    this.data = data
    this.method = method
  }
}
