class Session {
  private expire = 7 * 24 * 60 * 60 * 1000 // 7天
  private suffix = 'hb-' // 前缀

  constructor(expire = 7 * 24 * 60 * 60 * 1000, suffix = 'hb-') {
    this.expire = expire
    this.suffix = suffix
  }

  public install(app: any) {
    app.config.globalProperties.$ss = this
  }

  public setItem(key: string, data: any, expire?: number): void {
    window.sessionStorage.setItem(
      this.suffix + key,
      JSON.stringify({
        value: data,
        expire:
          !expire || expire <= 0
            ? Date.now() + this.expire
            : Date.now() + expire
      })
    )
  }
  /**
   * 获取sessionStorage值
   * @param key sessionStorage.key
   * @param empty 为空的时候值
   * @returns
   */
  public getItem<T>(key: string, empty: T): T {
    const localData = JSON.parse(
      window.sessionStorage.getItem(this.suffix + key) || '{}'
    )
    // 判断过期与否
    if (Date.now() < localData.expire) {
      // 有效
      return <T>localData.value
    } else {
      // 已经过期
      this.removeItem(this.suffix + key)
      return empty
    }
  }

  removeItem(key: string): void {
    window.sessionStorage.removeItem(this.suffix + key)
  }

  clear(): void {
    window.sessionStorage.clear()
  }
}

export const session = new Session()
export default session
