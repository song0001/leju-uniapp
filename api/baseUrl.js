
// export default "https://leju.bufan.cloud"
var url = ""
 if(process.env.NODE_ENV === 'development'){
     // url =  "http://localhost"
	 // 无本地数据库 用线上地址
	  url = "https://leju.bufan.cloud"
 }else{
     url = "https://leju.bufan.cloud"
 }
export default url
