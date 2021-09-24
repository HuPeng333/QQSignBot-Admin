export class MockType {
  public url: string
  public method: string
  public data: unknown

  constructor(url: string, data: unknown, method?: 'get' | 'post') {
    this.url = url
    this.data = data
    if (method) {
      this.method = method
    } else {
      this.method = 'get'
    }
  }
}
