<template>
	<view>
		<view class="uni-padding-wrap">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in list" :key='item.id'>
					<view>
						<image class="img" :src="item.pic" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 创意 风格 -->
		<view class="section-kind">
			<view class="kind-item" v-for="item in category" :key='item.id'>

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
				<swiper-item v-for="item in recommendList" :key="item.recommendId">
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
			<swiper circular="true" display-multiple-items="3" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in hotList" :key="item.id">
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
				<view class="item" v-for="item in latestProducts" :key="item.id">
					<image :src="item.pic" mode=""></image>
					<view class="des">
						{{item.name}}
						<view class="">
							价格:{{item.price}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
<!-- 猜你喜欢 -->
   <view class="">
   	
   </view>
		
	</view>
</template>

<script>
	import {
		bannerAds,
		findAllCategory,
		recommendList,
		hotList,
		latestProducts
	} from '../../api/home/index'
	export default {
		data() {
			return {

				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				circular: true,
				list: [],
				category: [],
				recommendList: [],
				hotList: [],
				latestProducts: []
			};
		},
		methods: {

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
				console.log(res)
				this.latestProducts = res.data.rows
			})
		},
	}
</script>

<style lang="scss" scoped>
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

			image {
				width: 208rpx;
				height: 168rpx;
			}

			.name {
				width: 208rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
				padding: 40rpx;
				width: 590rpx;	
				height:260rpx;
				margin-right: 40rpx;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;
				// flex: 0 0 auto;
				flex-shrink: 0;
			image {
					display: block;		
					width: 194rpx;
					height: 168rpx;
				}
			}
		}
	}
</style>
