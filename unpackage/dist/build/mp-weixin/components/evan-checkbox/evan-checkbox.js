(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/evan-checkbox/evan-checkbox"],{"2ffa":function(e,t,n){"use strict";n.r(t);var i=n("6721"),r=n("5b25");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("decc");var u,a=n("f0c5"),c=Object(a["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);t["default"]=c.exports},"4f46":function(e,t,n){},"5b25":function(e,t,n){"use strict";n.r(t);var i=n("e1da"),r=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},6721:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));try{i={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"ee46"))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},o=[]},decc:function(e,t,n){"use strict";var i=n("4f46"),r=n.n(i);r.a},e1da:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(function(){return resolve(n("ee46"))}.bind(null,n)).catch(n.oe)},r={name:"EvanCheckbox",components:{UniIcons:i},props:{shape:{type:String,default:"round"},value:{type:Boolean,default:!1},label:{type:[String,Number],default:null},disabled:{type:Boolean,default:!1},icon:{type:String,default:null},iconSize:{type:Number,default:16},primaryColor:{type:String,default:"#108ee9"},titleStyle:{type:Object,default:function(){return{}}},preventClick:{type:Boolean,default:!1}},computed:{isGroup:function(){var e=this.getParent();return!!e},isDisabled:function(){return this.isGroup&&this.getParent().disabled||this.disabled},isOverLimit:function(){if(this.isGroup){var e=this.getParent();if(e.max){var t=e.currentValue||[];if(t.length>=e.max)return!0}}return!1},mTitleStlye:function(){var e=this,t=Object.assign({},this.titleStyle||{}),n=Object.keys(t).map((function(n){return"color"===n&&e.disabled?null:"".concat(n,":").concat(t[n])})).filter((function(e){return e}));return n.join(";")},innerBackgroundColor:function(){return this.isDisabled?"#ebedf0":this.currentValue?this.primaryColor:"#fff"},innerBorderColor:function(){return this.isDisabled?"#c8c9cc":this.currentValue?this.primaryColor:"#c8c9cc"},iconColor:function(){return this.isDisabled?"#ebedf0":this.currentValue?this.primaryColor:"#c8c9cc"}},watch:{value:{immediate:!0,handler:function(e){this.currentValue=e}}},data:function(){return{currentValue:null}},methods:{getParent:function(){var e=this.$parent;if(e){var t=e.$options.name;while("EvanCheckboxGroup"!==t){if(e=e.$parent,!e)return null;t=e.$options.name}return e}return null},onCheckboxChange:function(){this.isDisabled||this.preventClick||this.isOverLimit&&!this.currentValue||this.toggleValue()},toggle:function(){this.isDisabled||this.isOverLimit&&!this.currentValue||this.toggleValue()},toggleValue:function(){this.currentValue=!this.currentValue,this.$emit("input",this.currentValue),this.$emit("change",this.currentValue);var e=this.getParent();e&&e.onCheckboxChange(this.label)},setValue:function(e){e=e||[],this.currentValue=e.includes(this.label)},directSetValue:function(e){var t=this.getParent();t&&e!==this.currentValue&&t.onCheckboxChange(this.label,!1)},reverseValue:function(){var e=this.getParent();e&&e.onCheckboxChange(this.label,!1)}},created:function(){var e=this.getParent();e&&this.setValue(e.value)}};t.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/evan-checkbox/evan-checkbox-create-component',
    {
        'components/evan-checkbox/evan-checkbox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2ffa"))
        })
    },
    [['components/evan-checkbox/evan-checkbox-create-component']]
]);
