// 后端请求地址 注意[他会根据你环境的不同从而获取的 env 文件不同]
const BASEURL = process.env.VUE_APP_BASEURL;
const nodeENV = process.env.NODE_ENV;

const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
    publicPath: './', // build时更改为'./' 还可以加域名
    // outputDir: 'dist',
    outputDir: `dist-${nodeENV}`,
    assetsDir: 'assets',
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))

            .set('api', resolve('src/api'))
        //   .set('base',resolve('src/base'))
        //   .set('static',resolve('src/static'))
    },
    // webpack-dev-server 相关配置 https://webpack.js.org/configuration/dev-server/
    devServer: {
        host: 'localhost',
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器  http://XXX.XXX.X.XX:7071/rest/XXX/ 
        hotOnly: true, // 热更新
        proxy: { //配置自动启动浏览器
            "/link/a": {
                target: BASEURL,
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: true,
                pathRewrite: {
                    '/link/a': ''
                }
            },
            "/geocoding": {
                target: 'http://api.map.baidu.com',
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    '/geocoding': ''
                }
            },
        },
    },

}

