
import baseUrl from "./baseUrl"

var fun = function(config){
  return new Promise(function(resolve,rejected){
    var obj = {
      url:baseUrl + config.url,
      method:config.method ?  config.method.toUpperCase() : "GET",
      data:config.data,
      timeout:5000,
	  header:{
		  token:uni.getStorageSync('token'),
		  },
      success(res){
        resolve(res.data)
      },
      fail(res){
        rejected(res)
      }
    }
    // if(config.method){ // get / post
    //   if(config.method.toUpperCase() == "POST"){
    //     obj.header['content-type'] = "application/x-www-form-urlencoded"
    //   }
    // }
    uni.request(obj)
  })
}

export default fun;