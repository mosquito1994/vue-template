import Base from './base'

const _baseUrl = Utils.getPath().zhen.baseUrl;

export default {
	getAuthority : function(options) {
		var _options = options || {};

		if (/yxpdc\.mail\.netease\.com|test-yxpdc\.mail\.netease\.com/i.test(window.location.host)) {
			if (window._authData) {
				var dtd = $.Deferred();

				dtd.resolve(window._authData);

				return dtd;
			}
			_options.url = '/gateway/api/auth/queryCategory.do?appname=PdYEy8Ibb8';
		} else {
			_options.url = 'http://test-yxpdc.mail.netease.com/gateway/api/auth/queryCategory.do?appname=PdYEy8Ibb8';
		}
		return Base.getJsonp(_options);			
	},
	example (options) {
		var _options = options || {};

		_options.url = `${_baseUrl}/example.m`;
		
		return Base.post(_options);
	}
	
}