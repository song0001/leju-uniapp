(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"0563":function(t,r,e){"use strict";(function(t){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=a(e("a34a")),o=a(e("3ab0")),i=e("edde");function a(t){return t&&t.__esModule?t:{default:t}}function c(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void e(s)}c.done?r(u):Promise.resolve(u).then(n,o)}function u(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)}))}}var s={mixins:[o.default],data:function(){return{orderList:[],orderReturnList:[],current:0,headItems:[{name:"待付款",value:"0"},{name:"已付款",value:"1"},{name:"已发货",value:"2"},{name:"已收货",value:"3"},{name:"申请退款",value:"9"}]}},filters:{orderProcessText:function(t){var r="等待处理";switch(JSON.stringify(t)){case"0":r="等待处理";break;case"1":r="确认退货,等待发货";break;case"2":r="已退款";break;case"3":r="已拒绝";break;case"9":r="拒绝退货";break;default:break}return r}},computed:{orderLists:function(){var t=this;return 9==this.current?this.orderReturnList:this.orderList.filter((function(r){return 3==t.current?3==r.order.status||4==r.order.status:r.order.status==t.current}))},statusText:function(){return 0==this.current?"未付款":1==this.current?"等待发货":2==this.current?"已发货":3==this.current?"已收货":9==this.current?"拒绝退货":"暂不知道订单状态"}},methods:{clear:function(){var t=this;this.orderList.forEach((function(r){t.cancleOrder(r.order.id)}))},goBackInfo:function(r){t.navigateTo({url:"/orderPackage/orderBackInfo/orderBackInfo?backOrder=".concat(r)})},goOrderBack:function(r){t.navigateTo({url:"/orderPackage/orderBack/orderBack?id=".concat(r.orderId,"&skuid=").concat(r.id)})},del:function(r){var e=this;(0,i.deleteOrder)(r.order.id).then((function(r){1==r.success&&(t.showToast({title:"删除成功"}),e.init())}))},selectCurrentTab:function(t){this.current=t,this.checkLogins(this.init)},allDone:function(r){var e=this;(0,i.receiveDone)({orderId:r.order.id}).then((function(r){r.success&&(t.showToast({title:"确认收货成功!",duration:1e3}),e.init())}))},cancleOrder:function(r){var e=this;(0,i.cancelOrder)(r).then((function(r){r.success&&(t.showToast({title:"取消订单成功!",duration:1e3}),e.init())}))},goPay:function(r){t.navigateTo({url:"/pages/order/confirmOrder/confirmOrder?id="+r.order.id})},init:function(){var r=this;return u(n.default.mark((function e(){var o,a;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.showLoading({title:"加载中"}),e.next=3,(0,i.findAllOrders)();case 3:return o=e.sent.data.orderList,o.forEach((function(t){t.items.forEach((function(t){"string"!=t.productAttr&&(t.productAttr=JSON.parse(t.productAttr))}))})),e.next=7,(0,i.orderReturnApplys)();case 7:a=e.sent.data.items,a.forEach((function(t){"string"!=t.productAttr&&(t.productAttr=JSON.parse(t.productAttr))})),r.orderReturnList=a,r.orderList=o,t.hideLoading();case 12:case"end":return e.stop()}}),e)})))()}},onLoad:function(t){this.current=t.type},onShow:function(){this.checkLogins(this.init)}};r.default=s}).call(this,e("543d")["default"])},5535:function(t,r,e){"use strict";var n=e("aef4"),o=e.n(n);o.a},"67c6":function(t,r,e){"use strict";e.r(r);var n=e("0563"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(r,t,(function(){return n[t]}))}(i);r["default"]=o.a},"7cf7":function(t,r,e){"use strict";var n;e.d(r,"b",(function(){return o})),e.d(r,"c",(function(){return i})),e.d(r,"a",(function(){return n}));var o=function(){var t=this,r=t.$createElement,e=(t._self._c,9==t.current?t.__map(t.orderLists,(function(r,e){var n=t.__get_orig(r),o=t.orderLists.length>0?t._f("orderProcessText")(r.status):null;return{$orig:n,f0:o}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})},i=[]},"8f41":function(t,r,e){"use strict";(function(t){e("b49f");n(e("66fd"));var r=n(e("ada0"));function n(t){return t&&t.__esModule?t:{default:t}}t(r.default)}).call(this,e("543d")["createPage"])},ada0:function(t,r,e){"use strict";e.r(r);var n=e("7cf7"),o=e("67c6");for(var i in o)"default"!==i&&function(t){e.d(r,t,(function(){return o[t]}))}(i);e("5535");var a,c=e("f0c5"),u=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,"469169d2",null,!1,n["a"],a);r["default"]=u.exports},aef4:function(t,r,e){}},[["8f41","common/runtime","common/vendor"]]]);