import baseUrl from "./baseUrl"
import qs from "./qs"

var request = function(config){
  return new Promise((resolve,rejected)=>{
    var setting = {
      url: baseUrl + config.url,
      method:config.method ? (config.method).toUpperCase() :  "GET",
      // method: (config.method).toUpperCase() || "GET",
      data:config.data,
      header:{
		  token:uni.getStorageSync("leju_token") ? uni.getStorageSync("leju_token") : ""
      },
      timeout:5000,
      success(res){
		if(res.data.success == true){
				resolve(res.data);
		}else{
			if(res.data.code == 20002){
				uni.showModal({
					title:"登录提示",
					content:"登录异常，是否重新登录!",
					success(result) {
						if(result.confirm){
							uni.navigateTo({
								url:"/pages/user/login/login"
							})
						}else{
							 uni.showToast({
							 	title:"您取消了!"
							 })
							 rejected(res.data);
						}
					}
				})
				
			}else{
				uni.showToast({
					title:res.data.message,
					icon:"none"
				})
				rejected(res.data);
				
			}
			 //  uni.showToast({
				// title:res.data.message,
				// icon:"none"
			 //  })
			 //  rejected(res)
		}
      },
      fail(res){
        rejected(res)
      }
    }
    uni.request(setting)
  })
  
};
export default request
