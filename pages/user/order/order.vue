<template>
	<view>
		<view class="address">
			<view class="title">
				等待支付
			</view>
			<view class="address-des">
				新乡市
			</view>
		</view>
		<view class="orderCard">
			<view class="">
				<view class="">
					订单编号:{{orderBase.orderSn}}
				</view>
				<view class="">
					等待支付
				</view>
			</view>

			<view class="sku-block" v-for="item in orderItems" :key='item.id'>
				<!-- productSn -->
				<image :src="item.productPic" mode=""></image>
				<view class="info">
					<view class="p1">

					</view>
					<view class="p2">

					</view>
					<view class="p3">

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById
	} from '../../../api/user/order/index.js'
	export default {
		data() {
			return {
				start: 1,
				limit: 10,
				orderId: '',
				orderBase: '',
				orderItems: []
			};
		},
		methods: {
			init() {
				getPreOrderById(this.orderId).then(res => {
					console.log(res)
					this.orderBase = res.data.orderBase
					this.orderItems = res.data.orderItems
				})
			}
		},
		onLoad(options) {
			// console.log(options)
			this.orderId = options.id
			this.init()


		},

	}
</script>

<style lang="scss" scoped>
	.address {
		padding: 0 60rpx;
		box-sizing: border-box;

		.title {
			font-size: 36rpx;
			color: #494949;
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 2rpx solid #ccc;
		}

		.address-des {
			font-size: 28rpx;
			color: #494949;
			border-bottom: 1px solid #ccc;
			box-sizing: border-box;
			padding: 30rpx 0;
		}
	}
	.orderCard{
		}
</style>
