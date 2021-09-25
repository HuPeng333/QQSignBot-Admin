export class MockType<T extends ServerResponse> {
  public url: string | RegExp
  public method: string
  public data: unknown

  constructor(url: string | RegExp, data?: T, method: 'get' | 'post' = 'get') {
    this.url = url
    this.data = data
    this.method = method
  }
}
