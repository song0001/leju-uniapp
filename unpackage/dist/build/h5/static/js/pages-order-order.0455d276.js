(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-order"],{"1da1":function(t,e,r){"use strict";function n(t,e,r,n,i,a,o){try{var c=t[a](o),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,a){var o=t.apply(e,r);function c(t){n(o,i,a,c,s,"next",t)}function s(t){n(o,i,a,c,s,"throw",t)}c(void 0)}))}}r("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"1fb1":function(t,e,r){"use strict";var n=r("87d4"),i=r.n(n);i.a},"3ab0":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={methods:{checkLogins:function(t){this.checkHasLogined()&&t()},checkHasLogined:function(){var t=uni.getStorageSync("leju_token");return!!t||(uni.showModal({title:"登录提示",content:"暂未登录，是否立即登录",success:function(t){t.confirm?uni.navigateTo({url:"/pages/user/login/login"}):uni.showToast({title:"您取消了"})}}),!1)}}},i=n;e.default=i},"5bc8":function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.order-main .head-bar[data-v-3da85592]{width:100%;overflow-y:auto;position:fixed;left:0;top:0;top:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;width:100%;height:%?62?%;padding-top:%?14?%;background-color:#354e44;color:#fff;font-size:%?30?%;line-height:%?62?%;z-index:999}.order-main .head-bar .label uni-radio[data-v-3da85592]{display:none}.order-main .head-bar .label.active[data-v-3da85592]{border-bottom:%?2?% solid #dd524d;color:#dd524d}.order-main .card-list[data-v-3da85592]{margin-top:%?130?%}.order-main .card-list .card[data-v-3da85592]{width:%?672?%;box-sizing:border-box;padding:%?36?%;border-radius:%?24?%;background-color:#fff;margin:%?30?% auto;font-size:%?24?%;color:#3e3e3e}.order-main .card-list .card .order-title[data-v-3da85592]{line-height:%?33?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;border-bottom:1px solid #f1ece7;padding-bottom:%?30?%}.order-main .card-list .card .order-title .status[data-v-3da85592]{color:#034c46}.order-main .card-list .card .sku-block[data-v-3da85592]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;border-bottom:1px solid #f1ece7;padding:%?30?% 0}.order-main .card-list .card .sku-block .img[data-v-3da85592]{width:%?162?%;height:%?162?%;-webkit-flex-shrink:0;flex-shrink:0;background-color:#8f8f94}.order-main .card-list .card .sku-block .info[data-v-3da85592]{width:%?470?%;margin-left:%?28?%}.order-main .card-list .card .sku-block .info .p1[data-v-3da85592],\r\n.order-main .card-list .card .sku-block .info .p2[data-v-3da85592]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.order-main .card-list .card .sku-block .info .p1[data-v-3da85592]{font-size:%?26?%;line-height:37px}.order-main .card-list .card .sku-block .info .p1 .title[data-v-3da85592]{color:#3e3e3e}.order-main .card-list .card .sku-block .info .p1 .price[data-v-3da85592]{colro:#8d8d8d}.order-main .card-list .card .sku-block .info .p2[data-v-3da85592],\r\n.order-main .card-list .card .sku-block .info .p3[data-v-3da85592]{font-size:%?22?%;color:#8d8d8d;line-height:%?30?%;margin-top:%?5?%}.order-main .card-list .card .sku-block .info .p4[data-v-3da85592]{text-align:right;margin-top:%?10?%;color:#8d8d8d;text-decoration:underline}.order-main .card-list .card .total-price[data-v-3da85592]{font-size:%?26?%;line-height:%?37?%;text-align:right;margin-top:%?14?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.order-main .card-list .card .btns[data-v-3da85592]{margin-top:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.order-main .card-list .card .btns .btn[data-v-3da85592]{width:%?124?%;height:%?50?%;border:1px solid #2d4f43;font-size:%?26?%;border-radius:%?10?%;color:#2d4f43;text-align:center;line-height:%?50?%;margin-left:%?32?%}.order-main .card-list .card .btns .btn.btn-closed[data-v-3da85592]{width:auto;padding:0 1em;border-color:#dd524d}',""]),t.exports=e},"67c6":function(t,e,r){"use strict";r.r(e);var n=r("fa05"),i=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},"87d4":function(t,e,r){var n=r("5bc8");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=r("4f06").default;i("5a8fac21",n,!0,{sourceMap:!1,shadowMode:!1})},"96cf":function(t,e){!function(e){"use strict";var r,n=Object.prototype,i=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag",u="object"===typeof t,d=e.regeneratorRuntime;if(d)u&&(t.exports=d);else{d=e.regeneratorRuntime=u?t.exports:{},d.wrap=w;var l="suspendedStart",f="suspendedYield",v="executing",h="completed",p={},y={};y[o]=function(){return this};var g=Object.getPrototypeOf,m=g&&g(g(R([])));m&&m!==n&&i.call(m,o)&&(y=m);var b=C.prototype=x.prototype=Object.create(y);_.prototype=b.constructor=C,C.constructor=_,C[s]=_.displayName="GeneratorFunction",d.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},d.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,C):(t.__proto__=C,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(b),t},d.awrap=function(t){return{__await:t}},L(j.prototype),j.prototype[c]=function(){return this},d.AsyncIterator=j,d.async=function(t,e,r,n){var i=new j(w(t,e,r,n));return d.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},L(b),b[s]="Generator",b[o]=function(){return this},b.toString=function(){return"[object Generator]"},d.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},d.values=R,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(A),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,i){return c.type="throw",c.arg=t,e.next=n,i&&(e.method="next",e.arg=r),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),A(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;A(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:R(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),p}}}function w(t,e,r,n){var i=e&&e.prototype instanceof x?e:x,a=Object.create(i.prototype),o=new T(n||[]);return a._invoke=O(t,r,o),a}function k(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function x(){}function _(){}function C(){}function L(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function j(t){function e(r,n,a,o){var c=k(t[r],t,n);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&i.call(u,"__await")?Promise.resolve(u.__await).then((function(t){e("next",t,a,o)}),(function(t){e("throw",t,a,o)})):Promise.resolve(u).then((function(t){s.value=t,a(s)}),(function(t){return e("throw",t,a,o)}))}o(c.arg)}var r;function n(t,n){function i(){return new Promise((function(r,i){e(t,n,r,i)}))}return r=r?r.then(i,i):i()}this._invoke=n}function O(t,e,r){var n=l;return function(i,a){if(n===v)throw new Error("Generator is already running");if(n===h){if("throw"===i)throw a;return I()}r.method=i,r.arg=a;while(1){var o=r.delegate;if(o){var c=E(o,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=v;var s=k(t,e,r);if("normal"===s.type){if(n=r.done?h:f,s.arg===p)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=h,r.method="throw",r.arg=s.arg)}}}function E(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,E(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=k(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,p;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,p):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function R(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){while(++n<t.length)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:I}}function I(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},ada0:function(t,e,r){"use strict";r.r(e);var n=r("bc33"),i=r("67c6");for(var a in i)"default"!==a&&function(t){r.d(e,t,(function(){return i[t]}))}(a);r("1fb1");var o,c=r("f0c5"),s=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"3da85592",null,!1,n["a"],o);e["default"]=s.exports},bc33:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",{staticClass:"order-main"},[r("v-uni-view",{staticClass:"head-bar"},t._l(t.headItems,(function(e,n){return r("v-uni-view",{key:e.value,staticClass:"label",class:{active:e.value==t.current},on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.selectCurrentTab(e.value)}}},[r("v-uni-view",[t._v(t._s(e.name))])],1)})),1),9!=t.current?r("v-uni-view",{staticClass:"card-list"},[t._l(t.orderLists,(function(e){return t.orderLists.length>0?r("v-uni-view",{key:e.order.id,staticClass:"card"},[r("v-uni-view",{staticClass:"order-title"},[r("v-uni-text",[t._v("订单编号: "+t._s(e.order.orderSn))]),r("v-uni-text",{staticClass:"status"},[t._v(t._s(t.statusText))])],1),t._l(e.items,(function(n,i){return r("v-uni-view",{key:i,staticClass:"sku-block"},[r("v-uni-navigator",{attrs:{url:"/kindPackage/list/info/info?productId="+n.productId}},[r("v-uni-image",{staticClass:"img",attrs:{src:n.productPic,mode:""}})],1),r("v-uni-view",{staticClass:"info"},[r("v-uni-view",{staticClass:"p1"},[r("v-uni-text",{staticClass:"title"},[t._v(t._s(n.productName))]),r("v-uni-text",{staticClass:"price"},[t._v("¥"+t._s(n.productPrice))])],1),r("v-uni-view",{staticClass:"p2"},[r("v-uni-text",[t._v("编号："+t._s(n.id))]),r("v-uni-text",[t._v("x "+t._s(n.productQuantity))])],1),r("v-uni-view",{staticClass:"p3"},[r("v-uni-view",[t._v("规格："),r("br"),t._l(n.productAttr,(function(e,n){return r("v-uni-text",{key:n,staticStyle:{"margin-right":"10rpx"}},[t._v(t._s(e.key)+" : "+t._s(e.value))])}))],2)],1),r("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:2==e.order.status,expression:"item.order.status == 2"}],staticClass:"p4"},[0==n.isReturn?r("v-uni-text",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goOrderBack(n)}}},[t._v("退货")]):t._e(),1==n.isReturn?r("v-uni-text",{staticStyle:{color:"red"}},[t._v("退货中")]):t._e()],1)],1)],1)})),r("div",{staticClass:"total-price"},[r("v-uni-text",[t._v("时间: "+t._s(e.order.createTime))]),r("v-uni-text",[t._v("合计: ¥"+t._s(e.order.totalAmount))])],1),r("div",{staticClass:"btns"},[0==t.current?r("div",{staticClass:"btn btn-cancel-order",on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.cancleOrder(e.order.id)}}},[t._v("取消订单")]):t._e(),0==t.current?r("div",{staticClass:"btn btn-pay",on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.goPay(e)}}},[t._v("付款")]):t._e(),2==t.current?r("div",{staticClass:"btn btn-receive",on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.allDone(e)}}},[t._v("确认收货")]):t._e(),4==e.order.status?r("div",{staticClass:"btn btn-closed",on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.del(e)}}},[t._v("订单已关闭,删除记录")]):t._e()])],2):t._e()})),0==t.orderLists.length?r("v-uni-view",[t._v("暂无数据")]):t._e()],2):r("v-uni-view",{staticClass:"card-list"},[t._l(t.orderLists,(function(e,n){return t.orderLists.length>0?r("v-uni-view",{key:n,staticClass:"card"},[r("v-uni-view",{staticClass:"order-title"},[r("v-uni-text",[t._v("订单编号: "+t._s(e.orderSn))]),r("v-uni-text",{staticClass:"status",style:{color:2==e.status||3==e.status?"red":""},on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.goBackInfo(e.id)}}},[t._v(t._s(t._f("orderProcessText")(e.status)))])],1),r("v-uni-view",{staticClass:"sku-block"},[r("v-uni-navigator",{attrs:{url:"/kindPackage/list/info/info?productId="+e.productId}},[r("v-uni-image",{staticClass:"img",attrs:{src:e.productPic,mode:""}})],1),r("v-uni-view",{staticClass:"info"},[r("v-uni-view",{staticClass:"p1"},[r("v-uni-text",{staticClass:"title"},[t._v(t._s(e.productName))]),r("v-uni-text",{staticClass:"price"},[t._v("¥"+t._s(e.productPrice))])],1),r("v-uni-view",{staticClass:"p2"},[r("v-uni-text",[t._v("编号："+t._s(e.id))]),r("v-uni-text",[t._v("x "+t._s(e.productCount))])],1),r("v-uni-view",{staticClass:"p3"},[r("v-uni-view",[t._v("规格："),r("br"),t._l(e.productAttr,(function(e,n){return r("v-uni-text",{key:n,staticStyle:{"margin-right":"10rpx"}},[t._v(t._s(e.key)+" : "+t._s(e.value))])}))],2)],1)],1)],1),r("div",{staticClass:"total-price"},[r("v-uni-text",[t._v("时间: "+t._s(e.createTime))]),r("v-uni-text",[t._v("合计: ¥"+t._s(e.returnAmount))])],1)],1):t._e()})),0==t.orderLists.length?r("v-uni-view",[t._v("暂无数据")]):t._e()],2)],1)},a=[]},edde:function(t,e,r){"use strict";var n=r("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.getPreOrderById=a,e.addConfirmOrder=o,e.payConfirm=c,e.findAllOrders=s,e.cancelOrder=u,e.receiveDone=d,e.deleteOrder=l,e.getCompanyAddrss=f,e.addOrderReturnApply=v,e.orderReturnApplys=h,e.orderReturnInfo=p;var i=n(r("fe8f"));function a(t){return(0,i.default)({url:"/lejuClient/order/getPreOrderById/".concat(t),method:"get"})}function o(t){return(0,i.default)({url:"/lejuClient/order/addConfirmOrder",method:"post",data:t})}function c(t){return(0,i.default)({url:"/lejuClient/order/payConfirm",method:"post",data:t})}function s(t){return(0,i.default)({url:"/lejuClient/order/findAllOrders",method:"get",data:t})}function u(t){return(0,i.default)({url:"/lejuClient/order/cancelOrder/".concat(t),method:"post"})}function d(t){return(0,i.default)({url:"/lejuClient/order/receiveDone",method:"post",data:t})}function l(t,e){return(0,i.default)({url:"/lejuClient/order/deleteOrder/".concat(t),method:"delete",data:e})}function f(t){return(0,i.default)({url:"/lejuClient/orderReturn/getCompanyAddrss",method:"get",data:t})}function v(t){return(0,i.default)({url:"/lejuClient/orderReturn/addOrderReturnApply",method:"post",data:t})}function h(t){return(0,i.default)({url:"/lejuClient/orderReturn/orderReturnApplys",method:"get",data:t})}function p(t){return(0,i.default)({url:"/lejuClient/orderReturn/".concat(t),method:"get"})}},fa05:function(t,e,r){"use strict";var n=r("4ea4");r("99af"),r("4de4"),r("4160"),r("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r("96cf");var i=n(r("1da1")),a=n(r("3ab0")),o=r("edde"),c={mixins:[a.default],data:function(){return{orderList:[],orderReturnList:[],current:0,headItems:[{name:"待付款",value:"0"},{name:"已付款",value:"1"},{name:"已发货",value:"2"},{name:"已收货",value:"3"},{name:"申请退款",value:"9"}]}},filters:{orderProcessText:function(t){var e="等待处理";switch(JSON.stringify(t)){case"0":e="等待处理";break;case"1":e="确认退货,等待发货";break;case"2":e="已退款";break;case"3":e="已拒绝";break;case"9":e="拒绝退货";break;default:break}return e}},computed:{orderLists:function(){var t=this;return 9==this.current?this.orderReturnList:this.orderList.filter((function(e){return 3==t.current?3==e.order.status||4==e.order.status:e.order.status==t.current}))},statusText:function(){return 0==this.current?"未付款":1==this.current?"等待发货":2==this.current?"已发货":3==this.current?"已收货":9==this.current?"拒绝退货":"暂不知道订单状态"}},methods:{clear:function(){var t=this;this.orderList.forEach((function(e){t.cancleOrder(e.order.id)}))},goBackInfo:function(t){uni.navigateTo({url:"/orderPackage/orderBackInfo/orderBackInfo?backOrder=".concat(t)})},goOrderBack:function(t){uni.navigateTo({url:"/orderPackage/orderBack/orderBack?id=".concat(t.orderId,"&skuid=").concat(t.id)})},del:function(t){var e=this;(0,o.deleteOrder)(t.order.id).then((function(t){1==t.success&&(uni.showToast({title:"删除成功"}),e.init())}))},selectCurrentTab:function(t){this.current=t,this.checkLogins(this.init)},allDone:function(t){var e=this;(0,o.receiveDone)({orderId:t.order.id}).then((function(t){t.success&&(uni.showToast({title:"确认收货成功!",duration:1e3}),e.init())}))},cancleOrder:function(t){var e=this;(0,o.cancelOrder)(t).then((function(t){t.success&&(uni.showToast({title:"取消订单成功!",duration:1e3}),e.init())}))},goPay:function(t){uni.navigateTo({url:"/pages/order/confirmOrder/confirmOrder?id="+t.order.id})},init:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中"}),e.next=3,(0,o.findAllOrders)();case 3:return r=e.sent.data.orderList,r.forEach((function(t){t.items.forEach((function(t){"string"!=t.productAttr&&(t.productAttr=JSON.parse(t.productAttr))}))})),e.next=7,(0,o.orderReturnApplys)();case 7:n=e.sent.data.items,n.forEach((function(t){"string"!=t.productAttr&&(t.productAttr=JSON.parse(t.productAttr))})),t.orderReturnList=n,t.orderList=r,uni.hideLoading();case 12:case"end":return e.stop()}}),e)})))()}},onLoad:function(t){this.current=t.type},onShow:function(){this.checkLogins(this.init)}};e.default=c}}]);