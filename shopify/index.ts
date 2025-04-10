import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: 'jingyu-test.myshopify.com', // 替换为你的店铺域名
    storefrontAccessToken: 'a12b86fa28d85063c295fec67a8253a8', // 替换为 Storefront Access Token
    apiVersion: '2024-01' // 添加最新的 Shopify Storefront API 版本
  });

export default client;