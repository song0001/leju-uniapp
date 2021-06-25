<template>
	<view class="mine-main">
		<view class="head">
			<view class="avatar-area">
				<image class="avatar" :src="userInfo.icon" @tap="goUserCenter" mode=""></image>
				<view class="user-info">
					<template v-if="userInfo.nickname">
						<view class="nickname">{{userInfo.nickname}}</view>
						<view class="username">用户名: {{userInfo.username}}</view>
					</template>
					<template v-else>
						<view>Hi~</view>
						<view>您还没有登陆呢</view>
					</template>
					<!-- #ifdef APP-PLUS -->
					<view @tap="getUserInfo">点我获取个人微信头像及昵称</view>
					<!-- #endif -->
					
					
				</view>
			</view>
			<!-- <image class="icon-setting" src="../../static/icons/setting.png" mode="" @tap="goSetting"></image> -->
		</view>
		<view class="btns" v-if="!userInfo.nickname">
			<navigator url="login/register" class="btn btn-reg">注册</navigator>
			<navigator url="login/login" class="btn btn-login">登陆</navigator>
		</view>
		<!-- 我的订单 -->
		<view class="my-orders">
			<view class="title">
				我的订单
			</view>
			<view class="navs">
				<!-- 订单状态  1 已付款 ;  2 已发货; 3: 已收货;   9 申请退款 -->
				<navigator class="nav-item" url="/pages/order/order?type=0">
					<image class="icon" src="../../static/icons/icon-pay.png"></image>
					<view class="text">待付款</view>
				</navigator>
				<navigator class="nav-item" url="/pages/order/order?type=1">
					<image class="icon" src="../../static/icons/pay-done.png"></image>
					<view class="text">已付款</view>
				</navigator>
				<navigator class="nav-item" url="/pages/order/order?type=2">
					<image class="icon" src="../../static/icons/icon-car.png"></image>
					<view class="text">已发货</view>
				</navigator>
				<navigator class="nav-item" url="/pages/order/order?type=3">
					<image class="icon" src="../../static/icons/icon-done.png"></image>
					<view class="text">已收货</view>
				</navigator>
				<navigator class="nav-item" url="/pages/order/order?type=9">
					<image class="icon" src="../../static/icons/icon-back.png"></image>
					<view class="text">售后</view>
				</navigator>
			</view>
		</view>
		<view class="grid-block">
			<view v-for="item in gridList" class="uni-grid-item" :key="item.text">
				<view @tap="navigateTo(item.url,item.text)">
					<image :src="item.img" mode=""></image>
					<text class="text">
						{{item.text}}
					</text>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view  class="uni-grid-item" key="pay">
				
				<view @tap="goPay">
					<image src="../../static/icons/wxpay.png" mode=""></image>
					<text class="text">
						支付0.01元
					</text>
				</view>
			</view>
			<!-- #endif -->
			
			<view  class="uni-grid-item" key="tel">
				
				<view @tap="tel">
					<image src="../../static/icons/tel.png" mode=""></image>
					<text class="text">
						联系客服
					</text>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
		<!-- 	<view  class="uni-grid-item" key="phone">
				
				<view>
					<image src="../../static/icons/call.png" mode=""></image>
					<button class="phoneBtn" type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button>
				</view>
			</view>
			<view  class="uni-grid-item" key="phone">
				
				<view>
					<image src="../../static/icons/call.png" mode=""></image>
					<button class="phoneBtn" @tap="save">保存appid及appsecret</button>
				</view>
			</view> -->
			<!-- #endif -->
			
			<!-- <view  class="uni-grid-item" key="tel">
				
				<view @tap="fingerPrint">
					<image src="../../static/icons/zhiwen.png" mode=""></image>
					<text class="text">
						指纹识别
					</text>
				</view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	
	import mix from "@/mixins/index.js"
	import user from "@/api/user/index.js"
	import WXBizDataCrypt from "@/utils/WXBizDataCrypt.js"
	export default {
		mixins:[mix],
		name: 'Mine',
		data() {
			return {
				user: {
					avatar: ''
				},
				userInfo:{},
				isLogin:false,
				baseUrl:"http://bufantec.com",
				gridList: [{
						url: '/pages/user/collected/collected',
						img: '../../static/icons/save.png',
						text: '商品收藏'
					},
					{
						url: '',
						img: '../../static/icons/brand.png',
						text: '品牌'
					},
					{
						url: '/pages/user/articleList/articleList',
						img: '../../static/icons/article.png',
						text: '文章收藏'
					},
					{
						url: './address/address',
						img: '../../static/icons/address.png',
						text: '地址'
					},
					{
						url: '',
						img: '../../static/icons/card.png',
						text: '卡包'
					},
					{
						url: '/pages/user/car/car',
						img: '/static/icons/cart2.png',
						text: '购物车'
					},
					// {
					// 	url: '',
					// 	img: '../../static/icons/kf.png',
					// 	text: '客服'
					// },
					// {
					// 	url: '/pages/test/test',
					// 	img: '../../static/icons/kf.png',
					// 	text: '测试'
					// }
				]
			}
		},
		onShow() {
			if(this.checkHasLogined()){
				this.init();
			}else{
				console.log(1111111)
				this.userInfo =  {

				}
			}
		},
		methods: {
			goPay(){
					var that = this;
					const serverHost = 'https://bufan.cloud';
					// 1. 获取code
					uni.login({
					  provider: 'weixin',
					  success: function (loginRes) {
						// console.log(loginRes);
						var code = loginRes.code;
						if(code){
							// 2. 给后台发送请求携带code,后台可以获取到openid
							// 接口: /wxlite/user/getUserInfo  
								// - 参数: appid
								// - 参数: code
							uni.request({
								url: `${serverHost}/wxlite/user/getUserInfo?appid=wx533999245c2a4823&code=${code}`,
								method: 'get',
								success: function(res){
									// console.log(res);
									// 拿到openid
									var openid = res.data.data.openid;
									// 3. 发送支付请求,并携带openid  获取支付所需要的pre_payid 等一系列参数
									// 接口:  /wxlite/pay/orderPay
										// - 参数: openid
										// - 参数: total_fee    支付金额,单位分
									uni.request({
										url: `${serverHost}/wxlite/pay/orderPay?openid=${openid}&total_fee=1`,
										success: function(res){
											console.log(res);
											var payOptions = res.data.data;
											// 4. 获取到相关参数 再调用uniapp的微信支付接口
											that.uniPay(payOptions);
										}
									})
								}
							})
						}
					  }
					});
			},
			uniPay(options){
				// 仅作为示例，非真实参数信息。
				uni.requestPayment({
					provider: 'wxpay',
					...options,
					success: function (res) {
						// 要求是 即使这里成功, 也要发送请求跟后台确认订单 如何确认跟后台约定
						console.log('success:' + JSON.stringify(res));
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			save(){
				uni.request({
					url:this.baseUrl + "/wx/liteDev/register",
					data:{
						appId:"wx533999245c2a4823",
						appSecret:""
					},
					success(res) {
						console.log(res);
						if(res.data.code == "success"){
							uni.showToast({
								title:"保存成功",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"保存失败,请检查appid及appsecret是否正确!"
							})
						}
					}
				})
			},
			decryptPhoneNumber(res){
				var _this = this;
				// 注意  小程序的获取用户手机号属于敏感操作 不对个人开发者开放 
				// 获取到的数据是加密数据 如需查看原始手机号码 需要对数据进行解密操作 
				// 参考 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95
				
				// 企业开发者appid
				var appId = 'wx533999245c2a4823'
				// sessionKey 是登录时返回的sessionkey 参考小程序登录
				var sessionKey = ''
				// 需要解密的数据
				var encryptedData = res.detail.encryptedData
				// 加密算法的初始向量
				var iv = res.detail.iv;
				wx.login({
					success(result) {
						wx.request({
							url:_this.baseUrl+"/admin/xy/lite/student/doLogin",
							data:{
								code:result.code,
								appid:appId
							},
							success(res1){
								
								sessionKey = res1.data.data.session_key;
								var pc = new WXBizDataCrypt(appId, sessionKey)
								
								var data = pc.decryptData(encryptedData , iv)
								uni.showToast({
									title:`获取到的手机号为
									${data.phoneNumber}`,
									icon:"none",
									duration:3000
								})
								// console.log('解密后 data: ', data)
							}
						})
					}
				})
			},
			fingerPrint(){
				uni.startSoterAuthentication({
					requestAuthModes:["fingerPrint"],
					authContent:"测试指纹识别",
					challenge:"1",
					success(res){
						console.log(res)
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			tel(){
				uni.makePhoneCall({
					phoneNumber:"18838180363"
				})
			},
			getUserInfo(){
				var _this = this;
				// uni.getProvider获取服务供应商。在App平台，可用的服务商，是打包环境中配置的服务商，与手机端是否安装了该服务商的App没有关系。
				uni.getProvider({
					service:"oauth",
					success(res) {
						if(res.provider.includes("weixin")){ // 判断是否是微信
							uni.login({
								provider:"weixin",
								success(result) { // 登录成功
									uni.getUserInfo({ // 获取个人信息
										provider:"weixin",
										withCredentials:true, // 携带登录态信息
										lang:"zh_CN",
										success(res1) {
											console.log("获取的个人信息为",JSON.stringify(res1))
											_this.userInfo.nickname = res1.userInfo.nickName;
											_this.userInfo.icon = res1.userInfo.avatarUrl;
										},
										fail(res1) {
											uni.showToast({
												title:"获取个人信息失败",
												icon:"none"
											})
										}
									})
								},
								fail(result) {
									console.log("失败",JSON.stringify(result));
									uni.showModal({
										title:"失败",
										content:JSON.stringify(result)
									})
								},
							})
						}
					}
				})
			},
			init(){
				var userData = uni.getStorageSync("leju_user");
				console.log(userData)
				this.userInfo = userData;
			},
			navigateTo(url,text){
				if(url){
					uni.navigateTo({
						url
					})
				}else{
					uni.showToast({
						image:'/static/icons/sorry.png',
						title: text+'功能暂未开通 !'
					})
				}
				 
			},
			goUserCenter(){
				uni.navigateTo({
					url:'./updateUserInfo/updateUserInfo'
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.mine-main {
		box-sizing: border-box;
		padding: 0 40rpx;

		.head {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 150rpx;
			padding-top: 60rpx;

			.avatar-area {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 150rpx;
				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					background-color: #C8C7CC;
				}

				.user-info {
					display: flex;
					margin-left: 32rpx;
					height: 150rpx;
					color: #3D4C46;
					font-size: 28rpx;
					flex-direction: column;
					justify-content: space-around;
					box-sizing: border-box;
					padding: 14rpx 0;
					.nickname{
						font-size: 40rpx;
						font-weight: 600;
					}
					.username{
						font-size: 26rpx;
						color: #999;
					}
				}
			}

			.icon-setting {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.btns {
			margin: 40rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;

			.btn {
				width: 182rpx;
				height: 76rpx;
				box-sizing: border-box;
				border: 1px solid #354E44;
				color: #354E44;
				font-size: 30rpx;
				text-align: center;
				line-height: 76rpx;
				border-radius: 10rpx;
				margin: 0 30rpx;

				&.btn-login {
					background-color: #354E44;
					color: #fff;
				}
			}
		}

		.my-orders {
			width: 670rpx;
			height: 208rpx;
			border-radius: 4rpx;
			background-color: #fff;
			margin-top: 60rpx;

			.title {
				height: 76rpx;
				font-size: 26rpx;
				line-height: 76rpx;
				border-bottom: 1px solid #ddd;
				box-sizing: border-box;
				margin: 0 54rpx;
			}

			.navs {
				padding: 0 54rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-top: 20rpx;
				}

				.text {
					font-size: 26rpx;
					line-height: 37rpx;
					text-align: center;
				}
			}
		}

		.grid-block {
			width: 670rpx;
			margin-top: 60rpx;
			background-color: #fff;
			border-radius: 20rpx;
			text-align: center;
			padding: 30rpx 0 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			
			.uni-grid-item {
				width: 33.33%;
				min-height: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					display: block;
					width: 50rpx;
					height: 50rpx;
					margin: 30rpx auto;
				}
				.phoneBtn{
					background: transparent;
					    font-size: 26rpx;
					line-height: 1.2;
					
				}
				.phoneBtn::after{
					border: none;
				}
				text {
					font-size: 26rpx;
					line-height: 38rpx;
				}

			}
		}
	}
</style>
