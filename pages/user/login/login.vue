<template>
	<view>
		<view class="login">
			<view class="header">
				<image src="../../../static/icons/leju-logo.png" mode=""></image>
			</view>
			<!-- 输入框 -->
			<view class="ipt">
				<input class="ipt1" type="text" v-model="value" placeholder="用户名/电话" />
				<input type="password" v-model="pwd" placeholder="密码" />
			</view>
			<!-- 登录 -->
			<button class="debug" @tap="login" type="default">登录</button>
			<!-- 找回密码 -->
			<view class="footer">
				<view class="">
					找回密码
				</view>
				<view class="line">
					|
				</view>
				<view class="">
					注册账号
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 17596496508,
				pwd: 123456
			};
		},
		methods:{
			// 点击登录
			login(){
			uni.setStorageSync("token","18337351522")
				uni.switchTab({
					url:'../user'
					})
				}
			}
	}
</script>

<style lang="scss" scoped>
	

	.header {
		width: 100%;
		height: 160rpx;
		display: flex;
		padding-top: 64px;
		margin-bottom: 36px;
		justify-content: center;
		align-items: center;

		image {
			border-radius: 50%;
			width: 160rpx;
			height: 160rpx;
		}

	}
		.ipt {
			padding: 0 70rpx;
	
			input {
				box-shadow: 0 0 30px 0 rgba(43, 86, 112, .1);
				height: 36rpx;
				color: #333;
			padding: 32rpx;
				margin-top: 48rpx;
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;
			       border-radius: 2.5rem;
			text-indent: 20rpx;
			}
		}
		.debug{
			    background: rgb(53, 78, 68);
			    color: rgb(255, 255, 255);
			    font-size: 30rpx;
			    width: 600rpx;
			    height: 100rpx;
				margin-top: 96rpx;
				    border-radius: 2.5rem;
					    cursor: pointer;
						line-height: 100rpx;
			}
			.footer{
				font-size: 28rpx;
				    margin-top: 64rpx;
				display: flex;
				    color: rgba(0,0,0,.7);
				    text-align: center;
				    height: 20px;
				    line-height: 20px;
				justify-content: center;
				.line{
					margin: 0 10rpx;
					}
				}
</style>
