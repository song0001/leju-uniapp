<template>
	<div class="goods-coll-main">
		<view class="goods-list">
			<navigator v-if="goodsList.length > 0" class="goods-item" :url="`/pages/find/article-detail/index?articleId=${goods.id}`" v-for="goods in goodsList" :key="goods.id">
			
				<img class="img" :src="goods.coverImg" alt>
				<div class="info">
					<p class="desc">{{goods.title}}</p>
				</div>
			
			</navigator>
			<view v-if="goodsList == 0">
				暂无数据
			</view>
		</view>
	</div>
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
			var list = uni.getStorageSync("articleList");
			if(list){
				this.goodsList = list
			}else{
				this.goodsList = []
			}
		},
	};
</script>

<style lang='scss' scoped>
	page{
		background-color: #F1ECE7;
	}
	.goods-coll-main {
		background: #F1ECE7;
		padding-top: 40rpx;
		.goods-list {
			width: 100%;
			/* margin: 40rpx auto; */
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
			.goods-item {
				display: flex;
				/* margin: 40rpx auto; */
				box-sizing: border-box;
				width: 334rpx;
				align-items: center;
				flex-direction: column;
				    background-color: #fff;
				    border-radius: 4px;
				p {
					text-align: left;
				}

				.img {
					width: 100%;
					height: 238rpx;
					border-radius: 16rpx;
					/* margin-right: 40rpx; */
				}

				.info {
					display: flex;
					flex-direction: column;
					color: #3E3E3E;
					line-height: 19px;
					margin-top: 4px;
					font-weight: bold;
					justify-content: space-around;
					font-size: 24rpx;
					line-height: 36rpx;
					padding: 20rpx 0;
					width: 100%;
					justify-content: center;
					.desc{
						text-align: center;
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
