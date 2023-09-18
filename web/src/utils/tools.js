/**
 * @param {Function} fn 防抖函数
 * @param {Number} delay 延迟时间
 */
export const debounce = (fn, delay = 1000) => {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

/**
 * 根据索引循环取数值的值，取模运算符（%）来实现循环取数组的值
 * @param {*} array
 * @param {*} sort
 * @returns
 */
export const forArrayValue = (array, sort) => {
  return array[sort % array.length];
};
