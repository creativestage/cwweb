

export const travelTree = (treeData, conditionCallback) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (conditionCallback(node)) {
      return;
    }
    travelTree(node.children || [],conditionCallback);
  }
};

export const getUUId = () => `module-${Math.random().toString(16).slice(2, 10)}`;

export const createPageUrl = (htmlString) => {
  let blob = new Blob([htmlString], {type: 'text/html'});
  return URL.createObjectURL(blob);
}

export const getFactory = (str) => new Function(`return ${str}`);