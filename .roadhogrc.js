export default {
  hash: true,
  entry: 'src/index.js',
  disableCSSModules: false,
  autoprefixer: {
    browsers: [
      'last 7 versions',
      'Android >= 4.2',
      'iOS >= 6'
    ]
  },
  extraBabelPlugins: [
    'transform-runtime',
    ['import', {
      libraryName: 'antd',
      style: true
    }]
  ],
  env: {
    production: {
      multipage: true,
      publicPath: '/newlineage/'
    },
    development: {
      multipage: false,
      publicPath: '/',
      extraBabelPlugins: [
        'dva-hmr'
      ]
    }
  },
  "proxy": {
    "/api": {
      "target": "http://localhost/newlineage/api/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  }
};
