import FormInfo from '@/store/FormInfo';
import { FormDesignInfo } from '@/types/Form';

const defaultLabel: {
  [key in FormDesignInfo.ComponentsKey]: string
} = {
  FormInput: '输入框',
  FormSelect: '下拉框'
}

const defaultplaceholder: {
  [key in FormDesignInfo.ComponentsKey]: string
} = {
  FormInput: '请输入',
  FormSelect: '请选择'
}

/** 初始化表单数据 */
export function useFormInfo(name: FormDesignInfo.ComponentsKey='FormInput'): FormDesignInfo.FormItem {
  const label = defaultLabel[name || 'FormInput']
  const sameNameCount = FormInfo.formItems.value.reduce((total, item) => {
    if (item.name === name) total += 1
    return total
  }, 1)
  return {
    label: label + sameNameCount,
    name: name || '',
    key: '',
    itemId: Date.now().toString(36),
    value: '',
    widget: useWidget(name)
  }
}

/** 初始化配置项 */
export function useBaseWidget(name: FormDesignInfo.ComponentsKey='FormInput'): FormDesignInfo.Widget {
  return {
    rules: [],
    status: 'normal',
    placeholder: defaultplaceholder[name]
  }
}

/** 初始化输入框配置 */
function useInputWidget(): FormDesignInfo.InputWidget {
  return {
    ...useBaseWidget('FormInput')
  }
}

/** 初始化下拉框配置 */
function useSelectWidget(): FormDesignInfo.SelectWidget {
  return {
    ...useBaseWidget('FormSelect'),
    options: []
  }
}

/** 名称-配置项函数映射 */
const nameToWidget = {
  FormInput: useInputWidget,
  FormSelect: useSelectWidget
}
/** 通过名称获取配置项目 */
function useWidget(name: FormDesignInfo.ComponentsKey='FormInput'): FormDesignInfo.Widget {
  if (!name) return useBaseWidget()
  if (name in nameToWidget) {
    return nameToWidget[name]()
  }
  return useBaseWidget()
}