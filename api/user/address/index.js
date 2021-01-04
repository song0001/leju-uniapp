import request from "../../request.js"
//查询地址列表
function findAllAddress(data){
	return request({
		url:"/lejuClient/address/findAllAddress",
		data:data,
		method:"get"
	})
}


export {
findAllAddress
}