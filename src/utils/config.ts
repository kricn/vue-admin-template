/**
 * 项目配置模块
 */
const config = (function () {
  const env = process.env.NODE_ENV === "development" ? "dev" : "prod";

  const url = {
    dev: "", // `http://${location.host}`,
    prod: ""
  }

  const { hostname } = location;

  const projectMap = {
    'datacenter.bokeyun.com.cn': 'https://datacenter.bokeyun.com.cn',
    'qakch-admin.bokeyun.com.cn': 'https://qakch-admin.bokeyun.com.cn',
    'hk.boshiyun.com.cn': 'https://hk.boshiyun.com.cn'
  }

  return {
    /** 请求超时毫秒 */
    get requestOvertime() {
      return 15 * 1000;
    },
    /** `api`请求域名 */
    get apiUrl() {
      return url[env];
    },
    /** 是否开发环境 */
    get isDev() {
      return env === "dev";
    },
    /** cookie token key */
    get tokenKey() {
      return 'business-access-token';
    },
    /**
     * 当前项目域名（不含路径）
     */
     get projectDomain() {
      return projectMap[hostname as keyof typeof projectMap] || projectMap['datacenter.bokeyun.com.cn'];
    },
    /**
     * 当前项目地址
     * - 测试地址
     * - 正式地址
     * - 预发地址
     */
    get projectUrl() {
      return this.projectDomain + '/business';
    },
  }
})();

export default config;