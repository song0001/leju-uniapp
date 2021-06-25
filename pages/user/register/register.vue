<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">

				<image :src="avatar" @tap="seleAvatar"></image>

			</view>
			<!-- 主体 -->
			<view class="main">

				<wInput v-model="tel" type="text" maxlength="11" placeholder="手机号"></wInput>
				<wInput v-model="password" type="password" maxlength="11" placeholder="登录密码" isShowPass></wInput>
				<wInput v-model="username" type="text" maxlength="11" placeholder="用户名"></wInput>
				<wInput v-model="nickname" type="text" maxlength="11" placeholder="昵称"></wInput>
				<wInput v-model="verCode" type="number" maxlength="4" placeholder="验证码" isShowCode ref="runCode" @setCode="getVerCode()"></wInput>

			</view>

			<wButton text="注 册" :rotate="isRotate" bgColor="#354E44" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import setting from '@/api/baseUrl.js'
	import userApi from '@/api/user/index.js'
	export default {
		data() {
			return {
				//logo图片 base64
				avatar: '/static/icons/leju-logo.png',
				tel: '', // 用户/电话
				password: '', //密码
				verCode: '', //验证码
				nickname: '', // 昵称
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
				username: ''
			}
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
		},
		methods: {
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode() {
				//获取验证码
				if (_this.tel.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}

				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '模拟倒计时触发'
				});

				setTimeout(function() {
					_this.$refs.runCode.$emit('runCode', 0); //假装模拟下需要 终止倒计时
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '模拟倒计时终止'
					});
				}, 3000)
			},
			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
					return false;
				}
				if (this.tel.length != 11) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '手机号不正确'
					});
					return false;
				}
				if (this.username.length < 2) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名长度2~12'
					});
					return false;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return false;
				}
				if (this.verCode.length != 4) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '验证码不正确'
					});
					return false;
				}
				
				_this.isRotate = true
				var obj = {
					  "birthday": "",
					  "city": "",
					  "email": "",
					  "growth": 0,
					  "historyIntegration": 0,
					  "icon": this.avatar,
					  "integration": 0,
					  "isDisabled": 0,
					  "memberLevelId": "",
					  "nickname": this.nickname,
					  "password": this.password,
					  "personalizedSignature": "",
					  "phone": this.tel,
					  "realname": "",
					  "sex": 0,
					  "sourceType": 0,
					  "status": 1,
					  "username": this.username,
					  "wxOpenId": ""
					}
				userApi.register(obj).then(res => {
					if(res.success == true){
						uni.showToast({
							title: '注册成功!'
						})
						setTimeout(()=>{
							uni.redirectTo({
									url: '/pages/user/login/login'
								})
						},1000)
						
					}
					// if (res.code = 'S') {
					// 	uni.showToast({
					// 		title: '注册成功!'
					// 	})
					// 	uni.redirectTo({
					// 		url: './login'
					// 	})
					// } else {
					// 	uni.showToast({
					// 		title: res.msg
					// 	})
					// }
					_this.isRotate = false
				}).catch(err => {
					//consolelelelele.log(err);
				})

			},
			seleAvatar() {
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function(res) {
						// 选择到图片 可以执行上传 
						uni.uploadFile({
							url: `${setting}/lejuClient/login/uploadAvatar`, //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],  // 可以同时选择多张图片的
							name: 'file', // 如果是图片上传,后台回通过key=value获取value,图片的name一般是file
							fileType: 'image/video/audio',
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								var res2 = JSON.parse(uploadFileRes.data).data.fileUrl;
								that.avatar = res2;
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	
</style>
<style lang="scss" scoped>
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
