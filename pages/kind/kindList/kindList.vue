<template>
	<view>
		<view class="list">


			<view class="tabList">
				<view class="" @tap="tabEvents(item.index,item)" v-for="item in list" :key="item.index">
					<view :class="{active:item.index==current}">
						{{item.name}}
					</view>
					<view class="iconBox" v-if="item.index==1||item.index==2">
						<uni-icons :color="item.currentIconSelect=='up'?'#dd524d':'#fff'" type="arrowup" size="12"></uni-icons>
						<uni-icons :color="item.currentIconSelect=='down'?'#dd524d':'#fff'" type="arrowdown" size="12"></uni-icons>
					</view>
				</view>
			</view>
			<view class="goodsBox">
				<view v-for="item in goodsList" :key="item.id" @tap="goGoodsInfo(item.id)">
					<image :src="item.pic" mode=""></image>
					<view class="des">
						<view class="name">
							{{item.name}}
						</view>
						<view class="price">
							<view class="">
								¥{{item.price}}元
							</view>
							<view class="">
								不凡
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="bottom" v-if="goodsList.length==0">
			没有更多数据了
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {
		findCategory,
		findProductList
	} from '../../../api/kind/kindList/index.js'
	export default {
		components: {
			uniIcons
		},
		data() {
			return {
				current: 0,
				start: 1,
				limit: 5,
				id: '',
				sortBy: "",
				isDesc: "",
				goodsList: [],
				list: [{
						name: '新品',
						index: 0
					},
					{
						name: "销量",
						index: 1,
						currentIconSelect: "", //"" up  down 
					},
					{
						name: "价格",
						index: 2,
						currentIconSelect: "", //"" up  down 
					},
					{
						name: "筛选",
						index: 3
					}
				]
			};
		},
		methods: {
			init() {
				findProductList(this.start, this.limit, {
					"categoryId": this.id,
					"isDesc": this.isDesc,
					"sortBy": this.sortBy

				}).then(res => {
					console.log(res)
					this.goodsList = res.data.rows
				})
			},
			// 点击头部分类
			tabEvents(index, item) {

				if (index == this.current) {

				} else {

					this.reset()
				}
				this.goodsList = [];
				this.start = 1;
				this.limit = 5;
				this.current = index;
				if (item.currentIconSelect == "") {
					item.currentIconSelect = "up"
				} else if (item.currentIconSelect == "up") {
					item.currentIconSelect = "down"
				} else if (item.currentIconSelect = "down") {
					item.currentIconSelect = "up"
				}

				// 禁止排序
				if (this.current == 1 || this.current == 3) {
					this.sortBy = ""
				}
				// 排序	
				if (this.current == 1) {
					this.sortBy = "sale"
				} else if (this.current == 2) {
					this.sortBy = "price"
				}
				if (item.currentIconSelect == "up") {
					this.isDesc = 1
				} else if (item.currentIconSelect == "down") {
					this.isDesc = 0
				}
				this.init();
			},
			// 重置数据
			reset() {
				this.list.forEach((ele, index) => {
					if (index == 1 || index == 2) {
						ele.currentIconSelect = ""
					}
				});
			},
			// 跳转到商品详情
			goGoodsInfo(ids) {
				console.log(ids)
				uni.navigateTo({
					url: `../../goodsInfo/goodsInfo?id=${ids}`
				})
			},
		},
		onLoad(options) {
			// 自定义导航头
			uni.setNavigationBarTitle({
				title: "乐居",
			});
			// 颜色最好不要在这里设置 
			// uni.setNavigationBarColor({
			// 	frontColor: '#ffffff',
			// 	backgroundColor: "rgb(53, 78, 68)"
			// })
			this.id = options.id
			this.init()
		}

	}
</script>

<style lang="scss" scoped>
	.list {
		.tabList {
			position: fixed;
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			 top: 0;
			/* #endif */

			left: 0;
			width: 100%;
			height: 62rpx;
			display: flex;
			align-items: center;
			padding-top: 7px;
			font-size: 30rpx;
			z-index: 999;

			justify-content: space-around;
			background-color: #354e44;
			color: #fff;

			>view {
				display: flex;
				align-items: center;
			}

			.active {
				color: #dd524d;
			}

			.iconBox {
				line-height: 20rpx;
				display: flex;
				flex-direction: column;

				.uni-icons {
					height: 16rpx;

				}
			}
		}

		.goodsBox {
				margin-top: 88rpx;
		
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx;
			box-sizing: border-box;
			flex-wrap: wrap;

			>view {
				overflow: hidden;
				width: 316rpx;
				height: 418rpx;
				border-radius: 8rpx;
				display: flex;
				flex-direction: column;
				margin-bottom: 20rpx;

				image {
					width: 100%;
					height: 238rpx;
					// float: left;
				}

				.des {
					background-color: #FFFFFF;
					padding: 36rpx;
					box-sizing: border-box;
					font-size: 26rpx;

					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-top: 4px;
						font-weight: 700;
						margin-bottom: 20rpx;
					}

					.price {
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
	}

	.bottom {
		text-align: center;
	}
</style>
