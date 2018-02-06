import * as main from '../../../../main';
import myComponent from './juhuasuan.vue';

var app = new main.Vue({
    el: '#app',
    store: main.store,
    router: main.router,
    created: () => {
        main.Vue.nextTick(() => {
            main.beforeCreate(app);
        })
    },
    template: '<div><myComponent></myComponent></div>',
    components: {
        'myComponent': myComponent
    }
});