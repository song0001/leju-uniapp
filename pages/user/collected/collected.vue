<template>
	<view class="goods-coll-main">
		<view class="goods-list">
			<view v-if="goodsList.length > 0" @tap="goInfo(goods.id)" class="goods-item" v-for="goods in goodsList" :key="goods.id">
			
				<image class="img" :src="goods.pic" alt>
				<view class="info">
					<view class="desc">{{goods.name}}</view>
					<view class="text">
						<span class="text-save-count">{{goods.nums}}收藏</span>
						<span class="text-price">¥ {{goods.price}}</span>
					</view>
				</view>
			
			</view>
			<view v-if="goodsList.length == 0">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	import mix from "@/mixins/index.js"
	export default {
		name: "GoodsColl",

		data() {
			return {
				goodsList: []
			};
		},
		mixins:[mix],
		onShow(){
			var list = uni.getStorageSync("collectList");
			if(list){
				this.goodsList = list
			}else{
				this.goodsList = []
			}
		},
		methods:{
			goInfo(id){
				uni.navigateTo({
					url:`/kindPackage/list/info/info?productId=${id}`
				})
			}
		}
	};
</script>

<style lang='scss' scoped>
	page{
		background: #F1ECE7;
		
	}
	.goods-coll-main {
		
		.goods-list {
			
						
						margin: 40rpx 30rpx;
						box-sizing: border-box;
			.goods-item {
				display: flex;
				margin: 40rpx auto;
				box-sizing: border-box;
				background: #fff;
				border-radius: 8rpx;
				padding:30rpx;
				p {
					text-align: left;
				}

				.img {
					width: 160rpx;
					height: 160rpx;
					border-radius: 16rpx;
					margin-right: 40rpx;
				}

				.info {
					display: flex;
					flex-direction: column;
					width: 592rpx;
					justify-content: space-around;
					font-size: 24rpx;
					color: #494949;
					line-height: 36rpx;
					.desc{
						text-align: left;
					}
					.text {
						display: flex;
						justify-content: space-between;

						.text-price {
							font-size: 32rpx;
							color: #1c4b47;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>
