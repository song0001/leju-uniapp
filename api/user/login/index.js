import request from "../../request.js"

function doLogin(data){
	return request({
		url:"/lejuClient/login/doLogin",
		data:data,
		method:"post"
	})
}


export {
	doLogin
}