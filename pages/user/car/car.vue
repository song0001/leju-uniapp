<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in carList" :key='item.id'>
				<view class="des">
					<evan-checkbox v-model="item.isChecked" shape="square"></evan-checkbox>
					<image :src="item.productPic" mode=""></image>
					<view class="info">
						<view class="name">
							{{item.productName}}
						</view>
						<view class="c1">
							编号: {{item.productSkuId}}
						</view>
						<view class="c1">
							价格:{{item.price}}
						</view>
						<view class="c1">
							数量:{{item.quantity}}
						</view>
					</view>
				</view>

				<view class="step">
					<view class="cut" @tap='cut(item)'>
						-
					</view>
					<view class="num">
						{{item.quantity}}
					</view>
					<view class="add" @tap="add(item)">
						+
					</view>

				</view>
			</view>
			<!-- 结算 -->
			<view class="bottom">
				<view class="allChecked">
					全选 <evan-checkbox shape="square" v-model="allChecked"></evan-checkbox>
				</view>
				<view class="">
					合计:¥{{total}}
				</view>
				<button type="default" class="total" @tap='settle'>结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findAllCartItem,
		delCartItems
	} from "../../../api/user/car/index.js"
	// import 
	export default {
		data() {
			return {
				carList: []
			};
		},
		computed: {
			allChecked: {
				get() { // 获取操作
					if (this.carList.length == 0) {
						return false
					}
					return this.carList.every(ele => ele.isChecked);

				},
				set(val) {
					this.carList.forEach(ele => ele.isChecked = val)
					// if(val){ // 控制列表项全部选中
					//  this.list.forEach(ele =>ele.isChecked = true);
					// }else{
					//   this.list.forEach(ele =>ele.isChecked = false);
					// }

				}
			},
			// 计算总价
			total() {
				return this.carList.reduce((cur, val) => {
					if (val.isChecked) {
						return cur + val.quantity * val.price
					} else {
						return cur;
					}

				}, 0)
			}
		},
		methods: {
			init() {
				findAllCartItem().then(res => {
					console.log(res)
					res.data.items.forEach(ele => {
						ele.isChecked = false
					})
					this.carList = res.data.items
					console.log(this.carList)
				})
			},
			cut(item) {
				console.log()
				if (item.quantity > 1) {
					item.quantity--
				} else { //删除单个商品
					delCartItems([item.id]

					).then(res => {
						console.log(res)
						if (res.success) {
							uni.showToast({
								title: '删除成功'
							})
							this.init()
						}
					})
				}
			},
			add(item) {
				item.quantity++
			},
		// 点击结算
		settle(){
			uni.navigateTo({
				url:'../order/order'
			})
			}
		},
		onLoad() {
			this.init()
		},
		// onShow() {
		// 	this.init()
		// }
	}
</script>

<style lang="scss" scoped>
	.list {

		.item {
			width: 672rpx;
			margin: 50rpx auto;
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx 20rpx;
			box-sizing: border-box;


			.des {
				display: flex;
				flex-shrink: 0;
				align-items: center;
				justify-content: space-between;

				.info {
					width: 440rpx;

					.name {
						font-size: 26rpx;
						color: #3e3e3e;
					}

					.c1 {
						font-size: 22rpx;
						color: #8d8d8d;
					}
				}

				image {
					width: 120rpx;
					height: 136rpx;
				}
			}

			background-color: #FFFFFF;

			.step {
				display: flex;
				justify-content: flex-end;

				.cut,
				.add {
					width: 30px;
					height: 30px;
					background: #f1ece7;
					border-radius: 50%;
					text-align: center;
					line-height: 30px;
					font-size: 15px;
					margin: 0 3px;
				}

				.num {
					border-radius: 15px;
					width: 45px;
					height: 30px;
					background: #f1ece7;
					// border-radius: 50%;
					text-align: center;
					line-height: 30px;
					font-size: 15px;
					margin: 0 3px;
				}
			}
		}

		.bottom {
			position: fixed;
			padding: 0 50rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 150rpx;
			background-color: #fff;
			justify-content: space-between;

			.allChecked {
				display: flex;
			}
			.total{
				    width: 104px;
				    height: 40px;
				    background: #354e44;
				    border-radius: 14px;
				    color: #fff;
				    font-size: 18px;
				    line-height: 40px;
				    text-align: center;
				}
		}
	}
</style>
