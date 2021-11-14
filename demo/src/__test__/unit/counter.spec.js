/**
 * @jest-environment jsdom
 */
// 上面是注释是声明测试环境为 jsdom

import { mount } from '@vue/test-utils'
import Counter from '../../components/testComponent/Counter.vue'

describe('Counter', () => {
  const wrapper = mount(Counter)
  test('counter class', () => {
    expect(wrapper.classes()).toContain('count')
    expect(wrapper.classes("count")).toBe(true)
  })
  test('counter has span', () => {
    expect(wrapper.html()).toContain('<div>0</div>')
  })
  test('counter has btn', () => {
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').exists()).not.toBe(false)
  })
})