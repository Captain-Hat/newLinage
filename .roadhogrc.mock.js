let list = [
    {
        item: "服务器启动错误解决方法",
        date: "2017.8.20",
        id: 1
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        date: "2017.8.20",
        id: 2
    },
    {
        item: "服务器启动错误解决方法",
        date: "2017.8.20",
        id: 3
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        date: "2017.8.20",
        id: 4
    },
    {
        item: "服务器启动错误解决方法",
        date: "2017.8.20",
        id: 5
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        date: "2017.8.20",
        id: 6
    },
    {
        item: "服务器启动错误解决方法",
        date: "2017.8.20",
        id: 7
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        date: "2017.8.20",
        id: 8
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        date: "2017.8.20",
        id: 9
    },
]


export default {
    // 支持值为 Object 和 Array
    'GET /api/users': list,
    'post /api/sumit': { errcode: 1, msg: "success" },
    'post /api/users': { errcode: 1, data: list, option: { total: 100 }, msg: "success" },

    // GET POST 可省略
    '/api/users/1': { id: 1 },

    // 支持自定义函数，API 参考 express@4
    'POST /api/users/create': (req, res) => { res.end('OK'); },

    // Forward 到另一个服务器
    'GET /assets/*': 'https://assets.online/',

    // Forward 到另一个服务器，并指定子路径
    // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
    'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',
};