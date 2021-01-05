<template>
	<view>
		<view class="block">
			<view class="content">
				<view class="orderinfo">
					<view class="row">
						<view class="nominal">订单编号:</view><view class="text">{{orderInfo.orderSn}}</view>
					</view>
					<view class="row">
						<view class="nominal">订单金额:</view><view class="text">{{orderInfo.totalAmount }}元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
					<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="/static/icons/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#354E44" />
							</view>
					</view>
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="/static/icons/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#354E44" />
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即支付</view>
			<view class="tis">
				点击立即支付，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { payConfirm,getPreOrderById} from '@/api/user/order/index.js'
	// import NP from 'number-precision'
	import mix from "@/mixins/index.js"
	export default {
		data() {
			return {
				
				orderName:'',
				paytype:'alipay',//支付类型
				id:"",
				orderInfo:{}
			};
		},
		mixins:[mix],
		onLoad(e) {
			this.id = e.orderId
		},
		onShow() {
			this.checkLogins(this.init)
		},
		methods:{
			async init(){
				this.orderInfo = (await getPreOrderById(this.id)).data.orderBase
			},
			async payment(){
				var result = await payConfirm({
					orderId:this.id,
					payType:this.paytype == 'alipay' ? 1 : 2
				})
				if(result.success == true){
					uni.hideLoading();
					uni.showToast({
						title:'支付成功'
					});
					setTimeout(()=>{
						uni.navigateTo({
							url:'../payResult/payResult?price='+this.orderInfo.totalAmount
						});
					},300);
				}else{
					uni.hideLoading();
				}
			},
			doDeposit(){
				//模板模拟支付，实际应用请调起微信/支付宝
				uni.showLoading({
					title:'支付中...'
				});
				this.checkLogins(this.payment)
				// 支付订单 
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.block{
		width: 94%;
		padding: 0 3% 40upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.orderinfo{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					.nominal{
						flex-shrink: 0;
						font-size: 32upx;
						color: #7d7d7d;
					}
					.text{
						width: 70%;
						margin-left: 10upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 32upx;
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
							background-color: transparent;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #354E44;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
</style>
