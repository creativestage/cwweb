

## 表单配置文档


### 表单类型

* `input`: [输入框](#input)
* `select`: 下拉选择框
* `radio`: 单选框
* `checkbox`: 多选框
* `switch`: 开关

### 通用字段

* type: `String` [表单类型](#表单类型)，必填
* label: `String` 表单label名，必填
* key: `String` 表单key值，必填
* defaultValue: `Ang` 默认值， 非必填
* placeholder: `String` 表单元素默认提示语， 非必填

### 配置示例

#### input

type为`input`的配置，会生成一条输入框表单配置项

```javascript
{
  type: 'input',
  label: '姓名',
  key: 'name',
  placeholder: '请输入姓名'
}
```

### select

type为`select`的配置，会生成一条下拉选择框的表单配置项

#### 非通用字段

* options: `Array[Object]` 选项列表，必填
  * name: `String` 选项名，必填
  * value: `Ang` 选项值，必填

```javascript
{
  type: 'select',
  label: '选项',
  key: 'opt',
  placeholder: '请选择',
  options: [
    {
      name: 'A',
      value: 'A'
    },
    {
      name: 'B',
      value: 'B'
    }
  ]
}
```