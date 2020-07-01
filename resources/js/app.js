require('./bootstrap');
window.Vue=require('vue');
// Vue.component('message', reuiqre('./components/message'));
// import message from './components/message.vue';

// Vue.component('message', message);

// Vue.component("message", () => import("./components/message"));

Vue.component('message', require('./components/message.vue').default);



const app= new Vue({
    el:'#app',
    data:{
        message:"",
        chat:{
            message:[]
        }
    },
    methods:{
        send(){
            if (this.message.length != 0){
                this.chat.message.push(this.message)
                this.message=''
            }
            
        }
    }
});