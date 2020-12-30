import request from "../../request.js"
// 根据分类id查询分类
function findCategory(id){
	return request({
		url:`/lejuClient/productCategory/findCategory/${id}`,
		
	})
}
// 商品列表
function findProductList(start,limit,data){
	return request({
	method:'POST',
	data,
	url:`/lejuClient/product/findProductList/${start}/${limit}`,
		
	})
}
export {
	findCategory,findProductList
}