import request from "../request.js"

function getMemberInfo(data){
	return request({
		url:"/lejuClient/login/getMemberInfo",
		data:data
	})
}


export {
	getMemberInfo
}