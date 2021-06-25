import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import {moneyRound} from '@/filters/index.js'
Vue.filter('money',moneyRound)
App.mpType = 'app'

import share from "@/mixins/share.js"

Vue.mixin(share)
const app = new Vue({
    ...App
})
app.$mount()
