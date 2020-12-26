import request from "../request.js"
// 1查询所有分类
function findAllCategory(data){
	return request({
		url:"/lejuClient/productCategory/findAllCategory",
		data:data
	})
}
export {
	findAllCategory
}