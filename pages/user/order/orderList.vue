<template>
	<view  class="order-main">
		
		<view class="head-bar">
			<view class="label" @tap="selectCurrentTab(item.value)" :class="{ active: item.value == current }" v-for="(item, index) in headItems" :key="item.value">
				<view>{{ item.name }}</view>
			</view>
		</view>
		<view class="card-list" v-if="current != 9">
			<view class="card" v-if="orderLists.length > 0" v-for="item in orderLists" :key="item.order.id">
				<view class="order-title">
					<text>订单编号: {{ item.order.orderSn }}</text>
					<text class="status">{{ statusText }}</text>
				</view>
				<view class="sku-block" v-for="(sku, index) in item.items" :key="index">
					<navigator :url="'/kindPackage/list/info/info?productId=' + sku.productId">
						<image class="img" :src="sku.productPic" mode=""></image>
					</navigator>
					<view class="info">
						<view class="p1">
							<text class="title">{{ sku.productName }}</text>
							<!-- 后台需要添加skuprice -->
							<text class="price">¥{{ sku.productPrice  }}</text>
						</view>
						<view class="p2">
							<!-- 是商品编号,非商品id!! -->
							<text>编号：{{ sku.id }}</text>
							<text>x {{ sku.productQuantity }}</text>
						</view>
						<view class="p3">
							<view>
								规格：<br />
								<text style="margin-right: 10rpx;" v-for="(ele,idx) in sku.productAttr" :key="idx">{{ ele.key }} : {{ ele.value }}
								</text>
				
							</view>
						</view>
						<view v-show="item.order.status == 2" class="p4">
							<text v-if="sku.isReturn == 0" @tap="goOrderBack(sku)">退货</text>
							<text  v-if="sku.isReturn == 1"  style="color: red;" >退货中</text>
						</view>
					</view>
				
				</view>
				<view class="total-price">
					<text>时间: {{ item.order.createTime }}</text>
					<text>合计: ¥{{ item.order.totalAmount }}</text>
				</view>
				<!-- buttons -->
				<view class="btns">
					<!-- <button type="default" @tap="clear">清除所有未支付的订单</button> -->
					<view class="btn btn-cancel-order" @click="cancleOrder(item.order.id)" v-if="current == 0">取消订单</view>
					<view class="btn btn-pay" @click="goPay(item)" v-if="current == 0">付款</view>
					<view class="btn btn-receive" @click="allDone(item)" v-if="current == 2">确认收货</view>
					<view class="btn btn-closed" @tap="del(item)" v-if="item.order.status == 4">订单已关闭,删除记录</view>
				</view>
			</view>
			<view  v-if="orderLists.length == 0">
				暂无数据
			</view>
		</view>
		<view class="card-list" v-else>
			<view class="card" v-if="orderLists.length > 0" v-for="(item,index) in orderLists" :key="index">
				<view class="order-title">
					<text>订单编号: {{ item.orderSn }}</text>
					<text class="status" @tap="goBackInfo(item.id)" :style="{color:(item.status == 2 || item.status ==3) ? 'red' : ''  }">{{  item.status | orderProcessText }}</text>
					
				</view>
				<view class="sku-block">
					<navigator :url="'/kindPackage/list/info/info?productId=' + item.productId">
						<image class="img" :src="item.productPic" mode=""></image>
					</navigator>
					<view class="info">
						<view class="p1">
							<text class="title">{{ item.productName }}</text>
							<!-- 后台需要添加skuprice -->
							<text class="price">¥{{ item.productPrice  }}</text>
						</view>
						<view class="p2">
							<!-- 是商品编号,非商品id!! -->
							<text>编号：{{ item.id }}</text>
							<text>x {{ item.productCount }}</text>
						</view>
						<view class="p3">
							<view>
								规格：<br />
								<text style="margin-right: 10rpx;" v-for="(ele,idx) in item.productAttr" :key="idx">{{ ele.key }} : {{ ele.value }}
								</text>
				
							</view>
						</view>
					</view>
				
				</view>
				<view class="total-price">
					<text>时间: {{ item.createTime }}</text>
					<text>合计: ¥{{ item.returnAmount }}</text>
				</view>
				
			</view>
			<view  v-if="orderLists.length == 0">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	import mix from "@/mixins/index.js"
	import {findAllOrders,
		cancelOrder,
		receiveDone,
		deleteOrder,
		orderReturnApplys} from '../../../api/user/order/index.js'
	export default {
			mixins:[mix],
		data() {
			return {
				// 订单列表
				orderList:[],
				// 退单列表
				orderReturnList:[],
				current:0, // 当前筛选的订单状态 
				headItems: [
					{
						name: '待付款',
						value: '0'
					},
					{
						name: '已付款',
						value: '1'
					},
					{
						name: '已发货',
						value: '2'
					},
					{
						name: '已收货',
						value: '3'
					},
					{
						name: '申请退款',
						value: '9'
					}
				],
			};
		},
		filters:{
			orderProcessText(process) {
				var text = '等待处理';
				switch (JSON.stringify(process)) {
					case '0':
						text = '等待处理';
						break;
					case '1':
						text = '确认退货,等待发货';
						break;
					case '2':
						text = '已退款';
						break;
					case '3':
						text = '已拒绝';
						break;
					case '9':
						text = '拒绝退货';
						break;
		
					default:
						break;
				}
				return text;
			}
		},
		computed:{
			// 对订单进行筛选  选择符合条件的数据
			orderLists(){
				if(this.current == 9){
					return this.orderReturnList
				}else{
					return this.orderList.filter(ele =>{
						if(this.current == 3){
							return ele.order.status == 3 || ele.order.status == 4
						}else{
							return ele.order.status == this.current
						}
						
					})
				}
				
			},
			// 删选当前订单状态对应的文字内容  0、1、2、3、9
			statusText(){
				if(this.current == 0){
					return "未付款"
				}else if(this.current == 1){
					return "等待发货"
				}else if(this.current == 2){
					return "已发货"
				}else if(this.current == 3){
					return "已收货"
				}else if(this.current == 9){
					return "拒绝退货"
				}else{
					return "暂不知道订单状态"
				}
				
			}
		},
		methods:{
			clear(){
				this.orderList.forEach(ele =>{
					// if(ele.order.status == 0){
						this.cancleOrder(ele.order.id)
					// }
				})
			},
			goBackInfo(val){
				uni.navigateTo({
					url:`./orderBackInfo/orderBackInfo?backOrder=${val}`
				})
			},
			goOrderBack(sku){
				uni.navigateTo({
					url:`./orderBack/orderBack?id=${sku.orderId}&skuid=${sku.id}`
				})
			},
			del(val){
				deleteOrder(val.order.id)
				.then(res =>{
					if(res.success == true){
						uni.showToast({
							title:"删除成功"
						});
						this.init();
					}
				})
			},
			selectCurrentTab(val){
				this.current = val;
				this.checkLogins(this.init)
			},
			//确认收货
			allDone(orderId) {
				receiveDone({
					orderId: orderId.order.id
				})
				.then(res => {
					if (res.success) {
						uni.showToast({
							title: '确认收货成功!',
							duration: 1000
						})
						this.init();
					}
				});
			},
			//取消未支付订单
			cancleOrder(orderId) {
				cancelOrder(orderId)
				.then(res => {
					if (res.success) {
						uni.showToast({
							title: '取消订单成功!',
							duration: 1000
						});
						this.init();
					}
				});
			},
			goPay(val) {
				uni.navigateTo({
					url: '/pages/user/order/order?id=' + val.order.id
				});
			},
			async init(){
				uni.showLoading({
					title:"加载中"
				})
				var list = (await findAllOrders()).data.orderList;
				list.forEach(ele =>{
					ele.items.forEach(ite =>{
						if (ite.productAttr != "string") {
							ite.productAttr = JSON.parse(ite.productAttr);
						}
					})
				})
				var orderReturnList = (await orderReturnApplys()).data.items;
				orderReturnList.forEach(ele =>{
					if (ele.productAttr != "string") {
						ele.productAttr = JSON.parse(ele.productAttr);
					}
				});
				this.orderReturnList = orderReturnList
				 this.orderList = list;
				 uni.hideLoading()
			}
		},
		onLoad(e) {
			this.current = e.type;
		},
		onShow() {
			this.checkLogins(this.init)
		}
	}
