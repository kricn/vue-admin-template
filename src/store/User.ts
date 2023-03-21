import { getToken } from '@/utils/authorization';
import { reactive } from 'vue';
import { UserInfo } from '../types/user';
import { jsonParse, modifyData } from '../utils';

const cacheName = 'ModuleUser';

function useUserInfo(): Readonly<UserInfo> {
  return {
    id: '',
    phone: '',
    avatar: '',
    sex: '',
    username: '',
    token: '',
    roleList: [],
  }
}

/**
 * 用户状态模块
 */
export default class ModuleUser {
  constructor() {
  }

  /** 用户信息（包含登录状态） */
  readonly info = reactive(useUserInfo());

  /**
   * 更新（设置）当前的用户信息并缓存到本地
   * @param value 要更新的值
   */
  update(value: Partial<UserInfo>) {
    modifyData(this.info, value);
    sessionStorage.setItem(cacheName, JSON.stringify(this.info));
  }

  /** 重置（清空）用户信息缓存信息 */
  reset() {
    modifyData(this.info, useUserInfo());
    sessionStorage.removeItem(cacheName);
  }

}
