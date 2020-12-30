import request from "../../request.js"
// 1.生成确认单
function addPreOrder(data){
	return request({
		url:`/POST /lejuClient/order/addPreOrder`,
		data:data,
		method:"post"
	})
}


export {
	addPreOrder
}