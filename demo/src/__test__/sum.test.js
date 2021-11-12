import { sum } from '../utils/sum.js'

// sum 函数测试
test('test sum module', () => {
  expect(sum(1, 2)).toBe(3)
})

// 匹配器
// 测试对象
test('expect a object', () => {
  let obj = {
    a: 1
  }
  obj.b = 2
  expect(obj).toEqual({a: 1, b: 2})
})

// 测试数组
test('expect an array', () => {
  let arr = []
  arr.push(1)
  arr.push(2)
  expect(arr).toEqual([1,2])
})



