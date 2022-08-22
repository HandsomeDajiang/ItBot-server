import * as IWebpackChainConfig from 'webpack-chain';

const webpackPlugin = (config: IWebpackChainConfig) => {
  // optimize chunks
  config.module
    .rule('media')
    .test(/\.(mp3|wav|mp4|woff|woff2|eot|ttf|otf)$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'));
};

export default webpackPlugin;
