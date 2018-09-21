// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import tp from "tp-eosjs"
import _ from 'lodash'
import './base/_main.scss'

import { Tab, Tabs, Button, Field, CellGroup, NumberKeyboard } from 'vant';

import VConsole from 'vconsole';
const vConsole = new VConsole();


Vue.config.productionTip = false;

Vue.prototype.$tp = tp;
Vue.prototype.$_ = _;

Vue.use(Tab).use(Tabs).use(Button).use(Field).use(CellGroup).use(NumberKeyboard);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
