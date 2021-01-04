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
						<view class="right"   @tap='collect(item.id)'>
							<image v-if="!item.isCollected" src="../../static/icons/collect1.png" mode=""></image>
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
			collect(id) {
			var list = uni.getStorageSync("articleList");
			var item = this.list1.find(ele =>{
				return ele.id == id
			})
			if(list){ // 判断本地是否存在收藏数据
				// var item = list.includes(val.id)
				// 获取本地id对应的下标
				const index = list.findIndex(ele =>ele.id == id);
				// this.articleList 找到的元素
				
				if(index>=0){ // 本地有收藏的id  取消收藏
					
					item.isCollected = false
					list.splice(index,1);
					uni.setStorageSync("articleList",list);
					uni.showToast({
						title:"取消成功"
					})
					return 
				}else{ // 本地没收藏的id  收藏 
					item.isCollected = true
					
					list.push(item)
				}
			}else{ // 本地暂时没有收藏数据  收藏 
				
				item.isCollected = true
				list = [];
				
				list.push(item);
				
			}
			uni.setStorageSync("articleList",list);
			uni.showToast({
				title:"收藏成功"
			})


			}
		},
		onLoad() {
			// 精选文章
			findArticleByPage(this.start, 2).then(res => {
				console.log(res)
				var list = uni.getStorageSync("articleList");
				if(list){ // 如果本地存在收藏数据
					res.data.rows.forEach(ele =>{
						var bol = list.find(item =>item.id == ele.id);
						ele.isCollected = bol ? true : false
					})
				}else{
					res.data.rows.forEach(ele =>{
						ele.isCollected = false
					})
				}
				
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
