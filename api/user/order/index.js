import request from "../../request.js"
// 1.生成确认单
function addPreOrder(data){
	return request({
		url:`/lejuClient/order/addPreOrder`,
		data:data,
		method:"post"
	})
}
// 查询所有订单列表
function findAllOrders(data){
	return request({
		url:`/lejuClient/order/findAllOrders`,
		data:data,
		method:"get"
	})
}

// 2.根据订单id获取订单明细
function getPreOrderById(orderId){
	return request({
		url:`/lejuClient/order/getPreOrderById/${orderId}`,
		method:"get"
	})
}
export {
	addPreOrder,findAllOrders,getPreOrderById
}