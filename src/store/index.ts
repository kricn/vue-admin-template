import ModuleUser from './User';
import ModuleLayout from './Layout';

class ModuleStore {
  constructor() {
    console.log("%c ModuleStore init", "color: #409EFF");
  }

  /** 项目信息 */
  readonly projectInfo = {
    title: 'vue3 后台模板',
    name: 'vue3 后台模板',
    logo: '',
    link: 'https://github.com/kricn/vue-admin-template'
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
  
}

/**
 * 状态管理模块
 * - `OOP`单例设计模式
 * - 参考 [你不需要`Vuex`](https://juejin.cn/post/6844903904023429128)
 */
const Global = new ModuleStore();

export default Global;