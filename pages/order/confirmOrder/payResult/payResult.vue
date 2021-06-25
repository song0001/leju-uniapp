<template>
	<view>
		<view class="icon">
			<image src="/static/img/success.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="pay-amount">
			支付金额:{{price | money}}
		</view>
		<view class="back">
			<view class="btn" @tap="toUser">个人中心</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:0
			};
		},
		onLoad(e) {
			this.price = e.price;
		},
		methods: {
			toUser() {
				uni.switchTab({
					url: '/pages/user/user'
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	view{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
.icon{
	width: 100%;
	margin-top: 10vw;
	image{
		width: 25vw;
		height: 25vw;
	}
}
.tis{
	width: 100%;
	margin-top: 20upx;
	font-size: 48upx;
}
.pay-amount{
	width: 100%;
	margin-top: 10upx;
	font-size: 32upx;
}
.back{
	position: absolute;
	width: 100%;
	bottom: 80upx;
	.btn{
		padding: 0 50upx;
		height: 70upx;
		border: solid 2upx #354E44;
		color: #354E44;
		align-items: center;
		border-radius: 10upx;
		font-size: 34upx;
	}
}
</style>
