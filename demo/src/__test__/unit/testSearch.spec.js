
/**
 * @jest-environment jsdom
 */
import { shallowMount } from '@vue/test-utils'
import TestSearch from '../../components/testComponent/TestSearch.vue'

test('test TestSearch component', async () => {
  // 挂载组件
  const wrapper = shallowMount(TestSearch)
  // 设置值
  wrapper.setData({inputValue: 'hello world'})
  //查看事件是否触发
  // console.log(wrapper.emitted())
})