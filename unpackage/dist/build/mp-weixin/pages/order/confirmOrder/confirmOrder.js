(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/confirmOrder/confirmOrder"],{"1fd3":function(r,t,e){"use strict";var n=e("4792"),o=e.n(n);o.a},2237:function(r,t,e){"use strict";e.r(t);var n=e("b5a8"),o=e.n(n);for(var d in n)"default"!==d&&function(r){e.d(t,r,(function(){return n[r]}))}(d);t["default"]=o.a},3068:function(r,t,e){"use strict";(function(r){e("b49f");n(e("66fd"));var t=n(e("9ab1"));function n(r){return r&&r.__esModule?r:{default:r}}r(t.default)}).call(this,e("543d")["createPage"])},4792:function(r,t,e){},"9ab1":function(r,t,e){"use strict";e.r(t);var n=e("a281"),o=e("2237");for(var d in o)"default"!==d&&function(r){e.d(t,r,(function(){return o[r]}))}(d);e("1fd3");var a,i=e("f0c5"),u=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,"ec7fa7aa",null,!1,n["a"],a);t["default"]=u.exports},a281:function(r,t,e){"use strict";var n;e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return d})),e.d(t,"a",(function(){return n}));var o=function(){var r=this,t=r.$createElement,e=(r._self._c,r.orderCom.orderItems?r.__map(r.orderCom.orderItems,(function(t,e){var n=r.__get_orig(t),o=r._f("money")(t.productPrice);return{$orig:n,f0:o}})):null),n=r.orderCom.orderItems?r._f("money")(r.orderCom.orderBase.totalAmount):null;r.$mp.data=Object.assign({},{$root:{l0:e,f1:n}})},d=[]},b5a8:function(r,t,e){"use strict";(function(r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=e("edde"),o=(e("e722"),d(e("e207")),d(e("3ab0")));function d(r){return r&&r.__esModule?r:{default:r}}var a={name:"OrderDetail",mixins:[o.default],data:function(){return{form:"",id:"",order:{},address:{},addressList:[],orderCom:[],memberId:"",addressInfo:{}}},onShow:function(){this.checkLogins(this.init)},onLoad:function(r){this.id=r.id},computed:{},methods:{init:function(){this.initSelAddress(),this.getOrderInfo()},getOrderInfo:function(){var r=this;(0,n.getPreOrderById)(this.id).then((function(t){t.data.orderItems.forEach((function(r){r.productAttr=JSON.parse(r.productAttr)})),r.orderCom=t.data}))},initSelAddress:function(){var t=r.getStorageSync("selectAddress");t&&(this.addressInfo=t)},pays:function(){var t=[];this.orderCom.orderItems.forEach((function(r){var e={cartId:r.cartId,productId:r.productId,productQuantity:r.productQuantity,productSkuId:r.productSkuId};t.push(e)}));var e={addressId:this.addressInfo.id,orderId:this.id,orderItemList:t,payType:0,sourceType:1};(0,n.addConfirmOrder)(e).then((function(t){t.success&&r.navigateTo({url:"/pages/order/confirmOrder/payment/payment?orderId=".concat(t.data.orderId)})}))},doPay:function(){this.checkLogins(this.pays)}}};t.default=a}).call(this,e("543d")["default"])}},[["3068","common/runtime","common/vendor"]]]);