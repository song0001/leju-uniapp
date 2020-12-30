<template>
	<view>
		<view class="up">
			<view class="update" @tap="upDateUser">
				修改用户信息
			</view>
		</view>
		<view class="content" v-if="isUpdate">
			<view class="avator">
				<view class="">
					头像
				</view>
				<view class="ima">
					<image :src="userInfo.icon" mode=""></image>
				</view>
			</view>
			<view class="username">
				<view class="">
					用户名
				</view>
				<view class="">
					{{userInfo.username}}
				</view>
			</view>
			<view class="nickname">
				<view class="">
					昵称
				</view>
				<view class="">
					{{userInfo.nickname}}
				</view>
			</view>
			<view class="tel">
				<view class="">
					手机号
				</view>
				<view class="">
					{{userInfo.phone}}
				</view>
			</view>

			<!-- 退出登录 -->
			<button class="tuichu" type="default" @tap="goLogin">退出登录</button>
		</view>


		<!-- 修改用户 -->
		<view class="up-content" v-else>
			<form @submit="formSubmit" class="form">
				<view class="avator">
					<view class="">
						头像
					</view>
					<view v-if="isShow" class="upLoad" type="default" @tap="upAvator">上传头像</view>
					<view v-else class="ima">
						<image class="image" :src="imgPath" mode=""></image>
					</view>
				</view>
				<view class="username">
					<view class="">用户名</view>
					<input class="uni-input" name="username" :value="userInfo.username" placeholder="请输入用户名" />
				</view>
				<view class="nickname">
					<view class="">昵称</view>
					<input class="uni-input" name="nickname" :value="userInfo.nickname" placeholder="请输入昵称" />
				</view>
				<view class="tel">
					<view class="">手机号</view>
					<input class="uni-input" name="phone" :value="userInfo.phone" placeholder="请输入手机号" />
				</view>
				<button form-type="submit" class="submit">更新</button>
			</form>



		</view>
	</view>
</template>

<script>
	import {
		getMemberInfo
	} from "../../../api/user/index.js"
	import{updateMemberInfo} from "../../../api/user/updateMemberInfo/updateMemberInfo.js"
	export default {
		data() {
			return {
				userInfo: '',
				isUpdate: true,
				isShow: true,
				imgPath: ''
			};
		},
		methods: {
			init() {
				getMemberInfo().then(res => {
					console.log(res)
					this.userInfo = res.data.userInfo
				})
			},
			// 退出登录
			goLogin() {
				uni.removeStorageSync('token')
				uni.navigateTo({
					url: "../login/login"
				})
			},
			// 点击修改用户信息
			upDateUser() {
				this.isUpdate = false
			},
			// 点击上传头像
			upAvator() {
				// 选择图片
				uni.chooseImage({
					count: 1,
					sourceType: ['original'],
					sizeType: ["qrCode"],
					success: res => {
						console.log(res);
						// 上传文件
						this.isShow = false
						this.imgPath = res.tempFilePaths[0];
					}
				})
			},
			// 点击更新按钮
			formSubmit(e) {
				// console.log(e)
			var value=e.detail.value
				updateMemberInfo({
					id:this.userInfo.id,
					 icon: this.imgPath,
					 nickname:value.nickname,
					 phone:value.phone,
					 username:value.username
				}).then(res=>{
					// console.log(res)
					uni.showToast({
						title:'更新成功',
						success(res) {
							uni.navigateTo({
								url: "../login/login"
							})
								uni.removeStorageSync('token')
						}
					})
				})
			}
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.up {
		display: flex;
		justify-content: flex-end;

		.update {
			width: 224rpx;
			height: 58rpx;
			border-radius: 10rpx;
			border: 1px solid rgba(0, 0, 0, .2);
			text-align: center;
			line-height: 58rpx;
			font-size: 26rpx;
			margin: 20rpx;
		}
	}

	.content {
		padding: 0 30rpx;
		box-sizing: border-box;

		>view {
			padding: 10rpx 0;
			display: flex;
			height: 94rpx;
			justify-content: space-between;
			border-bottom: 1px solid #e5e5e5;
			align-items: center;
		}

		.avator {
			width: 100%;
			height: 176rpx;

			.ima {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.tuichu {
			width: 370rpx;
			margin-top: 200rpx;
			font-size: 16px;
			color: #fff;
			border-radius: 16rpx;
			background: #1c4b47;
		}
	}

	.up-content {
		padding: 0 30rpx;
		box-sizing: border-box;

		.form {

			.username,
			.nickname,
			.tel {
				padding: 10rpx 0;
				display: flex;
				height: 94rpx;
				justify-content: space-between;
				border-bottom: 1px solid #e5e5e5;
				align-items: center;
			}

			input {
				text-align: right;
			}
		}


		.avator {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #e5e5e5;
			padding: 10rpx 0;

			.upLoad {
				width: 178rpx;
				height: 62rpx;
				border: 1px solid rgba(0, 0, 0, 0.2);
				border-radius: 10rpx;
				text-align: center;
				line-height: 62rpx;
				font-size: 26rpx;
			}

			.ima {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.submit {
			width: 370rpx;
			margin-top: 200rpx;
			font-size: 16px;
			color: #fff;
			border-radius: 16rpx;
			background: #1c4b47;
		}
	}
</style>
