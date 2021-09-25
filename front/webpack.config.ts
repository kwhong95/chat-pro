import path from 'path';
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  name: 'chat-pro',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  // Webpack의 역할 - 여러개의 JS, CSS, JSON, TS 파일들을 하나로 통합시킨다.
  // entry의 파일을 불러와서 module로 변환하고 output으로 (결과물을) 출력한다. / plugins - 부가적인 변환과정
  // Key Point I
  entry: {
    app: './client',
  },
  target: ['web', 'es5'],
  // Key Point II
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // Key Point III
  plugins: [],
  // Key Point IV
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    port: 3090,
    publicPath: '/dist/',
  },
};

// if (isDevelopment && config.plugins) {
//   config.plugins.push(new webpack.HotModuleReplacementPlugin());
//   config.plugins.push(
//     new ReactRefreshWebpackPlugin({
//       overlay: {
//         useURLPolyfill: true,
//       },
//     }),
//   );
//   config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: false }));
// }
// if (!isDevelopment && config.plugins) {
//   config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
//   // config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
// }

export default config;