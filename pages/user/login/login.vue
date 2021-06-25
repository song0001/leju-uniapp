<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../../static/icons/leju-logo.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名/电话"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<wButton bgColor="#354E44" text="登 录" :rotate="isRotate" @click.native="startLogin()"></wButton>

			<!-- 其他登录 -->
			<!-- <view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view> -->

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="../resetPassword/resetPassword" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="/pages/user/register/register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import userApi from '@/api/user/index.js'
	 
	
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '',
				phoneData: '17596496508', //用户/电话
				passData: '123456', //密码
				isRotate: false, //是否加载旋转
				user: {}
			};
		},
		components: {
			wInput,
			wButton,
		},
		methods: {
			login(){
				return new Promise((resolve,rej)=>{
					userApi.doLogin({
						username:this.phoneData,
						password:this.passData
					}).then(res=>{
						if(res.success == true){
							// 清除旧信息
							uni.clearStorageSync();
							uni.setStorageSync("leju_token",res.data.token);
							resolve(true)
						}else{
							rej(false)
						}
					})
				})
			},
			getUserInfo(){
				return new Promise((resolve,reject)=>{
					userApi.getMemberInfo()
					.then(res =>{
						if(res.success == true){
							uni.setStorageSync("leju_user",res.data.userInfo);
							uni.showToast({
								title:"登录成功,1s后跳转到个人中心"
							})
							setTimeout(()=>{
								uni.switchTab({
									url: '/pages/user/user'
								})
							},1000)
							
							resolve()
						}else{
							reject()
						}
					})
					
				})
			},
			async startLogin() {
				var _this = this;
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}


				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)
				// uni.showLoading({
				// 	title: '登录中'
				// });
				var result = await this.login();
				if(result){
					await this.getUserInfo();
				}else{
					uni.showToast({
						title:"登录失败,请检查用户名和密码!"
					})
				}

			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../../../components/watch-login/css/icon.css");
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128upx; */
	}
	
	/* 头部 logo */
	.header {
		width:161upx;
		height:161upx;
		box-shadow:0upx 0upx 60upx 0upx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #000000; 
		margin-top: 128upx;
		margin-bottom: 72upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	.tips {
		color: #999999;
		font-size: 28upx;
		margin-top: 64upx;
		margin-left: 48upx;
	}
	
	/* 其他登录方式 */
	.other_login{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 156upx;
		text-align: center;
	}
	.login_icon{
		border: none;
		width: 64rpx;
		height: 64rpx;
		font-size: 64upx;
		margin: 0 64upx 0 64upx;
		color: rgba(0,0,0,0.7);
		background-color: #fff;
		border-radius: 32rpx;
	}
	.wechat_color{
		color: #83DC42;
	}
	.weibo_color{
		color: #F9221D;
	}
	.github_color{
		color: #24292E;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-top: 64upx;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.footer text{
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>
