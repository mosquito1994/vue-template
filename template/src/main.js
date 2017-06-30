import App from './App'
import router from './router'
import { Vue } from './env'

Vue.config.productionTip = false
// 引入公共模块
Vue.use(window.__common);
