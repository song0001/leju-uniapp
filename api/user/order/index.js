import request from "../../request.js"
// 1.生成确认单 立即购买
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

// 根据订单id获取订单明细
function getPreOrderById(orderId){
	return request({
		url:`/lejuClient/order/getPreOrderById/${orderId}`,
		method:"get"
	})
}

// 2. 提交确认单
function addConfirmOrder(data){
	return request({
		url: `/lejuClient/order/addConfirmOrder`,
		method: 'post',
		data
	})
}
// 3. 确认付款
function payConfirm(data){
	return request({
		url: `/lejuClient/order/payConfirm`,
		method: 'post',
		data
	})
}
// 取消订单 
function cancelOrder(id){
	return request({
		url: `/lejuClient/order/cancelOrder/${id}`,
		method: 'post'
	})
}
// 确认收货
function receiveDone(data){
	return request({
		url: `/lejuClient/order/receiveDone`,
		method: 'post',
		data
	})
}
// 删除订单
function deleteOrder(id,data){
	return request({
		url: `/lejuClient/order/deleteOrder/${id}`,
		method: 'delete',
		data
	})
}
// 获取退单公司地址
function getCompanyAddrss(data){
	return request({
		url: `/lejuClient/orderReturn/getCompanyAddrss`,
		method: 'get',
		data
	})
}
// 申请退单
function addOrderReturnApply(data){
	return request({
		url: `/lejuClient/orderReturn/addOrderReturnApply`,
		method: 'post',
		data
	})
}
// 退单列表
function orderReturnApplys(data){
	return request({
		url: `/lejuClient/orderReturn/orderReturnApplys`,
		method: 'get',
		data
	})
}
// 退单列表
function orderReturnInfo(data){
	return request({
		url: `/lejuClient/orderReturn/${data}`,
		method: 'get'
	})
}

// 清除当前用户订单
function _clearUserOrders(data){
	return request({
		url: `/lejuClient/order/_clearUserOrders`,
		method: 'post'
	})
}
export {
	addPreOrder,findAllOrders,getPreOrderById,payConfirm,cancelOrder,
	receiveDone,
	deleteOrder,
	getCompanyAddrss,
	addOrderReturnApply,
	orderReturnApplys,
	orderReturnInfo,
	_clearUserOrders,
	addConfirmOrder
}