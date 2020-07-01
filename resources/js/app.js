require('./bootstrap');
window.Vue=require('vue');
Vue.component('example', reuiqre('./components/Example.vue'));

const app= new Vue({
    el:'#app'
});