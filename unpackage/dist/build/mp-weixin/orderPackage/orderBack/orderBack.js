(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["orderPackage/orderBack/orderBack"],{"050a":function(t,n,e){"use strict";var r=e("1375"),o=e.n(r);o.a},1375:function(t,n,e){},2886:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return r}));var o=function(){var t=this,n=t.$createElement;t._self._c},i=[]},a31a:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(e("a34a")),o=e("edde"),i=a(e("fa6b"));function a(t){return t&&t.__esModule?t:{default:t}}function u(t,n,e,r,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void e(s)}u.done?n(c):Promise.resolve(c).then(r,o)}function c(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var i=t.apply(n,e);function a(t){u(i,r,o,a,c,"next",t)}function c(t){u(i,r,o,a,c,"throw",t)}a(void 0)}))}}function s(t){return m(t)||l(t)||f(t)||d()}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(t,n){if(t){if("string"===typeof t)return p(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?p(t,n):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function m(t){if(Array.isArray(t))return p(t)}function p(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var h={name:"OrderBack",data:function(){return{product:{},status:"1",reason:"",description:"",companyList:[],current:0,count:9,returnCount:0,name:"file",url:i.default+"/lejuClient/orderReturn/uploadImg",header:{},obj:{proofPics:""},backOrder:{},skuid:"",initImgList:[],orderInfo:{}}},computed:{},onLoad:function(n){n.id?(this.skuid=n.skuid,this.orderReturnInfo(n.id),this.getCompanyList()):t.showToast({title:"获取退单信息失败,请返回重试!"})},methods:{delImg:function(t){var n=this.initImgList.findIndex((function(n){return n==t}));this.initImgList.splice(n,1)},selectImg:function(){var n=this;t.chooseImage({success:function(e){var r,o=e.tempFiles,i=o.find((function(t){return t.size>1048576}));o.length>3?t.showToast({title:"一次选择最多不能超过3张",icon:"none"}):i?t.showToast({title:"单个图片大小不能超过1m"}):o.length+n.initImgList.length>3?t.showToast({title:"图片总个数不能超过3张",icon:"none"}):(r=n.initImgList).push.apply(r,s(e.tempFilePaths))}})},orderReturnInfo:function(t){var n=this;(0,o.getPreOrderById)(t).then((function(t){console.log(t),t.data.orderItems.forEach((function(t){t.productAttr=JSON.parse(t.productAttr)}));var e=t.data.orderItems.find((function(t){return t.id==n.skuid}));t.data.orderItems=[e],n.orderInfo=t.data}))},bindPickerChange:function(t){this.current=t.detail.value},getCompanyList:function(){var t=this;(0,o.getCompanyAddrss)().then((function(n){t.companyList=n.data.items}))},selectAddress:function(t){var n=t.detail.value;this.current=n},upLoadImage:function(){var n=this;t.showLoading();var e=[];return this.initImgList.forEach((function(r,o){var i=new Promise((function(e,o){t.uploadFile({url:n.url,filePath:r,name:n.name,success:function(t){e(t)},fail:function(t){o(t)}})}));e.push(i)})),e},doBack:function(){var n=this;return c(r.default.mark((function e(){var i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.upLoadImage();case 2:i=e.sent,Promise.all(i).then((function(e){t.hideLoading(),e.forEach((function(t){t.data=JSON.parse(t.data)}));var r=e.filter((function(t){return 0==t.data.success}));if(0!=r.length)t.showToast({title:"请检查网络之后重试!",icon:"none"});else{var i=e.map((function(t){return t.data.data.fileUrl}));console.log(i);var a={companyAddressId:n.companyList[n.current].id,count:n.orderInfo.orderItems[0].productQuantity,description:n.description,orderId:n.orderInfo.orderBase.id,orderItemId:n.orderInfo.orderItems[0].id,proofPics:i.join(","),reason:n.reason};(0,o.addOrderReturnApply)(a).then((function(n){1==n.success&&(t.showToast({title:"申请退货成功!"}),t.navigateTo({url:"/pages/mine/order/index?type=9"}))}))}}));case 4:case"end":return e.stop()}}),e)})))()}}};n.default=h}).call(this,e("543d")["default"])},ac2e:function(t,n,e){"use strict";(function(t){e("b49f");r(e("66fd"));var n=r(e("fb6d"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f1d0:function(t,n,e){"use strict";e.r(n);var r=e("a31a"),o=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);n["default"]=o.a},fb6d:function(t,n,e){"use strict";e.r(n);var r=e("2886"),o=e("f1d0");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("050a");var a,u=e("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"40de939d",null,!1,r["a"],a);n["default"]=c.exports}},[["ac2e","common/runtime","common/vendor"]]]);