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
        fieldName: 'name',
        fieldLabel: '标签',
        fieldType: 'INPUT',
        initValue: '',
        required: '1',
        placeholder: '请输入',
        otherConfig: otherConfig.name
      }
    ]
  }];
  return fields;
}