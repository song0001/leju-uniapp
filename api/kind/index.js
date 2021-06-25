import request from '@/api/request.js'

// 乐居4个主分类
function findCategory(){
	return request({
		url:"/lejuClient/productCategory/findCategory/1308336521604599809"
	})
}
// 获取分类列表
function findProductList(start,limit,data){
	return request({
		url:`/lejuClient/product/findProductList/${start}/${limit}`,
		method:"post",
		data
	})
}

// 分类详情  
function productDetail(id){
	return request({
		url:`/lejuClient/product/productDetail/${id}`,
		method:"get"
	})
}

// 添加购物车  
function addCart(data){
	return request({
		url:`/lejuClient/cart/addCart`,
		method:"post",
		data
	})
}

// 立即购买  
function addPreOrder(data){
	return request({
		url:`/lejuClient/order/addPreOrder`,
		method:"post",
		data
	})
}


export {
	findCategory,
	findProductList,
	productDetail,
	addCart,
	addPreOrder
}