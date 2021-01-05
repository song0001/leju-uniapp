<template>
	<view>
		<view class="address">
			<view class="title">
				等待支付
			</view>
			<view v-if="!addressInfo.name" class="address-des" @tap='selectAddress'>
				去选择收货地址
			</view>
			<view v-else class="address-des" @tap='selectAddress'>
				<view class="send-name">姓名:{{addressInfo.name}} 电话号码: {{addressInfo.phoneNumber}}</view>
				<view class="address">收货地址: {{addressInfo.province}}-{{addressInfo.city}}-{{addressInfo.region}}{{addressInfo.detailAddress}}</view>
			</view>
			
		</view>
		<view class="orderCard">
			<view class="title">
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
						<view class="title">
							{{item.productName}}
						</view>
						<view class="price">
							¥{{item.productPrice}}元
						</view>
					</view>
					<view class="p2">
						<view class="">
							编号:{{item.productSn}}
						</view>
						<view class="">
							x{{item.productQuantity}}
						</view>
					</view>
					<view class="p3">
						规格 :<view class="" v-for="ele in JSON.parse(item.productAttr)">
								{{ele.key}}:{{ele.value}}	
						</view>
					</view>
				</view>
			</view>	
			<view class="total-price">
				合计{{orderBase.totalAmount}}
			</view>
			<view class="btns">
				<view class="btn" @tap='doPay'>
					确认付款
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById,addConfirmOrder
	} from '../../../api/user/order/index.js'
	import mix from "@/mixins/index.js"
	export default {
		mixins:[mix],
		data() {
			return {

				orderId: '',
				orderBase: '',
				orderItems: [],
			// 地址详情
				addressInfo:{}
			};
		},
	
		methods: {
			init() {
				getPreOrderById(this.orderId).then(res => {
					console.log(res)
					this.orderBase = res.data.orderBase
					this.orderItems = res.data.orderItems
				})
				this.initSelAddress()
			},
			// 选择收货地址
			selectAddress(){
				uni.navigateTo({
					url:'/pages/user/address/address?type=select'
				})
				},
				// 初始化预选地址
				initSelAddress(){
					var addressInfo = uni.getStorageSync("selectAddress");
					if(addressInfo){
						this.addressInfo = addressInfo
						console.log(this.addressInfo)
					}
				},
				pays(){
					var orderItemList = [];
					this.orderItems.forEach(ele =>{
						var obj = {
						  "cartId": ele.cartId,
						  "productId": ele.productId,
						  "productQuantity": ele.productQuantity,
						  "productSkuId": ele.productSkuId
						}
						orderItemList.push(obj)
					})
					var obj = {
						  "addressId": this.addressInfo.id,
						  "orderId": this.orderId,
						  "orderItemList": orderItemList,
						  "payType": 0,
						  "sourceType": 1
					}
					addConfirmOrder(obj)
					.then(res =>{
						console.log(res)
						if(res.success){
							uni.navigateTo({
								url: `/pages/user/order/payment/payment?orderId=${res.data.orderId}`
							})
						}
					})
				},
				doPay() {
					this.checkLogins(this.pays);
				}
		},
		onLoad(options) {
			// console.log(options)
			this.orderId = options.id
			this.init()


		},
		onShow() {
			this.checkLogins(this.init);
		}

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
			>.address{
				padding: 0 0;
			}
		}
	}

	.orderCard {
		width: 672rpx;
		box-sizing: border-box;
		padding: 36rpx;
		border-radius: 24rpx;
		background-color: #fff;
		margin: 30rpx auto;
		font-size: 24rpx;
		color: #3e3e3e;

		>.title {
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #f1ece7;
			padding-bottom: 30rpx;
		}

		.sku-block {
			display: flex;
			border-bottom: 2rpx solid #f1ece7;
			padding: 30rpx 0;
			align-items: center;

			image {
				width: 162rpx;
				height: 162rpx;

				flex-shrink: 0;
			}

			.info {
				width: 470rpx;
				margin-left: 28rpx;

				.p1 {
					display: flex;
					justify-content: space-between;
					font-size: 26rpx;
					line-height: 74rpx;
				}

				.p2 {
					display: flex;
					justify-content: space-between;
					font-size: 22rpx;
					color: #8d8d8d;
					line-height: 30rpx;
					margin-top: 4rpx;
				}
				.p3{
					display: flex;
					justify-content: flex-start;	
					font-size: 22rpx;
					    color: #8d8d8d;
					    line-height: 30rpx;
				}
			}
		}
		.total-price{
			    font-size: 26rpx;
			    line-height: 36rpx;
			    text-align: right;
		}
		.btns{
			display: flex;
			justify-content: flex-end;
			margin-top: 20rpx;
		.btn{
			    width: 62px;
			    height: 50rpx;
			    border: 2rpx solid #2d4f43;
			    font-size: 26rpx;
			    border-radius: 10rpx;
			    color: #2d4f43;
			    text-align: center;
			    line-height: 50rpx;
                
		}
		}
	}
</style>
