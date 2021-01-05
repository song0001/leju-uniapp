<template>
	<view>
	<view class="list">
		<view class="item" v-for="item in list" :key='item.id' @tap="select(item)" >
			<view class="center" >
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
			<view class="right"  @tap.stop="edit(item)">
				<view class="icon edit">
					<image src="../../../static/icons/edit.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
	<view class="add">
	  <view class="btn" @tap="add">
	    新增地址
	  </view>
	</view>
	</view>
</template>

<script>
	import {findAllAddress} from '../../../api/user/address/index.js'
	export default {
		data() {
			return {
				list:[],
			 isSelect: false,
			};
		},
		methods:{
			init(){
				findAllAddress().then(res=>{
					console.log(res)
					this.list=res.data.items
				})
				},
			select(item) {
			  //是否需要返回地址(从订单确认页跳过来选收货地址)
			  if (!this.isSelect) {
			    return;
			  }
			  uni.setStorageSync("selectAddress",item);
			  uni.navigateBack({
			  	delta:1
			  });	 
			},	
			add() {
				// console.log(21111)
			  uni.navigateTo({
			   url:"./addAddress/addAddress"
			  });
			},
			edit(item) {
				console.log(item)
				uni.navigateTo({
				  url: "./addAddress/addAddress?addressId="+item.id
				});
			},
			
		},
		onLoad(e) {
			
			// console.log(e.type)
			if(e.type == "select"){
				 this.isSelect = true;
				}
		},
		onShow() {
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
	.add {
		display: flex;
	  position: fixed;
	  bottom: 0;
	  width: 100%;
	  height: 120upx;
	  justify-content: center;
	  align-items: center;
	  .btn {
	    box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
	    width: 70%;
	    height: 80upx;
	    border-radius: 80upx;
	    background-color: #354E44;
	    color: #fff;
	    justify-content: center;
	    align-items: center;
	  display: flex;
	  
	  }
	}
</style>
