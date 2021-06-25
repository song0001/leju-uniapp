<template>
	<div class="order-detail" v-if="orderCom.orderItems">
		<div class="order-status">等待支付</div>
		<navigator v-if="!addressInfo.name" class="address-block" open-type="navigate" :url="`/pages/user/address/address?type=select`">
			<view>去选择收货地址</view>
		</navigator>
		<navigator v-else class="address-block" open-type="navigate" :url="`/pages/user/address/address?type=select`">
			<div class="send-name">姓名:{{addressInfo.name}} 电话号码: {{addressInfo.phoneNumber}}</div>
			<div class="address">收货地址: {{addressInfo.province}}-{{addressInfo.city}}-{{addressInfo.region}}{{addressInfo.detailAddress}}</div>
		</navigator>
		<div class="order-card">
			<div class="order-title">
				<text>订单编号: {{orderCom.orderBase.orderSn}}</text>
				<text class="status">等待支付</text>
			</div>
			<div class="sku-block" v-for="item in orderCom.orderItems" :key="item.id">
				<image class="img" :src="item.productPic" mode=""></image>
				<div class="info">
					<div class="p1">
						<text class="title">{{item.productName}}</text>
						<text class="price">¥{{item.productPrice | money}}</text>
					</div>
					<div class="p2">
						<text>编号：{{item.productSn}}</text>
						<text>x {{item.productQuantity}}</text>
					</div>
					<div class="p3">
						<text>规格：</text> 
						<text style="margin-right: 4rpx;" v-for="(ele,idx) in item.productAttr" :key="idx">{{ ele.key }} : {{ ele.value }} </text>
					</div>
				</div>
			</div>
			

			<div class="total-price">
				<text>合计: {{orderCom.orderBase.totalAmount | money}}</text>
			</div>
			<!-- buttons -->
			<div class="btns">
				<div class="btn" @click="doPay">确认付款</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getPreOrderById , addConfirmOrder} from '@/api/order/index'
	import {findAllAddress} from '@/api/address/index.js'
	import NP from 'number-precision'
	import mix from "@/mixins/index.js"
	const LEJU_ORDER_KEY = 'leju_order';
	export default {
		name: 'OrderDetail',
		mixins:[mix],
		data() {
			return {
				form:'', // 是否来源于购物车
				// 
				id:"",
				order: {},
				address: {},
				addressList:[],
				orderCom:[],
				memberId:"",
				addressInfo:{}
			}
		},
		onShow(){
			this.checkLogins(this.init);
		},
		onLoad(e) {
			// this.from = e.id;
			// this.memberId = e.memberId;
			this.id = e.id;
		},
		computed: {
			// orderCom() {
			// 	return this.$store.state.order.tempOrder
			// },
			
		},
		methods: {
			init(){
				/*
				 * 进入订单确认页 
				 * 1. 先判断本地是否有以前存储过的地址选择的数据
				 * 2. 如果有 那就使用本地的数据
				 * 3. 如果没有  去地址列表页选择数据	
				 */
				this.initSelAddress();
				this.getOrderInfo()
			},
			getOrderInfo(){
				getPreOrderById(this.id)
				.then(res =>{
					res.data.orderItems.forEach(ele =>{
						ele.productAttr = JSON.parse(ele.productAttr)
					})
					this.orderCom = res.data;
				})
			},
			// 初始化预选地址
			initSelAddress(){
				var addressInfo = uni.getStorageSync("selectAddress");
				if(addressInfo){
					this.addressInfo = addressInfo
				}
			},
			pays(){
				var orderItemList = [];
				this.orderCom.orderItems.forEach(ele =>{
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
					  "orderId": this.id,
					  "orderItemList": orderItemList,
					  "payType": 0,
					  "sourceType": 1
				}
				addConfirmOrder(obj)
				.then(res =>{
					if(res.success){
						uni.navigateTo({
							url: `/pages/order/confirmOrder/payment/payment?orderId=${res.data.orderId}` 
						})
					}
				})
			},
			doPay() {
				this.checkLogins(this.pays);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-detail {
		.order-status {
			font-size: 36rpx;
			color: #494949;
			height: 88rpx;
			border-bottom: 1px solid #ccc;
			line-height: 88rpx;
			margin: 0 60rpx;
			box-sizing: border-box;
		}

		.address-block {
			font-size: 28rpx;
			color: #494949;
			border-bottom: 1px solid #ccc;
			margin: 0 60rpx;
			box-sizing: border-box;
			padding: 30rpx 0;
		}

		.order-card {
			width: 672rpx;
			box-sizing: border-box;
			padding: 36rpx;
			border-radius: 24rpx;
			background-color: #fff;
			margin: 30rpx auto;
			font-size: 24rpx;
			color: #3E3E3E;

			.order-title {
				line-height: 33rpx;
				display: flex;
				justify-content: space-between;

				.status {
					color: #034C46;
				}

				border-bottom: 1px solid #F1ECE7;
				padding-bottom: 30rpx;
			}

			.sku-block {
				display: flex;
				justify-content: flex-start;
				border-bottom: 1px solid #F1ECE7;
				padding: 30rpx 0;

				.img {
					width: 162rpx;
					height: 162rpx;
					flex-shrink: 0;
					background-color: #8F8F94;
				}

				.info {
					width: 470rpx;
					margin-left: 28rpx;

					.p1,
					.p2 {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.p1 {
						font-size: 26rpx;
						line-height: 37px;

						.title {
							color: #3E3E3E;
						}

						.price {
							colro: #8D8D8D;
						}
					}

					.p2,
					.p3 {
						font-size: 22rpx;
						color: #8D8D8D;
						line-height: 30rpx;
						margin-top: 5rpx;
					}

					.p4 {
						text-align: right;
						margin-top: 10rpx;
						color: #8D8D8D;
						text-decoration: underline;
					}

				}
			}

			.total-price {
				font-size: 26rpx;
				line-height: 37rpx;
				text-align: right;
				margin-top: 14rpx;
			}

			.btns {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-end;

				.btn {
					width: 124rpx;
					height: 50rpx;
					border: 1px solid #2D4F43;
					font-size: 26rpx;
					border-radius: 10rpx;
					color: #2D4F43;
					text-align: center;
					line-height: 50rpx;
					margin-left: 32rpx;
				}
			}

		}
	}
</style>
