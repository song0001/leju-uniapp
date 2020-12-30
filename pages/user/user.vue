<template>
	<view>
		<!-- 登录时显示头像 -->
		<view class="header" v-if="isShow">
			<view class="login">
				<view class="avator" @tap=goUpdateUserInfo>
					<image :src="icon" mode=""></image>
				</view>
				<view class="info">
					<view class="nickname">
						{{nickname}}
					</view>
					<view class="username">
					用户名:{{username}}	
					</view>
				</view>
			</view>
		</view>
		<!-- 未登录显示 -->
		<view class="" v-else>
			<view class="header">
				<view class="nologin">
					<view class="avator">
					</view>
					<view class="tishi">
						<view class="">
							hi~
						</view>
						你还没有登录呢
					</view>
				</view>
				<view class="shezhi">
					<image src="../../static/icons/setting.png" mode=""></image>
				</view>

			</view>
			<view class="btns">
				<button class="zc" type="default">注册</button>
				<button class="dl" @tap="login" type="default">登录</button>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="order">
			<view class="title">
				我的订单
			</view>
			<view class="bottom">
				<view class="item">
					<image src="../../static/icons/icon-pay.png" mode=""></image>
					<view class="">
						待付款
					</view>
				</view>
				<view class="item">
					<image src="../../static/icons/pay-done.png" mode=""></image>
					<view class="">
						已付款
					</view>
				</view>
				<view class="item">
					<image src="../../static/icons/icon-car.png" mode=""></image>
					<view class="">
						已发货
					</view>
				</view>
				<view class="item">
					<image src="../../static/icons/icon-done.png" mode=""></image>
					<view class="">
						已收货
					</view>
				</view>
				<view class="item">
					<image src="../../static/icons/icon-back.png" mode=""></image>
					<view class="">
						售后
					</view>
				</view>
			</view>
		</view>

		<view class="grid">
			<view class="item">
				<image src="../../static/icons/save.png" mode=""></image>
				<view class="title">
					商品收藏
				</view>
			</view>
			<view class="item">
				<image src="../../static/icons/brand.png" mode=""></image>
				<view class="title">
					品牌
				</view>
			</view>
			<view class="item">
				<image src="../../static/icons/article.png" mode=""></image>
				<view class="title">
					文章收藏
				</view>
			</view>
			<view class="item">
				<image src="../../static/icons/address.png" mode=""></image>
				<view class="title">
					地址
				</view>
			</view>
			<view class="item">
				<image src="../../static/icons/card.png" mode=""></image>
				<view class="title">
					卡包
				</view>
			</view>
			<view class="item" @tap='goCar'>
				<image src="../../static/icons/cart2.png" mode=""></image>
				<view class="title">
					购物车
				</view>
			</view>
			<view class="item">
				<image src="../../static/icons/tel.png" mode=""></image>
				<view class="title">
					联系客服
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import login from "../../api/login.js"
	import {getMemberInfo} from "../../api/user/index.js"
	export default {
		data() {
			return {
				isShow: false,
				nickname:'',
				username:'',
				icon:''
			};
		},
		methods:{
			// 点击登录
			login(){
				// this.isShow=true
				uni.navigateTo({
					url:"./login/login"
				})
				},
				// 点击修改用户信息
				goUpdateUserInfo(){
					uni.navigateTo({
						url:"./updateUserInfo/updateUserInfo"
					})
					},
					// 点击跳转到购物车
					goCar(){
						uni.navigateTo({
							url:"./car/car"
						})
						}
			},
	     onShow(){
			 var token=uni.getStorageSync("token")
			 if(token){
				 getMemberInfo().then(res=>{
					 console.log(res)
					// uni.setStorageSync("UserInfo",res.data.userInfo)
					 this.nickname=res.data.userInfo.nickname
					 this.username=res.data.userInfo.username
					 this.icon=res.data.userInfo.icon
					 })
				 this.isShow=true
				 }
			login.onShow()
			 }
			
	}
</script>

<style lang="scss" scoped>
	.header {
		margin: 0 auto;
		width: 670rpx;
		height: 150rpx;
		padding-top: 60rpx;
		display: flex;
		margin-bottom: 60rpx;
		justify-content: space-between;
		// 登录
.login{
	display: flex;
	justify-content: flex-start;
	
	.avator {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background-color: blue;
		margin-right: 32rpx;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
			}
	}
	.info{
		display: flex;
		    font-size: 14px;
		flex-direction: column;
		justify-content: center;
		.username{
			    font-size: 26rpx;
			    color: #999;
		}
		.nickname{
			font-size: 40rpx;
			font-weight: 600;
		}
		   
		}
	}
	// 未登录
		.nologin {
			display: flex;
			justify-content: flex-start;

			.avator {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background-color: #c8c7cc;
				margin-right: 32rpx;
			
			}

			.tishi {
				    font-size: 14px;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}

		.shezhi {
			width: 50rpx;
			height: 50rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.btns {
		display: flex;
		justify-content: center;

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 182rpx;
			height: 76rpx;
			margin: 0 30rpx 52rpx;
			border-radius: 10rpx;
		}

		.zc {
			font-size: 30rpx;
			color: #3D4C46;
			border: 2rpx solid #3D4C46;
		}

		.dl {
			font-size: 30rpx;
			color: #FFFFFF;
			background: #354E44;
			background-color: #354E44;
		}
	}

	.order {
		width: 670rpx;
		height: 208rpx;
		background-color: #fff;
		margin: 0 auto;
		border-radius: 4rpx;
		padding: 0 54rpx;
		box-sizing: border-box;

		.title {
			height: 74rpx;
			font-size: 26rpx;
			line-height: 74rpx;
			border-bottom: 2rpx solid #ddd;
		}

		.bottom {
			display: flex;
			justify-content: space-between;

			.item {
				margin-top: 20rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				font-size: 26rpx;
				line-height: 52rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}

	.grid {
		width: 335px;
		height: 600rpx;
		margin: 30px auto 0;
		background-color: #fff;
		border-radius: 10px;
		text-align: center;
		padding: 15px 0 30px;
		display: flex;
		flex-wrap: wrap;

		.item {
			width: 33.33%;
			height: 200rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;

			.title {
				font-size: 26rpx;
				line-height: 38rpx;
				margin-top: 20rpx;
			}

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
</style>
