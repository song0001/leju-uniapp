<template>
	<view class="kind-main">
	<!-- 	<uni-nav-bar class="head-nav" fixed backgroundColor="#354E44">
		    <view class="title">
				分类页
			</view>
		    <view slot="left">
				<image class="icon icon-chat" src="../../static/icons/chat.png"></image>
			</view>
		    <view slot="right">
				<image @tap="goSearch" class="icon icon-search" src="../../static/icons/search.png"></image>
				<image @tap="goCart" class="icon icon-cart" src="../../static/icons/cart.png"></image>
			</view>
		</uni-nav-bar> 
		-->
		<navigator v-if="kindList.length>0" class="block chuangyi" :url="'/kindPackage/list/list?kindId='+kindList[0].id">
			<image class="img" :src="kindList[0].icon" mode="scaleToFill"></image>
			<view class="ctitle">{{kindList[0].name}}</view>
			<view class="etitle">{{kindList[0].etitle}}</view>
			
		</navigator>

		<navigator v-if="kindList.length>0" class="block shipin" :url="'/kindPackage/list/list?kindId='+kindList[1].id">
			<image class="img" :src="kindList[1].icon" mode="scaleToFill"></image>
			<view class="ctitle">{{kindList[1].name}}</view>
			<view class="etitle">{{kindList[1].etitle}}</view>
		</navigator>
		<view class="f-d">
			<navigator v-if="kindList.length>0" class="block fengge" :url="'/kindPackage/list/list?kindId='+kindList[2].id">
				<image class="img" :src="kindList[2].icon" mode="scaleToFill"></image>
				<view class="ctitle">{{kindList[2].name}}</view>
				<view class="etitle">{{kindList[2].etitle}}</view>
			</navigator>
			<navigator v-if="kindList.length>0" class="block dengju" :url="'/kindPackage/list/list?kindId='+kindList[3].id">
				<image class="img" :src="kindList[3].icon" mode="scaleToFill"></image>
				<view class="ctitle">{{kindList[3].name}}</view>
				<view class="etitle">{{kindList[3].etitle}}</view>
			</navigator>
		</view>

	</view>
</template>

<script>
	import {findCategory} from '@/api/kind'
	export default {
		data() {
			return {
				kindList: []
			}
		},
		onLoad() {
			this.getKindList()
		},
		computed: {


		},
		onPullDownRefresh(){
			this.getKindList()
		},
		methods: {
			getKindList() {
				findCategory()
					.then(res => {
						
						this.kindList = res.data.category.children;
						uni.stopPullDownRefresh()
					})
			},
			goCart(){
				uni.navigateTo({
					url:'../buyCart/index'
				})
			},
			goSearch(){
				uni.navigateTo({
					url: '/pages/search/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.kind-main {
		.head-nav{
			background-color: $base-bg;
			box-sizing: border-box;
			.title{
				width: 100%;
				text-align: center;
				color: #fff;
			}
			.icon{
				width: 36rpx;
				height: 36rpx;
				&.icon-chat{
					margin-left: 20rpx;
				}
				&.icon-search{
					margin-right: 40rpx;
				}
			}
			
		}
		

		.f-d {
			width: 670rpx;
			display: flex;
			margin: 0 auto;
			margin-bottom: 48rpx;
			justify-content: space-between;

			.fengge,
			.dengju {
				width: 312rpx;
				height: 442rpx;
				background: #FAFAFA;
				box-shadow: 0 12px 20px 0 rgba(83, 66, 49, 0.03);
				border-radius: 20px;
				border-radius: 20px;
			}
		}

		.block {
			position: relative;
			.img {
				position: absolute;
				right: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			.ctitle{
				position: absolute;
				left: 52rpx;
				top: 148rpx;
				font-size: 48rpx;
				color: #3E3E3E;
			}
			.etitle{
				position: absolute;
				left: 52rpx;
				top: 220rpx;
				color: #7F7F7F;
				font-size: 30rpx;
			}
			
			&.chuangyi,
			&.shipin {
				width: 670rpx;
				height: 302rpx;
				background: #D5D5D5;
				box-shadow: 0 12px 20px 0 rgba(83, 66, 49, 0.05);
				border-radius: 20px;
				margin: 28px auto;
				.img{
					width: 60%;
				}
			
			}
			&.shipin{
				background-color: #fff;
			}
		}

	}
</style>
