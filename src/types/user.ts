/**
 * 用户信息
 */
export interface UserInfo {
  id: number | string
  /** 用户名 */
  username: string
  /** 手机号 */
  phone: string
  /** 头像 */
  avatar: string
  /** 1:男；2:女 */
  sex: number | ''
  /** 设置一个`token`用来初始化判断是否和`cookie`中的不一致 */
  token: string
  /** 角色列表 */
  roleList: Array<string>
}

