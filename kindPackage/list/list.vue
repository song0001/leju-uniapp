<template>
	<view class="product-main">
		<view class="tab head-bar">
			<view class="per" v-for="(item,index) in headItems" :class="{'active':index==current}" @tap="headChange(index,item)" :key="index">
				{{item.name}} 
				<view class="icons"  v-if="index == 1 || index == 2">
					<uni-icons  :color="item.isDesc === 1 ? '#DD524D' : '#fff'" class="icon-child" type="arrowup" size="12"></uni-icons>
					<uni-icons  :color="item.isDesc === 0 ? '#DD524D' : '#fff'" class="icon-child" type="arrowdown" size="12"></uni-icons>
				</view>
			</view>
		</view>

		<view class="product-list">
			
			<navigator class="product-block" :url="'./info/info?productId='+item.id" :key="item.id" v-for="(item,index) in productList">
				<image class="img" :src="item.pic" mode="scaleToFill"></image>
				<view class="text-area">
					<view class="gname">
						{{item.name}}
					</view>
					<view class="price-origin">
						<text class="price">¥{{item.price | money}}</text>
						<text class="origin">{{item.origin_city||'不凡'}}</text>
					</view>
				</view>
			</navigator>
			
		</view>
		<uniLoadMore :status="more"></uniLoadMore>
	</view>
</template>

<script>
	import {findProductList} from '@/api/kind/index.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue" 
	import NP from 'number-precision'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniLoadMore ,
			uniIcons
		},
		
		data() {
			return {
				
				start:1,
				limit:2,
				more: 'more',  //@value more loading前  	@value loading loading中  	@value noMore 没有更多了
				productList: [],
				kindId: '',
				current: '0',
				headItems: [{
						name: '新品',
						value: '',
						isDesc:""
					},
					{
						name: '销量',
						value: 'sale',
						isDesc:""
					},
					{
						name: '价格',
						value: 'price',
						isDesc:""
					},
					{
						name: '筛选',
						value: '',
						isDesc:""
					}
				],
				page: {
					start: 1,
					limit: 6,
					lastPage: false
				},
				total:0
				
			}
		},
		onLoad(option) {

			this.kindId = option.kindId;
			this.getProductList();
		},
		// 监听下拉事件s
		onPullDownRefresh(){
			this.clear()
			this.getProductList();
		},
		onReachBottom(){
			if(this.total > this.productList.length){
				this.more="more";
				this.getProductList();
				return 
			}
			this.more="noMore";
		},
		
		
		computed:{
			sortBy(){
				if(this.current == 0){
					return ""
				}else if( this.current == 1){
					return "sale"
				}else if(this.current == 2){
					return "price"
				}else{
					return ""
				}
			}
		},
		methods: {
			
			clear(val){
				this.productList = [];
				this.headItems.forEach((ele,index)=>{
					if(index == val){
						
					}else{
						ele.isDesc = null
					}
				})
				this.page =  {
					start: 1,
					limit: 6,
					lastPage: false
				}
			},
			async getProductList() {
				uni.showLoading({
				    title: '加载中'
				});
				this.more="loading";
				//获取列表
				var res = await findProductList(this.page.start,this.page.limit,{
					categoryId:this.kindId,
					sortBy:this.headItems[this.current].value,
					isDesc:this.headItems[this.current].isDesc
				})
				
					
				// 	uni.hideLoading()
				// 	uni.stopPullDownRefresh();
				// 	return 
				// }else{
					this.productList.push(...res.data.rows);
					this.page.start ++;
					this.total = res.data.total;
				//}
				if(res.data.total <= this.productList.length){ // 如果是最后一页数据
					this.more="noMore";
				}else{
					this.more="more";
				}
				uni.hideLoading()
				uni.stopPullDownRefresh();
				 
			},
			headChange(index,val) {
				this.current = index;
				this.clear(index);
				if(val.isDesc == ""){
					val.isDesc = 1
				}else if(val.isDesc == 1){
					val.isDesc = 0
				}else{
					val.isDesc = 1
				}
				
				this.getProductList();
			},
			 
		},
	}
</script>

<style scoped lang="scss">
	.product-main {
		.head-bar {
			position: fixed;
			left: 0;
			top: 0;
			/* #ifdef H5 */
				top: 84rpx;
			/* #endif */
			
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 62rpx;
			padding-top: 14rpx;
			background-color: #354E44;
			color: #fff;
			font-size: 30rpx;
			line-height: 62rpx;
			z-index: 999;

			.label {
				radio {
					display: none;
				}

				

			}
			.per{
				display: flex;
				align-items: center;
				border-bottom: 2px solid transparent;
				.icons{
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					margin-left: 6rpx;
					color: #fff;
					.icon-child{
						display: flex;
						align-items: center;
						height: 16rpx;
						overflow: hidden;
						/deep/ span{
							height: 100%;
							font-weight: bold;
							display: flex;
							align-items: center;
							justify-content: center;
						} 
					}
				}
			}
			.active {
				// border-bottom: 2px solid #DD524D;
				color: #DD524D;
			}
		}

		.product-list {
			width: 100%;
			margin-top: 120rpx;
			overflow: hidden;
			.product-block {
				float: left;
				width: 316rpx;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				background-color: #fff;
				border-radius: 4px;

				.img {
					width: 100%;
					height: 238rpx;
				}

				.text-area {
					padding: 36rpx;
					font-size: 26rpx;

					.gname {
						color: #3E3E3E;
						line-height: 38rpx;
						margin-top: 8rpx;
						font-weight: bold;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.price-origin {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;

						.origin {
							color: #3E3E3E;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}

			}
		}

	}
</style>
