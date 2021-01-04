<template>
	<view>
	<view class="list">
		<view class="item" v-for="item in list" :key='item.id'>
			<view class="center">
				<view class="name-tel">
					<view class="name">
						{{item.name}}
					</view>
					<view class="default" v-if="item.defaultStatus">
						默认
					</view>
				</view>
				<view class="tel">
					{{item.phoneNumber}}
				</view>
			</view>
			<view class="right">
				<view class="icon edit">
					<image src="../../../static/icons/edit.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {findAllAddress} from '../../../api/user/address/index.js'
	export default {
		data() {
			return {
				list:[]
			};
		},
		methods:{
			init(){
				findAllAddress().then(res=>{
					console.log(res)
					this.list=res.data.items
				})
				}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.list{
	.item{
		display: flex;
		    width: 94%;
		    padding: 20rpx 0;
		    border-bottom: 2rpx solid #ccc;
		    margin: 0 auto;
			.center{  
				width: 100%;
				.name-tel{
					display: flex;
					    margin-left: 30rpx;
					    align-items: baseline;
					    margin-bottom: 20rpx;
						.name{
							    font-size: 28rpx;
							}
							.default{
								    font-size: 22rpx;
								    background-color: #354e44;
								    color: #fff;
								    padding: 0 18rpx;
								    border-radius: 8rpx;
								    margin-left: 20rpx;
								}
					}
					.tel{
						    margin-left: 30rpx;
						    font-size: 24rpx;
						    color: #999;
						}
				}
				.right{
					display: flex;
					    flex-shrink: 0;
					    align-items: center;
					    margin-left: 20rpx;
						.icon{
							display: flex;
							    justify-content: center;
							        align-items: center;
							        width: 80rpx;
							        height: 60rpx;
							        border-left: solid 1rpx #aaa;
							        font-size: 40rpx;
							        color: #777;
									image{
										width: 40rpx;
										height:40rpx; 
										
									}
							}
					}
		}
	}
</style>
