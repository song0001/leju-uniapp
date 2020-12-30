<template>
	<view>
		<view class="tops">
			<image src="../../static/icons/search.png" mode=""></image>
			<image src="../../static/icons/cart.png" mode=""></image>
		</view>
		<view class="uni-padding-wrap">
			<swiper indicator-active-color="rgb(216, 216, 216)" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in list" :key='item.id'>
					<view>
						<image class="img" :src="item.pic" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 创意 风格 -->
		<view class="section-kind">
			<view class="kind-item" v-for="item in category" :key='item.id' @tap="goGoodsList(item.id)">
				<image :src="item.icon" mode=""></image>
				<view class="">
					{{item.name}}
				</view>

			</view>
		</view>
		<!-- 广告 -->
		<view class="notify">
			<view class="icon">
				<image src="../../static/icons/notify.png" mode=""></image>
			</view>
			<view class="text">
				限时活动:
			</view>
			<swiper circular="true" vertical='true' :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in recommendList" :key="item.recommendId" @tap="goGoodsInfo(item.productId)">
					<view class="name">
						{{item.name}}
					</view>
					<view class="price">
						<view class="del">
							{{item.price}}元
						</view>
						<view class="price">
							现价:{{item.promotionPrice}}元
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 热门推荐 -->
		<view class="hot">
			<view class="title">
				热门推荐
			</view>
			<swiper circular="true"  easing-function="easeOutCubic" display-multiple-items="3" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in hotList" :key="item.id" @tap="goGoodsInfo(item.id)">
					<view class="item">
						<image :src="item.pic" mode=""></image>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 新品推荐 -->
		<view class="new">
			<view class="title">
				新品推荐
			</view>
			<view class="list">
				<view class="item" v-for="item in latestProducts" :key="item.id"  @tap="goGoodsInfo(item.id)">
					<image :src="item.pic" mode=""></image>
					<view class="des">
						<view class="name">		
						{{item.name}}
						</view>
						<view class="">
							价格:{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
<!-- 猜你喜欢 -->
   <view class="like">
   	 <view class="title">
   	 	猜你喜欢
   	 </view>
	 <view class="list">
	 	<view class="item" v-for="item in saleMostProducts" :key='item.id'  @tap="goGoodsInfo(item.id)">
	 		<image :src="item.pic" mode=""></image>
			<view class="des">
				
			<view class="name">
				{{item.brandName}}
			</view>
			<view class="price">
				<view class="">
				¥{{item.price}} 	
				</view>
				<view class="">
					   乐居
				</view>
			</view>
				  
			</view>
	 	</view>
	 </view>
   </view>
		
	</view>
</template>

<script>
	import {
		bannerAds,
		findAllCategory,
		recommendList,
		hotList,
		latestProducts,
		saleMostProducts
	} from '../../api/home/index'
	export default {
		data() {
			return {

				indicatorDots: true,
				autoplay: true,
				interval:2000,
				duration: 500,
				circular: true,
				list: [],
				category: [],
				recommendList: [],
				hotList: [],
				latestProducts: [],
				saleMostProducts:[]
			};
		},
		methods: {
			// 跳转到商品详情
goGoodsInfo(ids){
	 console.log(ids)
	 uni.navigateTo({
	 	url:`../goodsInfo/goodsInfo?id=${ids}`
	 	})
	},
	// 跳转到商品列表页
	goGoodsList(ids){
		 console.log(ids)
		uni.navigateTo({
			url:`../kind/kindList/kindList?id=${ids}`
			})
		}
		},
		onLoad() {
			bannerAds().then(res => {
					// console.log(res);
					this.list = res.data.items
				}),
				findAllCategory().then(res => {
					// console.log(res)
					this.category = res.data.items[0].children
				}),
				recommendList().then(res => {
					// console.log(res)
					this.recommendList = res.data.items
				})
			hotList().then(res => {
				console.log(res)
				this.hotList = res.data.items
			})
			latestProducts(1, 14).then(res => {
				// console.log(res)
				this.latestProducts = res.data.rows
			})
			saleMostProducts().then(res=>{
				// console.log(res)
				this.saleMostProducts=res.data.items
			}
				)
		},
	}
</script>

<style lang="scss" scoped>
	.tops{
		    position: fixed;
		    top: 0;
		    left: 0;
		    width: calc(100% - 30px);
		    z-index: 9999;
			display: flex;
			    align-items: center;
				    justify-content:flex-end;
				    padding: 30rpx;
					image{
						    width: 42rpx;
						    height: 42rpx;
							margin-left: 46rpx;
						}
		}
	.uni-padding-wrap {
		height: 360rpx;

		.swiper {
			height: 100%;
			overflow: hidden;

			swiper-item {
				border-radius: 30rpx;

				.img {
					width: 100%;
					height: 516rpx;
				}
			}
		}

		.uni-swiper-dot-active {
			background-color: rgb(216, 216, 216);
		}
	}

	.section-kind {
		margin: 60rpx auto;
		display: flex;
		justify-content: space-around;

		.kind-item {
			width: 80rpx;
			text-align: center;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
			}
		}
	}

	// 广告样式
	.notify {
		width: 670rpx;
		height: 96rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		background-color: #fff;

		.icon {
			width: 48rpx;
			height: 48rpx;
			margin: 0 10px;

			image {
				width: 100%;
				height: 100%;
				opacity: .3;
			}
		}

		.text {
			color: orange;
			font-weight: 600;
			font-size: 28rpx;
			margin-right: 10rpx;
		}

		swiper {
			width: 450rpx;
			height: 100%;

			swiper-item {
				display: flex;
				align-items: center;

				.name {
					width: 248rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.price {
					.del {
						text-decoration: line-through;
					}

					.price {
						color: red;
						font-weight: 600;
						font-size: 24rpx;
					}
				}
			}
		}
	}

	// 热门推荐
	.hot {
		.title {
			padding: 30rpx;
		}

		swiper {
			width: 690rpx;
			margin: 0 auto;
		}

		swiper swiper-item {
			width: 208rpx;
			height: 100%;
			margin: 0 20rpx;

			image {
				width: 208rpx;
				height: 168rpx;
			}

			.name {
				width: 208rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 26rpx;
				text-align: center;
			}
		}
	}

	// 新品推荐
	.new {
		padding: 0 30rpx;
.title{
	margin-bottom: 30rpx;
}
		.list {
           display: flex;
			overflow: auto;
			.item{
				box-sizing: border-box;
				padding: 40rpx;
				width: 590rpx;	
				height:260rpx;
				margin-right: 40rpx;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				// flex: 0 0 auto;
				flex-shrink: 0;
				   border-radius: 10rpx;
					.des{	
						overflow: hidden;
					
						height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
						}
			image {
					display: block;		
					width: 194rpx;
					height: 168rpx;
					margin-right: 20px;
					flex-shrink: 0;
					border-radius: 8rpx;
				}
			}
		}
	}
	.like{
		.title{
			padding: 30rpx;
			// margin-bottom: 30rpx;
		}
		.list{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding:0 30rpx ;
			box-sizing: border-box;
		
			.item{
				width:324rpx;
				background-color: #fff;
				height: 418rpx;
				margin: 20rpx 0;
				border-radius: 10rpx;
				image{
					width: 100%;
					height: 238rpx;
				}
				.des{
					padding: 36rpx;
					box-sizing: border-box;
					}
					.name{
						line-height: 19px;
						    margin-top: 4px;
						    font-weight: 700;
							margin-bottom: 20rpx;
							font-size: 26rpx
						}
				.price{
					font-size: 26rpx;
					display: flex;
					justify-content: space-between;
				}
				}
			}
	}
	
</style>
