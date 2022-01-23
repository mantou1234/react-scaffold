const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api1',{//遇见api1前缀就会触发代理
            target:'http://localhost:5000',//请求转发目标
            changeOrigin:true,//控制服务器收到的请求头中host字段值
            pathRewrite:{'^/api1':''}//重写请求路径
        }),
        createProxyMiddleware('/api2',{
            target:'http://localhost:5001',
            changeOrigin:true,
            pathRewrite:{'^/api2':''}
        })
    )   
}