/* Echarts图表字体、间距自适应 */
export const fitChartSize = (size) => {
  var width = document.documentElement.getBoundingClientRect().width;
  var height = document.documentElement.getBoundingClientRect().height;
  if (!width) return size;
  let scale = width / 1920;
  return Number((size * scale).toFixed(2));
};
