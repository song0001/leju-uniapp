import request from "../../request.js"
// 获取购物车列表
function findAllCartItem(data){
	return request({
		url:"/lejuClient/cart/findAllCartItem",
		data:data,
		method:"get"
	})
}
// 删除多个购物车
function delCartItems(data){
	return request({
		url:"/lejuClient/cart/delCartItems",
		data:data,
		method:"post"
	})
}


export {
	findAllCartItem,delCartItems
}