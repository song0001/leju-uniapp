<template>
	<div class="find-main">
		<div class="head-nav" :style="{backgroundColor:bgColor}">
			<radio-group class="radio-group" @change="radioChange">

				<label class="nav-item" :class="{active: current=='0'}">
					<radio value="0" :checked="current=='0'" /><text class="text">精选文章</text>
				</label>
				<label class="nav-item" :class="{active: current=='1'}">
					<radio value="1" :checked="current=='1'" /><text class="text">品牌列表</text>
				</label>
			</radio-group>
		</div>

		<!-- //分类块 -->
		<div v-show="current == 0" class="article-section">
			<div class="article-section">

				<div class="article-list">
					<div class="article-block" v-for="item in articleList" :key="item.id">
						<navigator :url="'./articleInfo/articleInfo?articleId='+item.id">
							<image class="cover-img" :src="item.coverImg" mode=""></image>
							<text class="ctitle">{{item.title}}</text>
							<text class="etitle">{{item.author}}</text>
						</navigator>

						<div class="btns-bar">
							<div class="view-block">
								<image class="icon" src="../../static/icons/view.png" mode=""></image>
								<text class="count-text">{{item.viewCount}}</text>
							</div>
							<div class="zan-share">
								<!-- <image class="icon" src="../../static/icons/zan.png" mode="" @tap="doZan"></image> -->
								
								<!-- #ifndef H5 -->
									<button open-type="share" class="icon btn-share" :data-id="item.id"> </button>
								<!-- #endif -->
								<div class="collect" @tap="collect(item.id)">
									<image class="icon" v-if="!item.isCollected" src="../../static/icons/collect1.png"></image>
									<image class="icon" v-else src="../../static/icons/collect1-active.png"></image>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 系列列表 -->
		<div v-show="current == 1" class="series-section" >
			<view class="ul">
				<view v-for="item in brandList" class="per" :key="item.id">
					<image :src="item.bigPic" mode=""></image>
					<view class="box">
							<h2 class="title">{{ item.name }}</h2>
							<p class="descr">{{ item.brandStory }}</p>
					</view>
					
				</view>
			</view>
		</div>
	</div>
</template>

