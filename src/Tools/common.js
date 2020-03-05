

export const travelTree = (treeData, conditionCallback) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (conditionCallback(node)) {
      return;
    }
    travelTree(node.children || [],conditionCallback);
  }
};