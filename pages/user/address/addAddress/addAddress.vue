<template>
  <view>
    <view class="content">
      <view class="row">
        <view class="nominal">收件人</view>
        <view class="input">
          <input placeholder="请输入收件人姓名" type="text" v-model="name" />
        </view>
      </view>
      <view class="row">
        <view class="nominal">电话号码</view>
        <view class="input">
          <input placeholder="请输入收件人电话号码"   type="text" v-model="tel" />
        </view>
      </view>
      <view class="row">
        <view class="nominal">所在地区</view>
        <view class="input" @tap="chooseCity">{{region.label}}</view>
      </view>
      <view class="row">
        <view class="nominal">详细地址</view>
        <view class="input">
          <textarea  v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
        </view>
      </view>
      <view class="row">
        <view class="nominal">设置默认地址</view>
        <view class="input switch">
          <switch color="#354E44" :checked="isDefault" @change="isDefaultChange" />
        </view>
      </view>
      <view class="row last" v-if="editType" @tap="del">
        <view class="del">删除收货地址</view>
      </view>
    </view>
    <view class="save" @tap="save1">
      <view class="btn">保存地址</view>
    </view>
	<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
   
  </view>
</template>

<script>
	import WxValidate from "@/utils/validate.js";
	import simpleAddress from '@/components/simple-address/simple-address.vue';
import {
	findAllAddress,
	updateAddressInfo,
	addAddressInfo,
	switchDefault,
	delAddressInfo
} from "@/api/address/index.js";

export default {
  name: "AddressEdit",
   components: {
          simpleAddress
      },
  data() {
    return {
	cityPickerValueDefault: [0, 0, 1],
      editType: false,
      id: "",
      name: "",
      tel: "",
      detailed: "",
      isDefault: false,
      cityPickerValue: [0,0,0],
	  addressid:"",
      themeColor: "#007AFF",
      region: { label: "请点击选择地址", value: [], cityCode: "" },
      address: {},
	  addressInfo:{},
	  currentError:""
    };
  },
  methods: {
    onCancel(e) {
    },
    chooseCity() {
		this.$refs.simpleAddress.open();
    },
    onConfirm(e) {
		console.log(e)
	  this.region.cityCode = `${e.provinceCode}-${e.cityCode}-${e.areaCode}`;
	  this.region.label = e.labelArr.join("-");
	  this.region.value = e.labelArr;
    },
    isDefaultChange(e) {
      this.isDefault = e.detail.value;
	  if(this.editType){
		  switchDefault(this.addressid,e.detail.value == true?1:0)
		  .then(res =>{
			  if(res.success == true){
				  uni.showToast({
				  	title:"切换默认成功",
					icon:"none"
				  })
			  }
		  })
	  }
    },
    del() {
      uni.showModal({
        title: "删除提示",
        content: "你将删除这个收货地址",
        success: res => {
          if (res.confirm) {
            // 发送请求删除地址
			delAddressInfo(this.addressInfo.id)
			.then(res =>{
				if(res.success == true){
					uni.showToast({
						title:"删除成功"
					});
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					
				}
			})
          } else if (res.cancel) {
          }
        }
      });
    }, 
	save1(){
		const obj = {
			  "city": this.region.value[1],
			  "cityCode": this.region.cityCode,
			  "defaultStatus": this.isDefault ? 1 : 0,
			  "detailAddress": this.detailed,
			  "name": this.name,
			  "phoneNumber": this.tel,
			  "postCode": "",
			  "province": this.region.value[0],
			  "region": this.region.value[2],
			  "tag": ""
			};
			if (!this.WxValidate.checkForm(obj)) {
			  //表单元素验证不通过，此处给出相应提示
			    let error = this.WxValidate.errorList[0];
				
				uni.showToast({
					title:error.msg,
					icon:"none"
				})
			    return false;
			}else{
				
				uni.showLoading({
				  title: "正在提交"
				});
				
				if(this.editType){ // 编辑
					obj.memberId = this.addressInfo.memberId;
					obj.id = this.addressInfo.id
					updateAddressInfo(obj)
					.then(res =>{
						if(res.success == true){
							uni.showToast({
								title:"更新成功"
							});
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					})
					
				}else{ // 新增
					
					addAddressInfo(obj)	
					.then(res =>{
						if(res.success == true){
							uni.showToast({
								title:"添加成功"
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					})
				}
			}
			 
		
		
	
	},
	// 根据id获取地址明细
	getAddressById(id){
		findAllAddress()
		.then(res =>{
			var info = res.data.items.find(ele =>ele.id == id);
			// index 为获取的地址组件所回显时的默认地址下标
			var index = this.$refs.simpleAddress.queryIndex(info.cityCode.split("-"), 'value');
			this.cityPickerValueDefault = index.index;
			console.log(index)
			this.addressInfo = info;
			this.name = info.name;
			this.tel = info.phoneNumber;
			this.region = {
				cityCode:info.cityCode,
				label:`${info.province}-${info.city}-${info.region}`,
				value:[info.province,info.city,info.region]
			};
			this.detailed = info.detailAddress;
			this.isDefault = info.defaultStatus ? true : false;
		})
	},
	initValidate() {
	    let rules = {
	      name: {
	        required: true,
	        rangelength: [2,4]
	      },
		  phoneNumber: {
		    required: true,
		    tel: true
		  },
		  detailAddress:{
			  required: true
		  }
	    }
	
	    let message = {
	      name: {
	        required: '请输入收件人姓名',
	        maxlength: '收件人名称长度为2-4'
	      },
		  phoneNumber: {
		    required: "请输入收件人电话号码",
		    tel: "收件人电话号码格式不正确"
		  },
		  detailAddress:{
			  required: "请填写收件人详细地址"
		  }
	    }
	    //实例化当前的验证规则和提示消息
	    this.WxValidate = new WxValidate(rules, message);
	  }
  },
  onLoad(e) {
	// 如果有addressId 说明是编辑 
	if(e.addressId){
		this.editType = true;
		this.addressid = e.addressId;
		this.getAddressById(e.addressId);
	}else{
		this.editType = false
	}
	
	// 表单验证插件
	// https://www.cnblogs.com/zhangxiaoyong/p/10166951.html
	this.initValidate();
  }
};
</script>
<style lang="scss" scoped>
	.red{
		color: red!important;
	}
.save {
  view {
    display: flex;
  }
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120upx;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
    width: 70%;
    height: 80upx;
    border-radius: 80upx;
    background-color: #354E44;
    color: #fff;
    justify-content: center;
    align-items: center;
    .icon {
      height: 80upx;
      color: #fff;
      font-size: 30upx;
      justify-content: center;
      align-items: center;
    }
    font-size: 30upx;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  view {
    display: flex;
  }
  .row {
    width: 94%;

    margin: 0 3%;
    border-bottom: 1Px solid #ccc;
    .nominal {
      width: 30%;
      height: 120upx;
      font-weight: 200;
      font-size: 30upx;
      align-items: center;
    }
    .input {
      width: 70%;
      padding: 20upx 0;
      align-items: center;
      font-size: 30upx;
      &.switch {
        justify-content: flex-end;
      }
      .textarea {
        margin: 20upx 0;
        min-height: 120upx;
      }
    }
    .del {
      width: 100%;
      height: 100upx;
      justify-content: center;
	  margin-top: 60rpx;
      align-items: center;
      font-size: 36upx;
      color: #fff;
      background-color: #E64340;
      border-bottom: solid 1upx #eee;
    }
  }
  .last{
	  border-bottom: 0;
  }
}
</style>
