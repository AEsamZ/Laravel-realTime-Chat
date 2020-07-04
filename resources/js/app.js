require('./bootstrap');
window.Vue=require('vue');

Vue.component('message', require('./components/message.vue').default);

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)



const app= new Vue({
    el:'#app',
    data:{
        message:"",
        chat:{
            message:[],
            user:[],
            color:[]
        }
    },
    methods:{
        send(){
            if (this.message.length != 0){
                this.chat.message.push(this.message)
                this.chat.user.push('You')
                this.chat.color.push('success')

                axios.post('/send', {
                    message:this.message
                  })
                  .then(response=> {
                    this.message=''

                  })
                  .catch(error=> {
                    console.log(error);
                  });
            }
            
        }
    },
    mounted(){        //recieved
        Echo.private('chat')
        .listen('ChatEvent', (e) => {
        this.chat.message.push(e.message)
        this.chat.user.push(e.user)
        this.chat.color.push('warning')
    });
    }
});