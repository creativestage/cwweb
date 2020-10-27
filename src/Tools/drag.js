import dragula from 'dragula';

export const createDragStage = (originDom, targetDom) => {
  dragula([originDom, targetDom], {
    copy: function (el, source) {
      return source === originDom
    },
    accepts: function (el, target) {
      return target !== originDom
    }
  });
}
console.log('???')
