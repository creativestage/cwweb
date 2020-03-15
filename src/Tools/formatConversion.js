/**
 * 前端配置列表数据转配置JSON
 * @param {Object} configArray 配置数组
 */
export const transformConfig = (configArray) => {
  if (!configArray) return {};
  return configArray.reduce((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});
}
