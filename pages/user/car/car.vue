<template>
	<div class="buycart-main">
		<view class="product-card" v-for="item in productList" :key="item.id">
			<view class="info-block">
				<label>
					<evan-checkbox primary-color="#354E44" shape="square" v-model="item.isChecked"></evan-checkbox>
				</label>
				<navigator class="nav" url="/pages/buyCart/index">
					<image class="cover-img" :src="item.productPic" mode=""></image>
					<view class="info-text">
						<view class="gname">{{ item.productName }}</view>
						<view class="code">
							<text>编号: {{ item.productSkuId }}</text>
							<text>价格: ¥{{ item.price }}</text>
						</view>
						<view>数量: {{ item.quantity }}</view>
					</view>
				</navigator>
			</view>

			<view class="buy-count-steps">
				<text class="step-reduce" @tap="btnReduce(item)">-</text>
				<text class="step-text">{{ item.quantity }}</text>
				<text class="step-add" @tap="btnAdd(item)">+</text>
			</view>
		</view>

		<view class="footer-bar">
			<view class="sel-all">
				<text class="text">全选</text>
				<evan-checkbox primary-color="#354E44" shape="square" v-model="allChecked"></evan-checkbox>
			</view>
			<view class="price">
				合计: ¥
				<text class="text">{{ allPrice }}</text>
				<text class="btn" @click="goPay">结算</text>
			</view>
		</view>
	</div>
</template>

<script>
import { findAllCartItem, delCartItems } from '@/api/user/index.js';
import { addPreOrder } from '@/api/kind/index.js';
import mix from '@/mixins/index.js';
export default {
	name: 'BuyCart',
	components: {},
	mixins: [mix],
	data() {
		return {
			isSelAll: false,
			productList: [],
			checkbox: []
		};
	},
	onLoad() {
		this.checkLogins(this.init);
	},
	computed: {
		allChecked: {
			get() {
				if (this.productList.length == 0) {
					return false;
				}
				// every 判断每一项的checked = true
				return this.productList.every(item => item.isChecked);
			},
			set(val) {
				this.productList.forEach(ele => (ele.isChecked = val));
			}
		},
		allPrice() {
			if (this.productList.length == 0) return 0;
			return this.productList.reduce((a, b) => {
				if (b.isChecked) {
					a += b.quantity * b.price;
				}
				return a;
			}, 0);
		}
	},
	methods: {
		init() {
			findAllCartItem().then(res => {
				res.data.items.forEach(ele => {
					ele.isChecked = false;
				});
				this.productList = res.data.items;
			});
		},
		btnReduce(val) {
			var _this = this;
			if (val.quantity > 1) {
				val.quantity--;
			} else {
				uni.showModal({
					title: '是否删除该商品?',
					confirmText: '确认',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							delCartItems([val.id]).then(res => {
								if (res.success) {
									uni.showToast({
										title: '删除成功'
									});
									_this.init();
								} else {
									uni.showToast({
										title: '删除成功',
										icon: 'none'
									});
								}
							});
						} else {
							alert('取消了');
						}
					}
				});
			}
		},
		btnAdd(item) {
			item.quantity++;
		},
		goPay() {
			// 选中的商品列表
			var checkedList = this.productList.filter(ele => ele.isChecked);

			//构建提交对象
			var orderInfoVo = {
				orderItemList: []
			};
			for (var i = 0; i < checkedList.length; i++) {
				var checkedOne = checkedList[i];
				orderInfoVo.orderItemList.push({
					cartId: checkedOne.id,
					productId: checkedOne.productId,
					productQuantity: checkedOne.quantity,
					productSkuId: checkedOne.productSkuId
				});
			}

			addPreOrder(orderInfoVo).then(res => {
				if (res.success) {
					uni.showToast({
						title: '购买成功,1s后跳转到订单确认页',
						icon: 'none'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/order/confirmOrder/confirmOrder?id=${res.data.orderId}`
						});
					}, 1000);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.buycart-main {
	padding-bottom: 150rpx;
	.product-card {
		width: 672rpx;
		margin: 50rpx auto;
		background-color: #fff;
		border-radius: 24rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;

		.info-block {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.nav {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.cover-img {
					width: 136rpx;
					height: 136rpx;
					flex-shrink: 1;
					margin: 0 20rpx;
				}

				.info-text {
					font-size: 22rpx;
					color: #8d8d8d;

					.gname {
						font-size: 26rpx;
						color: #3e3e3e;
					}

					.price {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}

		.buy-count-steps {
			display: flex;
			justify-content: flex-end;

			.step-reduce,
			.step-add,
			.step-text {
				width: 60rpx;
				height: 60rpx;
				background: #f1ece7;
				border-radius: 50%;
				text-align: center;
				line-height: 60rpx;
				font-size: 30rpx;
				margin: 0 6rpx;
			}

			.step-text {
				width: 90rpx;
				border-radius: 30rpx;
			}
		}
	}

	.footer-bar {
		position: fixed;
		display: flex;
		justify-content: space-around;
		align-items: center;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		background-color: #fff;

		.btn {
			display: inline-block;
			width: 208rpx;
			height: 80rpx;
			background: #354e44;
			border-radius: 14px;
			color: #fff;
			font-size: 36rpx;
			line-height: 80rpx;
			text-align: center;
		}

		.sel-all {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.text {
				margin-right: 20rpx;
			}
		}

		.price {
			.text {
				color: red;
				margin-right: 10rpx;
			}
		}
	}
}
</style>
