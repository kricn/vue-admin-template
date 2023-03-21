import config from './config';
import { getCookie, removeCookie, setCookie } from './cookie';

// ============================== 权限相关模块 ==============================

/** 获取`cookie`中的`token` */
export function getToken() {
  return getCookie(config.tokenKey);
}

/**
 * 设置`token`值
 * @param token 
 */
export function setToken(token: string) {
  setCookie(config.tokenKey, token, {
    expires: new Date(Date.now() + (1000 * 60 * 60 * 10)), // 10小时后过期
  });
}

/** 清除`token` */
export function removeToken() {
  removeCookie(config.tokenKey);
}

