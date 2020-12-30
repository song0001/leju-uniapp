var obj = {
	onShow(){
		var token = uni.getStorageSync("token");
		if(token){
			
		}else{
			uni.showModal({
				title:"登录提示",
				content:"暂未登录，是否立即登录",
				success(res){
					console.log(res);
					if(res.confirm){
						uni.navigateTo({
							url:"/pages/user/login/login"
						})
						
					}else{
						uni.showToast({
							title:"取消了"
						})
					}
				}
			})
		}
	}
}
export default obj