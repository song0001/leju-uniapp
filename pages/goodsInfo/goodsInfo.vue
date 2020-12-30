<template>
	<view>
		<!-- <view class="container"> -->


		<view class="banner">
			<!-- 轮播图 -->
			<swiper circular="true" indicatorDots="true" :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="(item,index) in pic" :key="item.index">
					<image :src="item" mode=""></image>
				</swiper-item>
			</swiper>
			<!-- 收藏图标 -->
			<view class="collect" @tap="saveCollected">
				<image v-if="!infos.isCollected" src="../../static/icons/collect.png" mode=""></image>
				<image v-else src="../../static/icons/collect1-active.png" mode=""></image>
			</view>
		</view>


		<view class="content">

			<view class="title-block">
				<!-- 促销价 -->
				<view class="promotionPrice" v-if="goodsInfo.promotionPrice">
					¥ <view class="money">
						{{goodsInfo.promotionPrice}}
					</view>
					.00
				</view>

				<view class="promotionPrice" v-else>
					¥ <view class="money">
						{{goodsInfo.price}}
					</view>
					.00
				</view>
				<!-- 原价 -->
				<view class="price" v-if="goodsInfo.promotionPrice">
					¥ <view class="money">
						{{goodsInfo.price}}
					</view>
					.00
				</view>
				<!-- 卡片 -->
				<view class="card">
					没有促销价使用原价
				</view>

			</view>
			<view class="detail_title">
				{{goodsInfo.detailTitle}}
			</view>
			<view class="des">
				{{goodsInfo.detailDesc}}
			</view>
		</view>
		<!-- 富文本 -->
		<view class="pic">

			<mp-html :tag-style="obj" :content="goodsInfo.detailMobileHtml" />
		</view>
		<!-- </view> -->
		<!-- 底部tarbar -->
		<view class="goods-nav">
			<image src="../../static/icons/kf.png" mode=""></image>
			<view class="btns">
				<button class="btn1" type="default" @tap="addCart">添加到购物车</button>
				<button class="btn2" type="default" @tap="buy">立即购买</button>
			</view>
		</view>

		<!-- 商品遮罩层 -->
		<view class="mask" @touchmove.stop.prevent="moveHandle" v-if='isShow'>
			<view class="cart">
				<view class="pic1">
					<image :src="goodsInfo.pic" mode=""></image>
				</view>
				<view class="title">
					<view class="name">
						{{goodsInfo.name}}
					</view>
					库存数量:{{goodsInfo.stock}}
				</view>
				<view class="close" @tap="close">
					<image src="../../static/icons/fail.png" mode=""></image>
				</view>
				<view class="goods">

					<view class="">
						商品选择
					</view>
					<view class="color">
						<view class="color-item" :class="{active:num==index}" :data-index=index v-for="(item,index) in skuList" :key="item.id"
						 @tap="chooseColor">
							<view class="inner" v-for="ele in item.spData">
								{{ ele.key }}: {{ ele.value }}
							</view>
						</view>
					</view>
				</view>
				<view class="serve">
					<view class="">
						特色服务
					</view>
					<view class="work">
						<view class="work-item">
							送货上门
						</view>
						<view class="work-item">
							上门安装
						</view>
					</view>
				</view>
				<!-- 购买数量 -->
				<view class="buy-count">
					<view class="">
						购买数量
					</view>
					<view class="step">
						<view class="cut" @tap='cut'>
							-
						</view>
						<view class="num">
							{{number}}
						</view>
						<view class="add" @tap="add">
							+
						</view>
					</view>

				</view>
				<button type="default" class="confirm" @tap="sure">确定</button>

			</view>

		</view>
	</view>
</template>

