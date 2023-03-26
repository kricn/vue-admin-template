/**
 * 项目配置模块
 */
const config = (function () {
  const env = process.env.NODE_ENV === "development" ? "dev" : "prod";

  return {
    /** 请求超时毫秒 */
    get requestOvertime() {
      return 15 * 1000;
    },
    /** 是否开发环境 */
    get isDev() {
      return env === "dev";
    },
    /** cookie token key */
    get tokenKey() {
      return 'admin-token';
    }
  }
})();

export default config;