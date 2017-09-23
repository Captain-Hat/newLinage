let list = [
    {
        item: "服务器启动错误解决方法",
        date: "2017.8.20",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        id: 1,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        date: "2017.8.20",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        id: 2,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "服务器启动错误解决方法",
        date: "2017.8.20",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        id: 3,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        date: "2017.8.20",
        id: 4,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "服务器启动错误解决方法",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        date: "2017.8.20",
        id: 5,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        date: "2017.8.20",
        id: 6,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "服务器启动错误解决方法",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        date: "2017.8.20",
        id: 7,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        date: "2017.8.20",
        id: 8,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
    {
        item: "5月4日(周四)全区全服例行维护结束公告",
        img: "http://pic.duowan.com/df/1104/166256478415/166256500012.jpg",
        desc: "这是一件毁天灭地的装备，找GM购买只需998.",
        date: "2017.8.20",
        id: 9,
        name: "霜之哀伤",
        owner: "婆娘",
        price: "1555"
    },
]
let npcData = [
    {
        "gfxid": "34",
        "name": "鳄鱼",
        "agro": "1",//主动
        "ac": "5",
        "size": "large",
        "exp": "6",
        "lawful": "iron",
        "lvl": "10",
        "mr": "1",//抗魔
        "hp": "1",
        "mp": "1",
        "str": "1",
        "dex": "1",
        "con": "0",
        "intel": "0",
        "wis": "2",
        "agrocoi": "1",//看穿隐身
        "agrososc": "1",//看穿变身
        "tamble": "1"
    },
    {
        "gfxid": "34",
        "name": "王八",
        "agro": "0",//主动
        "ac": "5",
        "size": "large",
        "exp": "6",
        "lawful": "iron",
        "lvl": "10",
        "mr": "1",//抗魔
        "hp": "1",
        "mp": "1",
        "str": "1",
        "dex": "1",
        "con": "0",
        "intel": "0",
        "wis": "2",
        "agrocoi": "0",//看穿隐身
        "agrososc": "0",//看穿变身
        "tamble": "1"
    }
    ,
    {
        "gfxid": "34",
        "name": "兔子",
        "agro": "0",//主动
        "lvl": "10",
        "size": "large",
        "exp": "6",
        "lawful": "2",

        "ac": "5",
        "mr": "1",//抗魔
        "hp": "1",
        "mp": "1",
        "str": "1",
        "dex": "1",
        "con": "0",
        "intel": "0",
        "wis": "2",


        "agrocoi": "0",//看穿隐身
        "agrososc": "0",//看穿变身
        "tamble": "1"
    }
]
let list2 = [
    {
        ac: '3',
        safe: "5",
        type: "6",
        id: 0
    },
    {
        ac: '3',
        safe: "5",
        type: "6",
        id: 1
    },
    {
        ac: '3',
        safe: "5",
        type: "6",
        id: 2
    },
    {
        ac: '3',
        safe: "5",
        type: "6",
        id: 3
    }
]


export default {
    // 支持值为 Object 和 Array
    'GET /api/users': { errcode: 1, data: list, option: { total: 100 }, msg: "success" },
    'post /api/sumit': { errcode: 1, msg: "success" },
    'post /api/users': { errcode: 1, data: list, option: { total: 100 }, msg: "success" },
    'post /api/detail': { errcode: 1, data: list2, option: { total: 100 }, msg: "success" },
    'post /api/npc': { errcode: 1, data: npcData, option: { total: 100 }, msg: "success" },

    // GET POST 可省略
    '/api/users/1': { id: 1 },

    // 支持自定义函数，API 参考 express@4
    'POST /api/users/create': (req, res) => { res.end('OK'); },

    // Forward 到另一个服务器
    'GET /assets/*': 'http://localhost/newlineage/api/',

    // Forward 到另一个服务器，并指定子路径
    // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
    'GET /someDir/(.*)': 'http://localhost/newlineage/api',
};