(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-updateUserInfo-updateUserInfo"],{"18ed":function(t,e,n){"use strict";n.r(e);var i=n("c0e8"),a=n("db05");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("c4a5");var u,r=n("f0c5"),o=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"28c70204",null,!1,i["a"],u);e["default"]=o.exports},"1e37":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.ipt[data-v-28c70204]{text-align:right}.user-center .item[data-v-28c70204]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?32?%;line-height:%?94?%;box-sizing:border-box;padding:%?10?% %?30?%;border-bottom:1px solid #e5e5e5}.user-center .item[data-v-28c70204]:nth-child(1){margin-top:%?20?%}.user-center .item .avatar[data-v-28c70204]{width:%?120?%;height:%?120?%;border-radius:50%}.user-center .item .label[data-v-28c70204]{color:#494949}.user-center .item .text[data-v-28c70204]{color:#a1a1a1}.user-center .btn-logout[data-v-28c70204]{position:fixed;left:50%;bottom:20%;margin-left:%?-185?%;width:%?370?%;height:%?88?%;font-size:%?32?%;color:#fff;text-align:center;line-height:%?88?%;background:#1c4b47;border-radius:8px}',""]),t.exports=e},2054:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={methods:{checkLogins:function(t){this.checkHasLogined()&&t()},checkHasLogined:function(){var t=uni.getStorageSync("leju_token");return!!t||(uni.showModal({title:"登录提示",content:"暂未登录，是否立即登录",success:function(t){t.confirm?uni.navigateTo({url:"/pages/user/login/login"}):uni.showToast({title:"您取消了"})}}),!1)}}},a=i;e.default=a},"8a50":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.findAllCartItem=d,e.delCartItems=f,e.default=void 0;var a=i(n("127a"));function s(t){return(0,a.default)({url:"/lejuClient/login/doLogin",method:"POST",data:t})}function u(t){return(0,a.default)({url:"/lejuClient/member/register",method:"POST",data:t})}function r(t){return(0,a.default)({url:"/lejuClient/login/getMemberInfo",method:"get",data:t})}function o(t){return(0,a.default)({url:"/lejuClient/login/uploadAvatar",method:"post",data:t})}function l(t){return(0,a.default)({url:"/lejuClient/member/updateMemberInfo",method:"post",data:t})}function c(t){return(0,a.default)({url:"/lejuClient/member/resetPassword/".concat(t),method:"post"})}function d(t){return(0,a.default)({url:"/lejuClient/cart/findAllCartItem",method:"get",data:t})}function f(t){return(0,a.default)({url:"/lejuClient/cart/delCartItems",method:"post",data:t})}var p={doLogin:s,register:u,getMemberInfo:r,uploadAvatar:o,updateMemberInfo:l,resetPassword:c};e.default=p},a7d7:function(t,e,n){var i=n("1e37");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("32b07c0b",i,!0,{sourceMap:!1,shadowMode:!1})},b9ab:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("687c")),s=i(n("2054")),u=i(n("8a50")),r={data:function(){return{userInfo:{},isUpt:!0,img:""}},mixins:[s.default],onShow:function(){this.checkHasLogined()?this.init():this.userInfo={}},methods:{init:function(){var t=uni.getStorageSync("leju_user");this.isUpt=!0,this.userInfo=t},uptUserInfo:function(){var t=this;this.img&&(this.userInfo.icon=this.img),u.default.updateMemberInfo(this.userInfo).then((function(e){1==e.success?(uni.showToast({title:"更新成功,需要重新登录获取最新用户信息"}),setTimeout((function(){t.doLogout()}),1e3)):uni.showToast({title:"更新失败"})}))},upt:function(){this.isUpt=!1},uploadIcon:function(){var t=this;uni.chooseImage({success:function(e){var n=e.tempFilePaths;uni.uploadFile({url:"".concat(a.default,"/lejuClient/login/uploadAvatar"),filePath:n[0],name:"file",formData:{user:"test"},success:function(e){t.img=JSON.parse(e.data).data.fileUrl}})}})},doLogout:function(){uni.clearStorageSync(),uni.showToast({title:"退出成功,跳转到登录页"}),uni.navigateTo({url:"/pages/user/login/login"})}}};e.default=r},c0e8:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"user-center"},[n("v-uni-button",{staticStyle:{float:"right",margin:"10px"},attrs:{type:"default",size:"mini",plain:"true"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.upt.apply(void 0,arguments)}}},[t._v("修改用户信息")]),n("v-uni-view",{staticClass:"item"},[n("v-uni-text",{staticClass:"label"},[t._v("头像")]),t.isUpt?n("v-uni-view",[n("v-uni-image",{staticClass:"avatar",attrs:{src:t.userInfo.icon,mode:""}})],1):n("v-uni-view",{staticStyle:{display:"flex","align-items":"center"}},[t.img?n("v-uni-image",{staticClass:"avatar",attrs:{src:t.img,mode:""}}):n("v-uni-button",{attrs:{type:"default",size:"mini",plain:"true"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.uploadIcon.apply(void 0,arguments)}}},[t._v("上传头像")])],1)],1),n("v-uni-view",{staticClass:"item"},[n("v-uni-text",{staticClass:"label"},[t._v("用户名")]),t.isUpt?n("v-uni-text",{staticClass:"text"},[t._v(t._s(t.userInfo.username))]):t._e()],1),n("v-uni-view",{staticClass:"item"},[n("v-uni-text",{staticClass:"label"},[t._v("昵称")]),t.isUpt?n("v-uni-text",{staticClass:"text"},[t._v(t._s(t.userInfo.nickname))]):n("v-uni-view",[n("v-uni-input",{staticClass:"ipt",attrs:{type:"text",placeholder:"请输入昵称"},model:{value:t.userInfo.nickname,callback:function(e){t.$set(t.userInfo,"nickname",e)},expression:"userInfo.nickname"}})],1)],1),n("v-uni-view",{staticClass:"item"},[n("v-uni-text",{staticClass:"label"},[t._v("手机号")]),t.isUpt?n("v-uni-text",{staticClass:"text"},[t._v(t._s(t.userInfo.phone))]):n("v-uni-view",[n("v-uni-input",{staticClass:"ipt",attrs:{type:"text",placeholder:"请输入手机号"},model:{value:t.userInfo.phone,callback:function(e){t.$set(t.userInfo,"phone",e)},expression:"userInfo.phone"}})],1)],1),t.isUpt?n("v-uni-button",{staticClass:"btn-logout",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.doLogout.apply(void 0,arguments)}}},[t._v("退出登陆")]):n("v-uni-button",{staticClass:"btn-logout",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.uptUserInfo.apply(void 0,arguments)}}},[t._v("更新")])],1)},s=[]},c4a5:function(t,e,n){"use strict";var i=n("a7d7"),a=n.n(i);a.a},db05:function(t,e,n){"use strict";n.r(e);var i=n("b9ab"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a}}]);