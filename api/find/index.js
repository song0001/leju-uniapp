import request from "../request.js"
// 品牌列表
function findBrandsByPage(start,limit,data){
	return request({
		url:`/lejuClient/brand/findBrandsByPage/${start}/${limit}`,
		data:data
	})
}
// 文章查询列表
function findArticleByPage(start,limit,data){
	return request({
		url:`/lejuClient/productArticle/findArticleByPage/${start}/${limit}`,
		data:data
	})
}

export {
	findBrandsByPage,findArticleByPage
}