<script>
	import {
		productDetail,
		addCart
	} from '../../api/goodsInfo/index.js'
	import mpHtml from '@/components/mp-html/mp-html'
	import login from "../../api/login.js"
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				num: '0',
				isShow: false,
				subtitleText: '',
				title: '',
				goodsInfo: '',
				pic: [],
				obj: {
					img: "width:100%;height:auto"
				},
				// 当前收藏的商品
				infos: {
					skuList: []
				},
				number: '1',
				// 判断是加入购物车还是立即购买
				isCart: true
			};
		},
		computed: {
			skuList() {
				return this.goodsInfo.skuList.map(ele => {
					ele.spData = JSON.parse(ele.spData);
					return ele
				})
			}
		},
		methods: {
			// 禁止页面滚动
			moveHandle() {},
			saveCollected() {

				// 1. 点击收藏按钮之前 本地是否有已经存储过的商品
				// 1.1 如果有相同商品 需要做的处理 取消收藏操作
				// 1.2 如果没有商品 需要做的处理  本地存储商品

				//  2. 点击收藏按钮之前   本都如果没有收藏的商品(本地以前没有存储过数据)
				// 需要做的处理  把商品存储在本地
				var token = uni.getStorageSync("token")
				if (token) {
					var collectedList = uni.getStorageSync("collectedList");
					if (collectedList.length > 0) {
						var item = collectedList.find(ele => ele.id == this.infos.id);
						var index = collectedList.findIndex(ele => ele.id == this.infos.id);
						if (item) { //1.1
							collectedList.splice(index, 1)
							uni.setStorageSync("collectedList", collectedList);
							this.infos.isCollected = false
							uni.showToast({
								title: "取消收藏"
							})
						} else { //1.2
							collectedList.push(this.infos);
							uni.setStorageSync("collectedList", collectedList);
							this.infos.isCollected = true
							uni.showToast({
								title: "收藏成功"
							})
						}
					} else { //2
						var arr = [];
						arr.push(this.infos);
						uni.setStorageSync("collectedList", arr);
						this.infos.isCollected = true
						uni.showToast({
							title: "收藏成功"
						})
					}
					// 强制更新 
					this.$forceUpdate()

				} else {
					login.onShow()
				}

			},
			// 点击添加购物车
			addCart() {
				this.isShow = true
				this.isCart = true
			},
			// 点击立即购买
			buy() {
				this.isShow = true
				this.isCart = false
			},
			// 点击关闭
			close() {
				this.isShow = false
			},
			chooseColor(e) {
				// this.num=index
				console.log(e)
				this.num = e.currentTarget.dataset.index
			},
			cut() {
				if (this.number > 0) {
					this.number--
				}
			},
			add() {
				this.number++
			},
			// 点击确定
			sure() {
				if(this.skuList.length<1){
				this.goodsInfo.skuList=[]
				return 
					}
				var obj = {
					"productId": this.goodsInfo.id,
					"productSkuId": this.goodsInfo.skuList[this.num].id,
					"quantity": this.number
				}
				if (this.isCart) { //是添加到购物车
					addCart(obj).then(res => {
						console.log(res)
					 uni.showToast({
						title: "添加成功"
					})
			
					})
			
				} else { //是立即购买

				}

			}
		},
		onLoad(options) {
			productDetail(options.id).then(res => {
				console.log(res)
				this.goodsInfo = res.data.product
				this.pic = res.data.product.albumPics.split(',')
				// 收藏图标显示


				var collectedList = uni.getStorageSync("collectedList");
				var item = collectedList.find(ele => ele.id == res.data.product.id);
				if (item) { // 本地已经存储过对应的商品 收藏的图片展示
					res.data.product.isCollected = true;
				} else {
					res.data.product.isCollected = false;
				}
				// 要收藏的商品
				this.infos = res.data.product;
				console.log(this.infos)
				// 自定义导航头
				uni.setNavigationBarTitle({
					title: res.data.product.name,

				});
				// uni.setNavigationBarColor({
				// 	frontColor: '#ffffff',
				// 	navigationBarBackgroundColor: "#354e44"
				// })
			})
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		position: relative;

		swiper {
			width: 100%;
			height: 634rpx;

			swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.collect {
			position: absolute;
			width: 100rpx;
			height: 100rpx;
			top: 584rpx;
			right: 50px;
			background: #354e44;
			box-shadow: 0 16px 24px 0 rgba(70, 70, 70, .2);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}

	.content {
		width: 100%;
		height: auto;
		box-sizing: border-box;
		padding: 35px 34px;

		.title-block {
			width: 100%;


			display: flex;
			justify-content: flex-start;
			align-items: baseline;

			.promotionPrice {
				font-family: fantasy;
				display: flex;
				justify-content: flex-start;
				font-size: 32rpx;
				align-items: baseline;
				color: #f2270c;

				.money {
					font-size: 60rpx;
				}
			}

			.price {
				display: flex;
				justify-content: flex-start;
				font-family: fantasy;
				text-decoration: line-through;
				color: #b5b5b5;
				font-size: 24rpx;
				font-weight: 400;

				.money {}
			}

			.card {
				margin-left: 5px;
				justify-content: center;
				line-height: 30rpx;
				margin-right: 6px;
				padding: 0 6px;
				border-radius: 2.5px;
				height: 30rpx;
				font-size: 20rpx;
				color: #fff;
				background-color: #f2270c;
			}
		}

		.detail_title {
			color: #262626;

			font-size: 32rpx;
			font-weight: 700;
		}

		.des {
			font-size: 24rpx;
			padding: 18px 0 0;
			line-height: 1.3;
			color: #666;
		}
	}

	.pic {
		padding: 68rpx;
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	.goods-nav {

		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 60rpx;
		box-sizing: border-box;
		background-color: #fff;

		image {
			width: 40rpx;
			height: 20px;
		}

		.btns {
			display: flex;


			.btn1 {
				background-color: #e2e2e2;
				color: #8f8f94;
				border-radius: 0;
				width: 238rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
			}

			.btn2 {
				width: 238rpx;
				height: 80rpx;
				color: #fff;
				border-radius: 0;
				background-color: #354e44;
				line-height: 80rpx;
				font-size: 30rpx;
			}

			uni-button:after {
				border-radius: 0;
				border: none;
			}

		}

	}

	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 8888;

		.cart {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 628rpx;
			height: 926rpx;
			background: #fff;
			border-radius: 80rpx;

			.pic1 {
				position: absolute;
				width: 192rpx;
				height: 192rpx;
				background-color: pink;
				left: 62rpx;
				top: -56rpx;
				border-radius: 10rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.title {
				margin-top: 100rpx;

				>.name {
					width: 300rpx;
					font-weight: 600;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

				}

				margin-left: 45%;
			}

			.close {
				position: absolute;
				right: 62rpx;
				top: 62rpx;
				;
				width: 42rpx;
				height: 42rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.goods {
				box-sizing: border-box;
				margin: 28rpx 56rpx;
				padding: 0 8rpx;
			}

			.color {
				height: 170rpx;
				width: 100%;
				overflow-y: auto;
				display: flex;
				flex-direction: column;
				// align-items: center;
			}

			.color-item {
				display: flex;
				width: 100%;
				box-sizing: border-box;
				border-radius: 10px;
				margin: 10rpx 0;
				border: 4rpx solid transparent;
				padding: 10rpx;
				padding-left: 20rpx;
				height: 60rpx;
				color: #3e3e3e;
				font-size: 26rpx;
				text-align: center;
				line-height: 40rpx;
				background: #f2f4f3;

				.inner {

					margin-right: 20rpx;
				}
			}

			.active {
				border-color: #000;
			}
		}
	}

	.serve {
		box-sizing: border-box;
		padding: 0 56rpx;
		border-bottom: 2rpx solid #eee;

		.work {
			.work-item {
				width: 100%;
				height: 30px;
				color: #3e3e3e;
				font-size: 13px;
				text-align: center;
				line-height: 30px;
				background: #f2f4f3;
				border-radius: 10px;
				border-radius: 10px;
				margin: 5px auto;
				text-align: left;
				text-indent: 1em;
			}

		}
	}

	.buy-count {
		box-sizing: border-box;
		padding: 0 56rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.step {
			display: flex;
			justify-content: center;

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

	.confirm {
		width: 104px;
		height: 40px;
		background: #354e44;
		border-radius: 14px;
		border-radius: 14px;
		margin: 24px auto;
		color: #fff;
		font-size: 16px;
		text-align: center;
		line-height: 40px;
	}
</style>
