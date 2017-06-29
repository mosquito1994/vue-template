import { Vue } from "../env"

const _ = new Vue();
export default {
	fetch: function(options) {
		var ajaxOptions = $.extend({
			'type': 'POST',
			'charset': 'utf8',
			'dataType': 'json',
			'cache' : false,
			'async': true, 
			'data' : {},
			error : function() {
				
			}
		}, options);
		return $.ajax(ajaxOptions).done(function(data) {
			var _code = +data.code;
			switch (_code) {
				case 403:
					window.location.href = data.result;
					break;
				case 401:
					window.location.href = data.result;
					break;
				case 200: 
					break;
				default:
					_.$Message.error(data.msg || "系统异常，请稍后再试");
					break;					
			}
		}).fail(function () {
			_.$Message.error("系统异常，请稍后再试");
		});
	},
	fetchSy: function(options) {
		var ajaxOptions = $.extend({
			'type': 'GET',
			'charset': 'utf8',
			'dataType': 'json',
			'cache' : false,
			'async': false, 
			'data' : {},
			error : function() {
				
			}
		}, options);

		return $.ajax(ajaxOptions).done(function(data) {
			var _code = +data.code;
			switch (_code) {
				case 403:
					window.location.href = data.result;
					break;
				case 401:
					window.location.href = data.result;
					break;
				case 200: 
					break;
				default:
					_.$Message.error(data.msg || "系统异常，请稍后再试");
					break;					
			}
		}).fail(function () {
			_.$Message.error("系统异常，请稍后再试");
		});
	},
	get: function(options) {
		var ajaxOptions = $.extend({
			'type': 'GET',
			'charset': 'utf8',
			'dataType': 'json',
			'cache' : false,
			'async':true, 
			'data': {},
			error : function() {
				
			}
		}, options);

		return $.ajax(ajaxOptions).done(function(data) {
			var _code = +data.code;
			switch (_code) {
				case 403:
					window.location.href = data.result;
					break;
				case 401:
					window.location.href = data.result;
					break;
				case 200: 
					break;
				default:
					_.$Message.error(data.msg || "系统异常，请稍后再试");
					break;					
			}
		}).fail(function () {
			_.$Message.error("系统异常，请稍后再试");
		});
	},
	post: function(options) {
		var ajaxOptions = $.extend({
			'type': process.env.NODE_ENV === "development" ? 'GET' : 'POST',
			'charset': 'utf8',
			'dataType': 'json',
			'contentType': 'application/json; charset=utf-8',
			'async':true, 
			'data' : {},
			'error' : function() {
				
			}
		}, options);

		ajaxOptions.data = JSON.stringify(ajaxOptions.data);

		return $.ajax(ajaxOptions).done(function(data) {
			var _code = +data.code;
			switch (_code) {
				case 403:
					window.location.href = data.result;
					break;
				case 401:
					window.location.href = data.result;
					break;
				case 200: 
					break;
				default:
					_.$Message.error(data.msg || "系统异常，请稍后再试");
					break;
			}
		}).fail(function () {
			_.$Message.error("系统异常，请稍后再试");
		});
	},
	getJsonp: function(options) {
		var ajaxOptions = $.extend({
			'type': 'GET',
			'dataType': 'jsonp',
			'jsonp': 'callback',
			'cache' : false,
			'data': {},
			error : function() {
				
			}
		}, options);
		return $.ajax(ajaxOptions).done(function(data) {
			var _code = +data.code;

			switch (_code) {
				case 403:
					window.location.href = data.result;
					break;
				case 401:
					window.location.href = data.result;
					break;
				case 200: 
					break;
				default:
					_.$Message.error(data.msg || "系统异常，请稍后再试");
					break;
			}
		}).fail(function (jqXHR, textStatus, ex) {
			window.location.href = 'http://test-yxpdc.mail.netease.com/gateway/api/auth/queryCategory.do?appname=PdYEy8Ibb';
		});			
	},
	getJsonpWithCache: function(options) {
		var ajaxOptions = $.extend({
			'type': 'GET',
			'dataType': 'jsonp',
			'jsonp': 'callback',
			'cache' : false,
			'data': {},
			error : function() {
				
			}
		}, options),
		_store,
		_cacheName = encodeURIComponent(options.url),
		_pdcId = _getPdcId(options.url);

		if (_pdcId) {
			_store = localStorage.getItem(_cacheName);

			if (_store) {
				var temp = JSON.parse(_store),
					_ctime = temp.timeStamp,
					_cpdcId = temp.pdcId,
					_ntime = new Date().getTime();

				if (_cpdcId === _pdcId && _ntime - _ctime < _cacheName) {
					return temp.data;
				}
			}
		}
		// cache格式
		// {
		// 	data: data, // ajax.done中拿到的data
		// 	timeStamp: new Date()，// 请求时间
		//  pdcId: // cookie中的pdc-sessionId
		// }

		return $.ajax(ajaxOptions).done(function(data) {
			var _code = +data.code;

			switch (_code) {
				case 403:
					window.location.href = data.result;
					break;
				case 401:
					window.location.href = data.result;
					break;
				case 200: 
					_cacheData(_cacheName, _pdcId, data);
					break;
				default:
					_.$Message.error(data.msg || "系统异常，请稍后再试");
					break;
			}
		});

		function _getPdcId (url) {
			var _pdcId,
				_cookies = document.cookie.split(";"),
				_cacheTime = 600000;

			_cookies.forEach(function (item) {
				if (item.indexOf("pdc-sessionId") !== -1) {
					_pdcId = item.split("pdc-sessionId=").slice(-1)[0];
				}
			});
			
			return _pdcId;
		}

		function _cacheData (cacheName, pdcId, data) {
			var _cache = {
				data: data,
				timeStamp: new Date().getTime(),
				pdcId: pdcId
			}
		}		
	}
}