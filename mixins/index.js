

var obj = {
	methods:{
		// checkLogins  检查是否已经登录
		checkLogins(val){
			if(this.checkHasLogined()){
				val();
			}
		},
		checkHasLogined(){
			var token = uni.getStorageSync("leju_token");
			if(token){
				return true
			}else{
				uni.showModal({
					title:"登录提示",
					content:"暂未登录，是否立即登录",
					success(res){
						if(res.confirm){
							
							uni.navigateTo({
								url:"/pages/user/login/login"
							})
						}else{
							uni.showToast({
								title:"您取消了"
							})
						}
					}
				})
				return false
			}
		}
	}
}
export default obj