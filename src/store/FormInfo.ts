import { FormDesignInfo } from '@/types/Form';
import { ref } from 'vue';

class ModuleFormInfo {
  constructor() {
    console.log("%c FormInfo init", "color: #409EFF");
  }

  /** 记录表单的所有数据 */
  formData = ref<BaseObj<any>>({})
  
  /** 所有表单项 */
  formItems = ref<Array<FormDesignInfo.FormItem>>([])

  /** 当前选中的表单项 */
  selectedFormItem = ref<FormDesignInfo.FormItem>()

  /** 获取表单数据 */
  getFormData() {
    return this.formData.value
  }
  
}

const FormInfo = new ModuleFormInfo();

export default FormInfo;