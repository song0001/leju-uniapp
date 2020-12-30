import request from "../../request.js"

function updateMemberInfo(data){
	return request({
		url:"/lejuClient/member/updateMemberInfo",
		data:data,
		method:"post"
	})
}


export {
	updateMemberInfo
}