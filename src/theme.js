/**
 * 覆盖antd或者antd-mobile的默认样式，由roadhog处理
 */

module.exports = () => {
  return {
    '@border-radius-base': '3px',
    '@border-radius-sm': '2px',
    '@shadow-color': 'rgba(0,0,0,0.05)',
    '@shadow-1-down': '4px 4px 40px @shadow-color',
    '@border-color-split': '#f4f4f4',
    '@border-color-base': '#e5e5e5',
    '@text-color': '#666',
    '@font-family': 'monospace,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif',
    // popup-zindex
    '@popup-zindex': '2000',
    '@picker-zindex': '2000',
    // 字体
    '@font-size-icontext': '14px',
    '@font-size-caption-sm': '16px',
    '@font-size-base': '12px',
    '@font-size-subhead': '16px',
    '@font-size-caption': '18px',
    '@font-size-heading': '18px',
    '@font-size-display-sm': '14px',
    '@font-size-display-md': '16px',
    '@font-size-display-lg': '18px',
    '@font-size-display-xl': '20px',
    // list
    '@list-title-height': '30px',
    '@list-item-height-sm': '40px',
    '@list-item-height': '50px',
    // 间距
    // 水平间距
    '@h-spacing-lg': '10px',
    // 垂直间距
    '@v-spacing-lg': '10px',
    // 图标尺寸
    '@icon-size-xxs': '14px',
    '@icon-size-xs': '16px',
    '@icon-size-sm': '16px',
    '@icon-size-md': '16px',
    '@icon-size-lg': '18px',
    // input
    '@input-label-width': '14px',       // InputItem、TextareaItem 文字长度基础值
    '@input-font-size': '14px',
  };
};
