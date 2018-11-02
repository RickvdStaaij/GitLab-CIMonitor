import Vue from 'vue';
import VueSocketIo from 'vue-socket.io-extended';
import io from 'socket.io-client';

import Dashboard from './components/dashboard';

Vue.use(VueSocketIo, io());

Vue.component(`dashboard`, Dashboard);

new Vue({
    el: '#app',
    sockets: {
        connect() {
            console.log('Socket connected.');
        },
        disconnect() {
            console.log('Socket disconnected :(');
        },
    },
});
