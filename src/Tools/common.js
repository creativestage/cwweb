
/**
 * 遍历树
 * @param {Tree} treeData 树形结构
 * @param {Function} conditionCallback 遍历回调
 */
export const travelTree = (treeData, conditionCallback) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (conditionCallback(node)) {
      return;
    }
    travelTree(node.children || [],conditionCallback);
  }
};

//获取唯一module的id
export const getUUId = () => `${Math.random().toString(16).slice(2, 8)}`;

// html字符串转为本地url
export const createPageUrl = (htmlString) => {
  let blob = new Blob([htmlString], {type: 'text/html'});
  return URL.createObjectURL(blob);
}

// 工厂函数
export const getFactory = (str) => new Function(`return ${str}`);

export const getJsData = (str) => getFactory(str)();

export const getCurrentRoute = () => {
  const hash =  window.location.hash;
  let hasQuery = hash.indexOf('?') > -1;
  return hash.slice(2, hasQuery ? hash.indexOf('?') : Infinity);
}