export default {
  // 文件入口
  entry: "src/index.js",
  // 环境
  env: {
    // 开发环境
    development: {
      extraBabelPlugins: [
        // 热加载插件
        "dva-hmr",
        // 转译插件
        "transform-runtime",
        // antd的压缩代码插件
        ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
      ]
    },
    // 生产环境
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]
      ]
    }
  },
  // 主题，用于改变antd的less变量值
  theme: "src/theme.js"
}
