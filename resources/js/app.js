require('./bootstrap');
window.Vue=require('vue');

Vue.component('message', require('./components/message.vue').default);

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
 
//this toaster is a package for notifications
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000})


const app= new Vue({
    el:'#app',
    data:{
        message:"",
        chat:{
            message:[],
            user:[],
            color:[],
            time:[]
        },
        typing:'',
        numberOfUsers:0
    },
    watch:{
        message(){
            Echo.private('chat')
            .whisper('typing', {
            name: this.message
         });
        }
    },
    methods:{
        send(){
            if (this.message.length != 0){
                this.chat.message.push(this.message)
                this.chat.user.push('You')
                this.chat.color.push('success')
                this.chat.time.push(this.getTime())

                axios.post('/send', {
                    message:this.message,
                    chat:this.chat
                  })
                  .then(response=> {
                    this.message=''

                  })
                  .catch(error=> {
                    console.log(error);
                  });
            }
            
        },
        getTime(){
            let time=new Date();
            return time.getHours()+':'+time.getMinutes()
        },
        getOldMsgs(){
            axios.post('/getOldMsgs')
            .then(response=>{
                console.log(response);
                if(response.data != ''){
                    this.chat=response.data
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },
        deleteChat(){
            axios.post('/deleteChat')
            .then(response=> this.$toaster.success('Chat history is deleted') );
        }
    },
    mounted(){        //recieved
        this.getOldMsgs();
        Echo.private('chat')
        .listen('ChatEvent', (e) => {
        this.chat.message.push(e.message)
        this.chat.user.push(e.user)
        this.chat.color.push('warning')
        this.chat.time.push(this.getTime())

        axios.post('/saveToSession',{
            chat:this.chat
        })
            .then(response=>{
            })
            .catch(error=>{
                console.log(error);
            })
        
    })

    .listenForWhisper('typing', (e) => {
        if(e.name != ''){
            this.typing='typing...'            
        }
        else{
            this.typing=''            
        }
    });
    Echo.join('chat')
    .here((users) => {
        this.numberOfUsers=users.length;
    })
    .joining((user) => {
        this.numberOfUsers+=1;
        this.$toaster.success(user.name+' joined!!')
    })
    .leaving((user) => {
        this.numberOfUsers-=1;
        this.$toaster.info(user.name+' left')

    });
    }
});