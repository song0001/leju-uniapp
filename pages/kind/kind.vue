<template>
	<view>
		<view class="box1">
			<view class="left">
				<view class="name">
					
				{{list4.name}}
				</view>
			</view>
			<view class="right">
				<image :src="list4.icon" mode=""></image>
			</view>
		</view>
		<view class="box2">
			<view class="left">
				<view class="name">
					
				{{list3.name}}
				</view>
			</view>
			<view class="right">
				<image :src="list3.icon" mode=""></image>
			</view>
		</view>
		<view class="box3">
			<view class="item">
				<view class="name">	
				{{list2.name}}
				</view>
				<image :src="list2.icon" mode=""></image>
			</view>
			<view class="item">
			<view class="name">		
			{{list1.name}}
			</view>
				<image :src="list1.icon" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		findAllCategory
	} from "../../api/kind/index.js"
	export default {
		data() {
			return {
				list1: '',
				list2: '',
				list3: '',
				list4: '',
			};
		},
		onLoad() {
			findAllCategory().then(res => {
				console.log(res)
				this.list1 = res.data.items[0].children[0]
				this.list2 = res.data.items[0].children[1]
				this.list3 = res.data.items[0].children[2]
				this.list4 = res.data.items[0].children[3]
			})
		}
	}
</script>

<style lang="scss" scoped>
	.box1,
	.box2 {
	
		width: 670rpx;
		height: 302rpx;
		margin: 56rpx auto;
		display: flex;

		image {
			width: 402rpx;
			height: 100%;
		}
		.left{
				position: relative;
				border-radius: 20px 0 0 20px;
			.name{
				position: absolute;
				left: 26px;
				top: 74px;
				font-size: 24px;
				color: #3e3e3e;
			}
		}
	}

	.box1 {
		.left {
			flex: 1;
			background-color: #d5d5d5;
		}
	}

	.box2 {
		.left {
			flex: 1;
			background-color: #fff;
		}
	}
	.box3{
		display: flex;
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		justify-content: space-between;
		.item{
			// flex: 1;
			width: 312rpx;
			height: 442rpx;
			position: relative;
			.name{
				position: absolute;
				    left: 26px;
				    top: 74px;
				    font-size: 24px;
				    color: #3e3e3e;
				z-index: 9;
			}
			image{
				width: 100%;
				height: 100%;
				}
		}
	}
</style>
