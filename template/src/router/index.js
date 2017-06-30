import { VueRouter } from '../env'
import hello from '@/views/hello.vue'

export default new VueRouter([
	{
        path: '<%= name %>', component: hello
    }
]);
