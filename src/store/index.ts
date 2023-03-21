import ModuleUser from './User';
import ModuleLayout from './Layout';
import ModulePermission from './Permission';

class ModuleStore {
  constructor() {
    console.log("%c ModuleStore init", "color: #409EFF");
  }

  /** 项目信息 */
  readonly projectInfo = {
    title: '业务中心',
    name: '业务中心后台管理平台',
    logo: 'https://hk.boshiyun.com.cn/static/img/boshiyun.35582c0c.png',
    link: 'https://github.com/Hansen-hjs/vue-admin'
  }

  get images() {
    return {
      defaultAvatar: 'https://doctor-filemanager.oss-cn-beijing.aliyuncs.com/common/default-avatar_9opr7p.png'
    }
  }

  /** `layout`状态模块 */
  readonly layout = new ModuleLayout();

  /** 用户状态模块 */
  readonly user = new ModuleUser();

  /** 菜单权限状态 */
  readonly permission = new ModulePermission();
  
}

/**
 * 状态管理模块
 * - `OOP`单例设计模式
 * - 参考 [你不需要`Vuex`](https://juejin.cn/post/6844903904023429128)
 */
const Global = new ModuleStore();

export default Global;