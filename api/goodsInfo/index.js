import request from "../request.js"
// 1.查询轮播广告
function productDetail(productId) {
	return request({
		url: `/lejuClient/product/productDetail/${productId}`,
		// data:data
	})
}
// 添加购物车
function addCart(data) {
	return request({
		url: `/lejuClient/cart/addCart`,
		method: "post",
		data
	})
}

export {
	productDetail,
	addCart
}