</script>

<style lang="scss" scoped>
.order-main {
		.head-bar {
			width: 100%;
			overflow-y: auto;
			position: fixed;
			left: 0;
			top: 0;
			// #ifdef H5
			top: 80rpx;
			// #endif
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 62rpx;
			padding-top: 14rpx;
			background-color: #354e44;
			color: #fff;
			font-size: 30rpx;
			line-height: 62rpx;
			z-index: 999;

			.label {
				radio {
					display: none;
				}

				&.active {
					border-bottom: 2rpx solid #dd524d;
					color: #dd524d;
				}
			}
		}

		.card-list {
			margin-top: 130rpx;

			.card {
				width: 672rpx;
				box-sizing: border-box;
				padding: 36rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin: 30rpx auto;
				font-size: 24rpx;
				color: #3e3e3e;

				.order-title {
					line-height: 33rpx;
					display: flex;
					justify-content: space-between;

					.status {
						color: #034c46;
					}

					border-bottom: 1px solid #f1ece7;
					padding-bottom: 30rpx;
				}

				.sku-block {
					display: flex;
					justify-content: flex-start;
					border-bottom: 1px solid #f1ece7;
					padding: 30rpx 0;

					.img {
						width: 162rpx;
						height: 162rpx;
						flex-shrink: 0;
						background-color: #8f8f94;
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
								color: #3e3e3e;
							}

							.price {
								colro: #8d8d8d;
							}
						}

						.p2,
						.p3 {
							font-size: 22rpx;
							color: #8d8d8d;
							line-height: 30rpx;
							margin-top: 5rpx;
						}

						.p4 {
							text-align: right;
							margin-top: 10rpx;
							color: #8d8d8d;
							text-decoration: underline;
						}
					}
				}

				.total-price {
					font-size: 26rpx;
					line-height: 37rpx;
					text-align: right;
					margin-top: 14rpx;
					display: flex;
					justify-content: space-between;
				}

				.btns {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-end;

					.btn {
						width: 124rpx;
						height: 50rpx;
						border: 1px solid #2d4f43;
						font-size: 26rpx;
						border-radius: 10rpx;
						color: #2d4f43;
						text-align: center;
						line-height: 50rpx;
						margin-left: 32rpx;

						&.btn-closed {
							width: auto;
							padding: 0 1em;
							border-color: #dd524d;
						}
					}
				}
			}
		}
	}
</style>
