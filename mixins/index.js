var obj = {
	methods:{
		checkLogin1(val){ // 去判断用户是否登录 如果登录 就发送请求 如果没登录 取消请求发送
			if(this.checkLogins()){ // true
				val();	
			}
		},
		checkLogins(){
			var val = uni.getStorageSync("token");
			if(val){
				return true
			}else{
				uni.showModal({
					title:"登录提示",
					content:"暂未登录,是否跳转到登录界面",
					success(res){
						if(res.confirm){
							uni.navigateTo({
								url:"/pages/user/login/login"
							})
						}else{
							uni.showToast({
								title:"您取消了",
								icon:"none"
							})
						}
					}
				})
				return false
			}
		}
	}
}


export default obj;