<script>
	import kindApi from '@/api/kind/index.js'
	import {
		findArticleByPage,
		findBrandsByPage
	} from '@/api/find/index.js'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	export default {
		name: 'Find',
		components:{
			uniIcons
		},
		data() {
			return {
				current: '0',
				kindList: [],
				currentKind: '',
				articleList: [],
				seriesAll: [],
				sId: '',
				currentItemId: '',
				seriesH: 600,
				shareId: '',
				brandList:[],
			}
		},
		onLoad(option) {

			this.sId = option.sId;
			// #ifdef H5
			this.sId = window.sId;
			window.sId = null;
			// #endif

			this.getArticleList()
			this.findBrandsByPage();

		},
		onShareAppMessage(res) {
			console.log(res)
			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					title: '测试小程序分享,文章id为:' + res.target.dataset.id,
					imageUrl: '/static/icons/brand.png',
					path: 'pages/find/find',
				}
			}
			
		},
		computed: {
			bgColor() {
				return '#354E44' ;
				// return this.current == '0' ? '#354E44' : 'transparent';
			},
		},
		methods: {
			collect(id){
				var list = uni.getStorageSync("articleList");
				var item = this.articleList.find(ele =>{
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
				
			},
			radioChange(e) {
				this.current = e.detail.value;
				if (this.current == '1') {
					this.seriesH = uni.getSystemInfoSync().windowHeight + 'px'
				}
			},
			//获取文章分类
			async getArticleList() {
				var {
					data
				} = await findArticleByPage(1,10);
				var list = uni.getStorageSync("articleList");
				if(list){ // 如果本地存在收藏数据
					data.rows.forEach(ele =>{
						var bol = list.find(item =>item.id == ele.id);
						ele.isCollected = bol ? true : false
					})
				}else{
					data.rows.forEach(ele =>{
						ele.isCollected = false
					})
				}
				
				this.articleList = data.rows;

			},
			async findBrandsByPage() {
				var {
					data
				} = await findBrandsByPage(1,10);
				this.brandList = data.rows
			
			},
			onShare(id) {
				this.shareId = id;

			},
			doZan(){
				uni.showToast({
					title: '赞 +1 '
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.find-main {
		height: 100%;

		.head-nav {
			width: 100%;
			height: 88rpx;
			background-color: transparent;
			color: #fff;
			font-size: 32rpx;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;

			.radio-group {
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-item {
					radio {
						display: none;
					}

					.text {
						line-height: 88rpx;
						box-sizing: border-box;
						padding: 10rpx 0;
						margin: 0 10rpx;
					}

					&.active .text {
						border-bottom: 1px solid #fff;
					}
				}


			}

		}

		.kind-nav {
			display: flex;
			width: 100%;
			height: 84rpx;
			margin-top: 140rpx;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			padding: 0 80rpx;

			.kind-item {
				width: 84rpx;
				height: 84rpx;
				background-color: #fff;
				border-radius: 50%;
				text-align: center;
				transition: all ease .4s;

				radio {
					display: none;
				}

				.icon {
					width: 50rpx;
					height: 50rpx;
					margin: 17rpx auto;


				}

				&.active {
					width: 98rpx;
					height: 98rpx;
					background-color: $base-bg;

					.icon {
						margin-top: 24rpx;
					}
				}
			}
		}

		.article-list {
			margin-top: 100rpx;

			.article-block {
				position: relative;
				width: 674rpx;
				height: 482rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin: 28rpx auto;
				overflow: hidden;

				.cover-img {
					display: block;
					width: 674rpx;
					height: 382rpx;
					background-color: #8F8F94;
				}

				.ctitle {
					position: absolute;
					left: 20rpx;
					top: 244rpx;
					color: #fff;
					font-size: 48rpx;
					line-height: 68rpx;
				}

				.etitle {
					position: absolute;
					left: 20rpx;
					top: 316rpx;
					color: #fff;
					font-size: 30rpx;
					line-height: 42rpx;
				}

				.btns-bar {
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 60rpx;

					.icon {
						width: 40rpx;
						height: 40rpx;

					}

					.view-block {
						height: 100%;
						display: flex;
						align-items: center;

						.icon {
							margin-right: 30rpx;
						}

						.count-text {
							color: #3E3E3E;
							font-size: 26rpx;
						}
					}

					.zan-share {
						height: 100%;
						display: flex;
						align-items: center;

						.icon {
							margin-left: 30rpx;
							display: block;
						}

						.icon.btn-share {
							width: 40rpx;
							height: 40rpx;
							outline: none;
							background: url(../../static/icons/share.png) no-repeat center;
							background-size: contain;

							&::after {
								border: none;
							}
						}

					}
				}

			}
		}

		.series-section {
			width: 100%;
			height: 100%;
			margin-top: 100rpx;
			.ul{
				view{
					margin: 30rpx;
					// height: 612rpx;
					background: #fff;
					// padding-bottom: 10px;
					border-radius: 8rpx;
					overflow: hidden;
					image{
						width: 100%;
						// height: 612rpx;
					}
					// .box{
					// 	padding: 60rpx;
						
					// }
					.title{
						font-size: 32rpx;
						line-height: 45rpx;
						// margin-top: 30rpx;
						color: #3E3E3E;
						// margin-left: 56rpx;
					}
					.descr{
						font-size: 22rpx;
						color: #B1B1B1;
						line-height: 30rpx;
						// margin-top: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						// margin-left: 56rpx;
					}
					.share{
						position: absolute;
						right: 30rpx;
						bottom: 30rpx;
						color: blue;
					}
				}
			}
			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					position: relative;
					width: 100%;
					height: 100%;

					.ename {
						font-size: 26rpx;
						margin: 120rpx 50rpx;
						color: #fff;
					}

					.cname {
						font-size: 72rpx;
						color: #fff;
						margin: 20rpx 50rpx;
					}

					.swiper-inner {
						position: absolute;
						left: 0px;
						bottom: 100rpx;
						height: 264rpx;
						width: 100%;

						.swiper-inner-item {
							.item-card {
								width: 496rpx;
								height: 264rpx;
								background-color: #fff;
								border-radius: 20rpx;
								margin: 0 auto;

								.swiper-item {
									display: flex;
									justify-content: space-between;
									align-items: center;
									box-sizing: border-box;
									padding: 20rpx;

									.image {
										width: 120rpx;
										height: 120rpx;
										flex-shrink: 0;
									}

									.info {
										margin-left: 20rpx;
										text-align: left;
										width: 200rpx;
										height: 100%;

										.gname {
											font-size: 20rpx;
											font-weight: 600;
										}

										.descr {
											font-size: 20rpx;
											color: #8F8F94;
										}
									}
								}

							}

						}
					}
				}
			}

		}
	}
</style>
