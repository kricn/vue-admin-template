import { getToken } from '@/utils/authorization';
import { jsonParse, modifyData } from '@/utils';

const cacheName = 'kch-business-admin-menu-info';

/**
 * 权限状态信息
 */
function usePermissionInfo(): Readonly<CacheMenuInfo> {
  return {
    menus: [],
    permissions: [],
    token: '',
  }
}

/**
 * 菜单权限状态模块
 */
export default class ModulePermission {
  constructor() {
    const result: CacheMenuInfo = jsonParse(sessionStorage.getItem(cacheName), {
      menus: [],
      permissions: [],
      token: ''
    });
    
    const token = getToken();

    if (result.token && result.token != token) {
      this.reset();
    } else {
      this.update(result);
    }
  }

  /** 权限信息 */
  readonly info = usePermissionInfo();

  /**
   * 更新菜单权限
   * @param value 修改的值
   */
  update(value: Partial<CacheMenuInfo>) {
    modifyData(this.info, value);
    sessionStorage.setItem(cacheName, JSON.stringify(this.info));
  }

  /** 重置菜单权限信息 */
  reset() {
    modifyData(this.info, usePermissionInfo());
    sessionStorage.removeItem(cacheName);
  }

}
