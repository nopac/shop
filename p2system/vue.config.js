// // // 跨域配置
module.exports = {
    devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
        port: 9880,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                // target: 'http://localhost:9090',     //代理的目标地址
                target: 'http://39.105.220.225:8081/shop',
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/api': ''                     //选择忽略拦截器里面的内容
                }
            }
        }
    },
    publicPath: "./",   //本地测试
    // publicPath: "/shopping/",      //打包上线
    configureWebpack: config => {
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production';
            // 打包文件大小配置
            config.performance = {
                maxEntrypointSize: 10000000,
                maxAssetSize: 30000000
            }
        }
    },
}