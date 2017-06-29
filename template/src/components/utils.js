export default {
    getPath () {
        var baseUrl;

        if (_host === 'test-yxpdc.mail.netease.com') {
            baseUrl = 'http://test-yxpdc.mail.netease.com/expert-admin/xhr';
        } else if (_host === 'yxpdc.mail.netease.com') {
            baseUrl = 'http://yxpdc.mail.netease.com/expert-admin/xhr';
        } else if (_host === 'release-yxpdc.mail.netease.com') {
            baseUrl = 'http://release-yxpdc.mail.netease.com/expert-admin/xhr';
        } else {
            baseUrl = './../mock/xhr/zhen';
        }
        return baseUrl;
    },
	formatDate (value, fmt) {
        if (!value) {
        	return "";
        }
        value = new Date(value);

        var o = {
            "y+": value.getFullYear(), // 年份
            "M+": value.getMonth() + 1, // 月份
            "d+": value.getDate(), // 日
            "h+": value.getHours(), // 小时
            "H+": value.getHours(), // 小时
            "m+": value.getMinutes(), // 分
            "s+": value.getSeconds(), // 秒
            "S": value.getMilliseconds() // 毫秒
        };
        var week = {
            "0": "\u65e5",
            "1": "\u4e00",
            "2": "\u4e8c",
            "3": "\u4e09",
            "4": "\u56db",
            "5": "\u4e94",
            "6": "\u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[value.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    delEmptyParams: function(options) {
        $.each(options, function(_i, _v) {
             if (!_v && _v !== 0) {
              delete options[_i];
             };
        }); 
        return options;     
    },
    dateFormat: function(time, fmt) {
         time = new Date(time);
         var o = { 
            "M+": time.getMonth() + 1,                 //月份 
            "d+": time.getDate(),                    //日 
            "h+": time.getHours(),                   //小时 
            "m+": time.getMinutes(),                 //分 
            "s+": time.getSeconds(),                 //秒 
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
            "S" : time.getMilliseconds()             //毫秒 
        }; 
        if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length)); 
        }
         for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
             }
         }
        return fmt;         
    },
    //深度复制对象
    cloneObj: function (obj) {
        var str, 
            newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj); 
            newobj = JSON.parse(str); 
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? this.cloneObj(obj[i]) : obj[i]; 
            }
        }
        return newobj;
    },
    //查询字符串长度,中文长度2，字母数字长度1
    getStringLength: function (str) { 
        var _length = 0;
        for (var i = 0; i < str.length; i++) { 
            if ((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 255)) { 
                _length = _length + 2 
            } else {
                _length = _length + 1;   
            }
        } 
        return _length;
    },
    //删除无效数组元素
    delUnvalueArr: function(arr) {
        var _newArr = [],
            _length = arr.length;
        for (var i = 0; i < _length; i++) {
            if (arr[i]) {
                _newArr.push(arr[i]);
            }
        };

        return _newArr;
    },
    compare: function(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    addHash (_hash) {
        var hash = location.hash.replace(/\/$/, "");

        if (hash.split("/").slice(-1)[0] === _hash) {
            return;
        }
        hash += "/" + _hash;
        location.hash = hash;
    },
    replaceHash (_hash) {
        var hash = location.hash.replace(/\/$/, "");

        hash = hash.split("/").slice(0, -1).join("/") + "/" + _hash;
        location.hash = hash;
    },
    removeLastHash () {
        var hash = location.hash.replace(/\/$/, "");

        hash = hash.split("/").slice(0, -1).join("/");
        location.hash = hash;
    }
}