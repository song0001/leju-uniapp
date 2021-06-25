import request from '@/api/request.js'
// 1. 获取订单详情
function getPreOrderById(id){
	return request({
		url: `/lejuClient/order/getPreOrderById/${id}`,
		method: 'get',
		// data
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

// 查询订单列表
function findAllOrders(data){
	return request({
		url: `/lejuClient/order/findAllOrders`,
		method: 'get',
		data
	})
}

// 查询订单列表分页
function findOrdersByPage(start,limit,data){
	return request({
		url: `/lejuClient/order/findOrdersByPage/${start}/${limit}`,
		method: 'get',
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

// 删除顶顶那
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

// 上帝模式
function _clearAllOrders(data){
	return request({
		url: `/lejuClient/order/_clearAllOrders?sign=OMG`,
		method: 'get'
	})
}
export {
	getPreOrderById,
	addConfirmOrder,
	payConfirm,
	findAllOrders,
	cancelOrder,
	receiveDone,
	deleteOrder,
	getCompanyAddrss,
	addOrderReturnApply,
	orderReturnApplys,
	orderReturnInfo,
	_clearAllOrders,
	findOrdersByPage
}