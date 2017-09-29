let CookieTool = {
    setCookie: (name, value) => {
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

        document.cookie = name + "=" + encodeURI(JSON.stringify(value)) + ";expires=" + exp.toGMTString();
    },
    getCookie: (cookiename) => {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(cookiename + "=");
            if (c_start != -1) {
                var cookieStr = document.cookie;
                cookieStr = cookieStr.substring(c_start, cookieStr.length);
                var c_end = cookieStr.indexOf(';');
                c_start = cookiename.length + 1;
                if (c_end == -1) {
                    c_end = cookieStr.length;
                }
                var uinfo = cookieStr.substring(c_start, c_end);
                return JSON.parse(decodeURI(uinfo));
            }
        }
        return null;
    },
    delCookie: (name) => {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    }
}
module.exports = CookieTool;