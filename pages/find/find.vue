<template>
	<view>
		<view class="title">
			<view class="left" :class="index==1?'active':''" :data-index='1' @tap="choose">
				精选文章
			</view>
			<view class="right" :class="{'active':index==2}" :data-index='2' @tap="choose1">
				品牌列表
			</view>
		</view>
		<!-- neitong -->
		<view class="content">
			<view class="wz" v-if="isShow=='wz'">
				<view class="item" v-for="(item,index) in list1" :key='item.id'>
					<image :src="item.coverImg" mode=""></image>
					<view class="name">
						<view class="title1">
							{{item.title}}
						</view>
						<view class="author">
							{{item.author}}
						</view>
					</view>
					<view class="bottom">
						<view class="left">
							<image src="../../static/icons/view.png" mode=""></image>
							{{item.viewCount}}
						</view>
						<view class="right" @tap='collect(item,index)'>
							<image v-if="isCollect" src="../../static/icons/collect1.png" mode=""></image>
							<image v-else src="../../static/icons/collect1-active.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="pp" v-if="isShow=='pp'">
				<view class="item" v-for="item in list2" :key='item.id'>
					<view class="">
						<image :src="item.bigPic" mode=""></image>
					</view>
					<view class="bottom">
						
					<view class="title2">
						{{item.name}}

					</view>
					<view class="des">
						{{item.brandStory}}
					</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findBrandsByPage,
		findArticleByPage
	} from '../../api/find/index'
	export default {
		data() {
			return {
				start: 1,
				limit: 6,
				index: '1',
				list1: [],
				list2: [],
				isShow: 'wz',
				isCollect: 1
			};
		},
		methods: {
			choose(e) {
				this.index = e.currentTarget.dataset.index

				// 精选文章
				findArticleByPage(this.start, 2).then(res => {
					console.log(res)
					this.isShow = 'wz'
					this.list1 = res.data.rows
				})

			},
			choose1(e) {
				this.index = e.currentTarget.dataset.index;
				// 品牌列表
				findBrandsByPage(this.start, this.limit).then(res => {
					console.log(res)
					this.isShow = 'pp'
					this.list2 = res.data.rows
				})
			},
			// 收藏
			collect(item, index) {
				// console.log(item,index)

				this.isCollect = item.zanCount
			}
		},
		onLoad() {
			// 精选文章
			findArticleByPage(this.start, 2).then(res => {
				console.log(res)
				this.list1 = res.data.rows
			})

		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 16px;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 88rpx;
		background-color: rgb(53, 78, 68);
		display: flex;
		justify-content: center;
		align-items: center;

		.left,
		.right {
			margin: 0 10rpx;
			height: 80%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10rpx auto;
			box-sizing: border-box;
			// 下边框
			border-bottom: 2rpx solid transparent;
			color: #fff;
		}

		.active {
			border-color: #fff;
		}

	}

	.content {
		margin-top: 100rpx;

		.wz {
			.item {
				width: 674rpx;
				height: 482rpx;
				position: relative;
				background-color: #FFFFFF;
				margin: 28rpx auto;
				border-radius: 24rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 382rpx;
				}

				.name {
					position: absolute;
					left: 20rpx;
					top: 244rpx;
					color: #fff;
					font-size: 48rpx;
					line-height: 68rpx;

					.author {
						font-size: 30rpx;
						line-height: 42rpx;
					}
				}

				.bottom {
					padding: 0 60rpx;
					box-sizing: border-box;
					display: flex;
					height: 100rpx;
					justify-content: space-between;

					.left {
						width: 116rpx;
					}

					.left,
					.right {
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
					}

					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}

	.pp {
		.item {
			margin: 30rpx;
			background-color: #fff;
			border-radius: 8rpx;
			overflow: hidden;
.bottom{
	padding: 30rpx;
	height: 74rpx;
}
			image {
				width: 100%;
				height: 480rpx;
			}

			.title2 {
				font-size: 32rpx;
				line-height: 44rpx;
				color: #3e3e3e;
			}

			.des {
				font-size: 22rpx;
				color: #b1b1b1;
				line-height: 30rpx;

			}
		}
	}
</style>
