import App from './App'
import router from './router'
import { Vue } from './env'

Vue.config.productionTip = false
// 引入公共模块
Vue.use(window.__common);

/* eslint-disable no-new */
if (process.env.NODE_ENV === "development") {
  window.frame = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
  })
} else {
  window.<%=createFn%> = function (data) {
    window.current && window.current.$destroy && window.current.$destroy();
    window.current = null;
    window.current = new Vue({
        data: data,
        el: "#app",
        router,
        template: '<App/>',
        components: { App }
    });
  }
  if (!window.current) {
    window.<%=createFn%>();
  }
}

window.onload = function () { // 截断三级hash
  var hash = location.hash.replace(/\/$/, "");

  hash = hash.split("/").slice(0, 3).join("/");
  location.hash = hash;
}
