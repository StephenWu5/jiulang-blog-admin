/**
   * 获取表单配置项
   * @param {*} otherConfig
   * @returns
   */
export function getFields(otherConfig){
  let fields = [{
    groupLabel: '',
    groupName: '',
    groupSeq: '0',
    groupType: '',
    hasInnerGroup: true,
    rows: [
      {
        fieldName: 'title',
        fieldLabel: '标题',
        fieldType: 'INPUT',
        initValue: '',
        required: '1',
        placeholder: '请输入'
      },
      {
        fieldName: 'content',
        fieldLabel: '文章',
        fieldType: 'TEXTAREA',
        initValue: '',
        required: '1',
        placeholder: '请输入',
        initStyle: { rows: '22' }
      },
      {
        fieldName: 'tags',
        fieldLabel: '标签',
        fieldType: 'SELECT',
        initValue: otherConfig.tagsEnums[0] && otherConfig.tagsEnums[0].name || '', // 如果没有值，默认第一个
        required: '1',
        placeholder: '请选择',
        enums: otherConfig.tagsEnums || []
      }
    ]
  }];
  return fields;
}