# Shopify 店铺客户端

这是一个基于 Expo 和 React Native 开发的 Shopify 店铺客户端应用，支持 iOS 和 Android 平台。通过集成 Shopify Front API，您可以轻松地将自己的店铺接入移动端。

## 功能特性

- 支持 iOS 和 Android 双平台
- 集成 Shopify Front API
- 可自定义店铺接入
- 响应式设计，适配多种屏幕尺寸

## 快速开始

1. 克隆本仓库到本地：
   ```bash
   git clone https://github.com/ericfetch/shopify_react_native_client.git
   ```

2. 安装依赖：
   ```bash
   cd shopify_react_native_client
   npm install
   ```

3. 配置 Shopify Access Token：
   在 `/shopify/index.js` 文件中，替换 `ACCESS_TOKEN` 为您自己店铺的 Access Token：
   ```javascript
  storefrontAccessToken:'your access'
   ```

4. 启动项目：
   ```bash
   expo start
   ```

5. 运行项目：
   - 扫描二维码在 Expo Go 应用中运行
   - 或使用以下命令在模拟器中运行：
     - iOS: `npm run ios`
     - Android: `npm run android`

## 依赖

- Expo
- React Native
- Shopify Front API
- React Navigation
- Axios

## 贡献

欢迎提交 Pull Request 或 Issue 来改进本项目。

## 许可证

MIT License
