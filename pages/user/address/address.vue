<template>
  <view>
    <view class="content" style="width: 100%;">
      <view class="list" style="width: 100%;">
        <view class="row" v-for="(row,index) in aList" :key="index" @tap="select(row)">
          <view class="center">
            <view class="name-tel">
              <view class="name">{{row.name}}</view>
              
              <view class="default" v-if="row.defaultStatus">默认</view>
            </view>
			<view class="tel">{{row.phoneNumber}}</view>
            <view
              class="address"
              v-if="row.address"
            >{{ row.province }}-{{ row.city }}-{{ row.region }}</view>
          </view>
          <view class="right">
            <view class="icon edit" @tap.stop="edit(row)">
				<image src="../../../static/icons/edit.png" mode=""></image>
			</view>
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
import { findAllAddress } from "@/api/address/index.js";
import mix from "@/mixins/index.js"
export default {
  data() {
    return {
      isSelect: false,
      userId: "",
      aList: [],
	  id:""
    };
  },
  mixins:[mix],
  onShow() {
	  this.checkLogins(this.getAddressList);
  },
  // e.xx 从上个页面通过地址栏传参传过来的参数
  onLoad(e) {
    if (e.type == "select") {
      this.isSelect = true;
    }
	// if(e.id){
	// 	this.id = e.id
	// }
  },
  methods: {
    edit(row) {
		uni.navigateTo({
		  url: "./addAddress/addAddress?addressId="+row.id
		});
    },
    add() {
      uni.navigateTo({
        url: "./addAddress/addAddress"
      });
    },
    select(row) {
      //是否需要返回地址(从订单确认页跳过来选收货地址)
      if (!this.isSelect) {
        return;
      }
	  uni.setStorageSync("selectAddress",row);
	  uni.navigateBack({
	  	delta:1
	  });
	  // uni.navigateTo({
	  // 	url:`/pages/mine/order/detail/index?id=${this.id}&memberId=${row.id}`
	  // })
    },
    getAddressList() {
      findAllAddress()
        .then(res => {
			this.aList = res.data.items;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
view {
  display: flex;
}

.add {
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
    .icon {
      height: 80upx;
      color: #fff;
      font-size: 30upx;
      justify-content: center;
      align-items: center;
    }
    font-size: 30upx;
  }
}
.list {
  flex-wrap: wrap;
  .row {
    width: 94%;
    padding: 20upx 0;
	border-bottom: 1Px solid #ccc;
	margin: 0 auto;
    .left {
      width: 90upx;
      flex-shrink: 0;
      align-items: center;
      .head {
        width: 70upx;
        height: 70upx;
        background: linear-gradient(to right, #ccc, #aaa);
        color: #fff;
        justify-content: center;
        align-items: center;
        border-radius: 60upx;
        font-size: 35upx;
      }
    }
	
    .center {
      width: 100%;
      flex-wrap: wrap;
	  flex-direction: column;
	  .tel {
	    margin-left: 30upx;
	    font-size: 24upx;
	    color: #999999;
	  }
      .name-tel {
        // width: 100%;
		margin-left: 30upx;
        align-items: baseline;
		margin-bottom: 20rpx;
        .name {
          font-size: 28upx;
        }
       
        .default {
          font-size: 22upx;

          background-color: #354E44;
          color: #fff;
          padding: 0 18upx;
          border-radius: 8upx;
          margin-left: 20upx;
        }
      }
      .address {
        width: 100%;
        font-size: 24upx;
        align-items: baseline;
        color: #777;
      }
    }
    .right {
      flex-shrink: 0;
      align-items: center;
      margin-left: 20upx;
      .icon {
        justify-content: center;
        align-items: center;
        width: 80upx;
        height: 60upx;
        border-left: solid 1upx #aaa;
        font-size: 40upx;
        color: #777;
		uni-image,image{
			width: 40rpx;
			height: 40rpx;
			opacity: .8;
		}
      }
    }
  }
}
</style>
