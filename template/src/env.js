var Vue, iview, Vuex, VueRouter, loadModule = {};

if (process.env.NODE_ENV === "development") {
	Vue = require('vue').default;
	iview = require('iview');
	iview = iview.default ? iview.default : iview;
	VueRouter = require('vue-router').default;
	Vuex = require('vuex').default;

	Vue.use(iview);
	Vue.use(VueRouter);
	Vue.use(Vuex);
	loadModule = {
		methods: {
			navToChild () {
				return false;
			}
		}
	}
} else {
	Vue = window.Vue;
	iview = window.iview;
	VueRouter = window.VueRouter;
	Vuex = window.Vuex;
	if (window.mixin && window.mixin.loadModule) {
		loadModule = window.mixin.loadModule;
	}
}

export default {
	Vue,
	iview,
	Vuex,
	VueRouter,
	loadModule
}
