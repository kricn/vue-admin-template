
import { onUnmounted } from 'vue';

/** 手机正则，包含座机 */
export const phoneRegExp = /^((0\d{2,3}-\d{7,8})|(?:(?:\+|00)86)?1[3-9]\d{9})$/;
/** 邮箱正则 */
export const emailRegExp = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd0-9]{2,5}$/;
/** 不少于6位字符，且不能有中文；建议包含字母、数字和符号 */
export const passwordRegExp = /^[A-Za-zd0-9.-_*!@`+#$&]{6,16}$/;

/**
 * 检测类型
 * @param target 检测的目标
 */
export function checkType(target: any) {
  const value: string = Object.prototype.toString.call(target);
  const result = (value.match(/\[object (\S*)\]/) as RegExpMatchArray)[1];
  return result.toLocaleLowerCase() as JavaScriptTypes;
}

/**
 * 判断任意值的类型，作用与`checkType`一致，外加一个辅助功能：当函数返回值为`true`时，可以传入泛型来确定`target`的类型（类型收窄）
 * @param target 判断目标
 * @param type 判断的类型
 */
export function isType<T>(target: any, type: JavaScriptTypes): target is T {
  return checkType(target) === type;
}

/**
 * 修改属性值-只修改之前存在的值
 * @param target 修改的目标
 * @param value 修改的内容
 */
export function modifyData<T>(target: T, value: T) {
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      // target[key] = value[key];
      // 需要的话，深层逐个赋值
      if (isType(target[key], 'object')) {
        modifyData(target[key], value[key]);
      } else {
        target[key] = value[key];
      }
    }
  }
}

/**
 * 设置属性值-之前不存在的值也根据传入的`value`值去设置
 * @param target 设置的目标
 * @param value 设置的内容
 */
export function setData<T>(target: T, value: T) {
  for (const key in value) {
    target[key] = value[key];
  }
}

/**
 * 格式化日期
 * @param value 指定日期
 * @param format 格式化的规则
 * @example
 * ```js
 * formatDate();
 * formatDate(1603264465956);
 * formatDate(1603264465956, 'h:m:s');
 * formatDate(1603264465956, 'Y年M月D日');
 * ```
 */
export function formatDate(value: string | number | Date = Date.now(), format = 'Y-M-D h:m:s') {
  if (['null', null, 'undefined', undefined, ''].includes(value as any)) return '';
  // ios 和 mac 系统中，带横杆的字符串日期是格式不了的，这里做一下判断处理
  if (typeof value === 'string' && new Date(value).toString() === 'Invalid Date') {
    value = value.replace(/-/g, '/');
  }
  const formatNumber = (n: number) => `0${n}`.slice(-2);
  const date = new Date(value);
  const formatList = ['Y', 'M', 'D', 'h', 'm', 's'];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}

/**
 * 点击复制
 * @param text 复制的内容
 * @param success 成功回调
 * @param fail 出错回调
 */
export function copyText(text: string, success?: () => void, fail?: (res: string) => void) {
  text = text.replace(/(^\s*)|(\s*$)/g, '');
  if (!text) {
    fail && fail('复制的内容不能为空！');
    return;
  }
  const id = 'the-clipboard';
  let clipboard = (document.getElementById(id) as HTMLTextAreaElement);
  if (!clipboard) {
    clipboard = document.createElement('textarea');
    clipboard.id = id;
    clipboard.readOnly = true;
    clipboard.style.cssText = 'font-size: 15px; position: fixed; top: -1000%; left: -1000%;';
    document.body.appendChild(clipboard);
  }
  clipboard.value = text;
  clipboard.select();
  clipboard.setSelectionRange(0, clipboard.value.length);
  const state = document.execCommand('copy');
  window.getSelection?.()?.removeAllRanges()
  if (state) {
    success && success();
  } else {
    fail && fail('复制失败');
  }
}

/**
 * 输入只能是数字
 * @param value 
 * @param decimal 是否要保留小数
 * @param negative 是否可以为负数
 */
export function inputOnlyNumber(value: string | number, decimal?: boolean, negative?: boolean) {
  let result = value.toString().trim();
  if (result.length === 0) return '';
  const minus = (negative && result[0] == '-') ? '-' : '';
  if (decimal) {
    result = result.replace(/[^0-9.]+/ig, '');
    const resultCopy = result;
    let array = result.split('.');
    /** 过滤无效0 */
    result = Number(array[0]) + ''
    if (array.length > 1) {
      result = array[0] + '.' + array[1];
    }
    if (resultCopy.substring(resultCopy.length - 1, resultCopy.length - 0) === '.') {
      result = array[0] + '.'
    }
  } else {
    result = Number(result.replace(/[^0-9]+/ig, '')) + '';
  }
  return minus + result;
}

/**
 * ES5 兼容 ES6 `Array.findIndex`
 * @param array
 * @param compare 对比函数
 */
export function findIndex<T>(array: Array<T>, compare: (value: T, index: number) => boolean) {
  var result = -1;
  for (var i = 0; i < array.length; i++) {
    if (compare(array[i], i)) {
      result = i;
      break;
    }
  }
  return result;
}


/**
 * 自定义对象数组去重
 * @param array
 * @param compare 对比函数
 * @example
 * ```js
 * const list = [{ id: 10, code: 'abc' }, {id: 12, code: 'abc'}, {id: 12, code: 'abc'}];
 * filterRepeat(list, (a, b) => a.id == b.id)
 * ```
 */
export function filterRepeat<T>(array: Array<T>, compare: (a: T, b: T) => boolean) {
  return array.filter((element, index, self) => {
    return findIndex(self, (el: T) => compare(el, element)) === index;
  })
}

/**
 * 判断是否外部链接
 * @param path 路径
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * `JSON`转`FormData`
 * @param params `JSON`对象
 * @example 
 * ```js
 * const info = { name: 'hjs', id: 123 };
 * const val = jsonToFormData(info);
 * console.log(val); // 'name=hjs&id=123'
 * ```
 */
export function jsonToFormData(params: { [key: string]: any }) {
  let result = '';
  for (const key in params) {
    result += `&${key}=${params[key]}`;
  }
  return result.slice(1);
}

/**
 * `JSON`格式化对象，内置错误捕捉处理，错误时返回默认值
 * - 默认返回空对象: `{}`
 * @param target 要格式化的目标对象
 * @param defaultValue 默认返回值
 */
export function jsonParse(target: any, defaultValue: any = {}) {
  let result = defaultValue;
  if (isType<string>(target, 'string')) {
    try {
      result = JSON.parse(target);
    } catch (error) {
      console.warn('JSON格式化对象错误 >>', error);
    }
  }
  return result;
}

/** 检查是否移动端 */
export function isMobile() {
  const pattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i;
  return pattern.test(navigator.userAgent);
}

/**
 * 获取`url?`后面参数（JSON对象）
 * @param name 获取指定参数名
 * @param target 目标字段，默认`location.search`
 * @example 
 * ```js
 * // 当前网址为 www.https://hjs.com?id=99&age=123&key=sdasfdfr
 * const targetAge = getQueryParam('age', 'id=12&age=14&name=hjs');
 * const params = getQueryParam();
 * const age = getQueryParam('age');
 * // 非IE浏览器下简便方法
 * new URLSearchParams(location.search).get('age');
 * ```
 */
export function getQueryParam(name?: string, target?: string) {
  // const code = target || location.search.slice(1); // location.search 在 http://192.168.89.53:1080/#/page?id=10 这种情况下获取不到
  const code = target || location.href.split('?')[1] || '';
  const list = code.split('&');
  const params: BaseObj<string> = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const items = item.split('=');
    if (items.length > 1) {
      params[items[0]] = item.replace(`${items[0]}=`, '');
    }
  }
  if (name) {
    return params[name] || '';
  } else {
    return params;
  }
}


/**
 * 数字转中文大写
 * @param {number} value 
 */
 export function toChinesNumber(value:number) {
  if (['', NaN, undefined, null].includes(value)) value = 0
  const changeNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = ['', '拾', '佰', '仟', '万'];
  const decimal = value.toString().split('.')[1];
  const integer = parseInt(value.toString());
  function getWan(number = 0) {
    const strArr = number.toString().split('').reverse().map(i => Number(i));
    let newNum = '';
    for (let i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  function getDecimal(str = '') {
    let result = '';
    if (str[0] && str[0] != '0') {
      result += `${changeNum[Number(str[0])]}角`;
    }
    if (str[1] && str[1] != '0') {
      result += `${changeNum[Number(str[1])]}分`;
    }
    return result;
  }
  const overWan = Math.floor(integer / 10000);
  let noWan: string | number = integer % 10000;
  if (noWan.toString().length < 4) noWan = '0' + noWan;
  let result = overWan ? `${getWan(overWan)}万${getWan(noWan as number)}` : getWan(integer);
  if (result) result += (decimal ? '元' : '元整');
  return decimal ? `${result}${getDecimal(decimal)}` : ( result || `${changeNum[0]}元`);
}

/**
 * 数字运算（主要用于小数点精度问题）
 * [see](https://juejin.im/post/6844904066418491406#heading-12)
 * @param {number} a 前面的值
 * @param {'+' | '-' | '*' | '/'} type 计算方式
 * @param {number} b 后面的值
 * @example
 * ```js
 * // 可链式调用
 * const res = computeNumber(1.3, '-', 1.2).next('+', 1.5).next('*', 2.3).next('/', 0.2).result;
 * console.log(res);
 * ```
 */
 export function computeNumber(a: number, type: '+' | '-' | '*' | '/', b: number) {
  /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
  function getDecimalLength(n: number) {
    const decimal = n.toString().split('.')[1];
    return decimal ? decimal.length : 0;
  }
  /**
   * 修正小数点
   * @description 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的处理
   * @param {number} n 数字
   */
  const amend = (n: number, precision = 15) => parseFloat(Number(n).toPrecision(precision));
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  let result = 0;

  a = amend(a * power);
  b = amend(b * power);

  switch (type) {
    case '+':
      result = (a + b) / power;
      break;
    case '-':
      result = (a - b) / power;
      break;
    case '*':
      result = (a * b) / (power * power);
      break;
    case '/':
      result = a / b;
      break;
  }

  result = amend(result);

  return {
    /** 计算结果 */
    result,
    /**
     * 继续计算
     */
    next(nextType: '+' | '-' | '*' | '/', nextValue: number) {
      return computeNumber(result, nextType, nextValue);
    },
    /**
     * 小数点进位
     * @param {number} n 小数点后的位数
     * - 应用场景：商品价格`100`，优惠券`3`折扣，那么结算价格就是`33.33...`，取小数点两位则是`33.33`；
     * - 如果有`1000`个人都以`33.33`去结算的话，那么最终就会损失`3`块钱，以此类推；
     * - 所以该方法就是在小数取位后面补`1`，像这样：
     * ```js
     * const price1 = 33.333;
     * price1.toHex(2); // 输出 33.34
     * const price2 = 33.33;
     * price2.toHex(2); // 输出 33.33
     * const price3 = 12.1212
     * price3.toHex(1); // 输出 12.2
     * ```
     */
    toHex(n: number) {
      const strings = result.toString().split('.');
      if (n > 0 && strings[1] && strings[1].length > n) {
        const decimal = strings[1].slice(0, n);
        const value = Number(`${strings[0]}.${decimal}`);
        const difference = 1 / Math.pow(10, decimal.length);
        result = computeNumber(value, '+', difference).result;
      }
      return result;
    },
    /**
     * 不会四舍五入的小数点取舍
     * @param {number} fixed 小数位
     */
    toFixed(fixed: number) {
      return toFixed(result, fixed);
    }
  }
}

/**
 * 不会四舍五入的小数点取舍
 * @param {string} val 值
 * @param {number} fixed 保留几位小数
 * @param {boolean} isParse 是否忽略掉有效数后的 0
 */
export function toFixed(val: number | string, fixed: number, isParse:boolean = true): string {
  let res = val
  try {
    const valueArr = val.toString().split('.')
    if (valueArr.length > 1) {
      res = valueArr[0] + '.' + valueArr[1].slice(0, fixed)
      if (isParse && valueArr[1].length === fixed) {
        res = Number(res)
      }
    }
  } catch (e) {
    console.warn(e)
    return ''
  }
  return res + ''
}

/**
 * `blob`或者`file`转读取路径
 * @param target 目标对象 
 */
 export function blobOrFlieToUrl(target: File | Blob) {
  let url = '';
  if (window.createObjectURL) {
    url = window.createObjectURL(target);
  } else if (window.URL) {
    url = window.URL.createObjectURL(target);
  } else if (window.webkitURL) {
    url = window.webkitURL.createObjectURL(target);
  }
  return url;
}

/**
 * 导出/下载文件
 * @param {Blob} blob 
 * @param {string} filename 导出的文件名，包括后缀
 */
 export function exportFile(blob: Blob, filename: string) {
  const url = blobOrFlieToUrl(new Blob([blob], {
    type: blob.type
  }));
  const label = document.createElement('a');
  label.href = url;
  label.download = filename;
  document.body.appendChild(label);
  label.click();
  label.remove();
}

/**
 * 深拷贝
 * @param obj
 */
 export function deepCopy<T>(obj: T): T {
  if (obj === null) return obj;
  if (typeof obj !== 'object') return obj;
  let result: BaseObj<any> = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key]);   //递归拷贝
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result as T;
}

export interface ElementResizeOptions {
  /** 监听的节点 */
  el: HTMLElement
  /** 尺寸变动回调 */
  callback?: (entries: Array<ResizeObserverEntry>) => void
  /** `onUnmounted`的销毁函数 */
  destroy?: () => void
}

/**
 * `new ResizeObserver`监听节点变动
 * @param {ElementResizeOptions} option 配置项
 */
export function onElementResize(option: ElementResizeOptions) {
  if (!checkType(option.el).includes('element')) return console.warn('onElementResize: 传入的 el 类型不正确');

  const resize = new ResizeObserver(entries => {
    option.callback && option.callback(entries);
  });

  resize.observe(option.el);

  onUnmounted(function() {
    option.destroy && option.destroy();
    resize.disconnect();
  });
}

/**
 * a标签打开链接
 * @param link
 * @param target
 */
export function openLink(link: string, target: '_blank'|'_self'|'_parent'|'_top' = '_blank') {
  const label = document.createElement('a');
  label.href = link;
  label.target = target;
  document.body.appendChild(label);
  label.click();
  document.body.removeChild(label);
}
