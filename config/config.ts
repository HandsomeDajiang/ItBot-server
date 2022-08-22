import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';
import webpackPlugin from './plugin.config';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  // 路由模式
  history: {
    type: 'hash',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  fastRefresh: {},
  chainWebpack: webpackPlugin,
});

// const path = require('path')
// exports.handler = (evt, ctx, cb) => {
//   const {request} = evt.Records[0].cf
//   if (!path.extname(request.uri)) {
//     request.uri = '/'
//   }
//   cb(null, request)
// }
