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
