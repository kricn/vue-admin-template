import { reactive, watch } from "vue";
import { LayoutInfo, RouteItem } from "@/types";
import { modifyData } from "@/utils";

const cacheName = "ModuleLayout";

/**
 * `layout`状态模块
*/
export default class ModuleLayout {
  constructor() {
    this.init();
    watch(this.info, this.saveInfo.bind(this));
  }

  /**
   * 动态添加的权限路由
   */
  privateRouters: Array<RouteItem> = [];

  /**
   * (基础路由+动态路由)列表
   */
  routers: Array<RouteItem> = [];

  /** 
   * `layout`布局信息
   */
  readonly info = reactive<LayoutInfo>({
    showTagsView: true,
    sidebarOpen: true,
    showSidebarLogo: true,
    historyViews: []
  })

  private init() {
    const value = sessionStorage.getItem(cacheName);
    try {
      if (value) {
        modifyData(this.info, JSON.parse(value));
      }
    } catch (error) {
      console.log("ModuleLayout init fail >>", error);
    }
  }

  /**
   * 保存`layout`操作状
   */
  private saveInfo() {
    sessionStorage.setItem(cacheName, JSON.stringify(this.info));
  }

  /** 
   * 菜单组件尺寸对象
   */
  menuSizeInfo = reactive({
    /** `the-layout-menu-title`实际高度 */
    titleHeight: 0,
    /** `the-layout-menu-item`实际高度 */
    itemHeight: 0
  })
}
