import request from '@/api/request.js'


// 文章列表
function findArticleByPage(start,limit){
	return request({
		url: `/lejuClient/productArticle/findArticleByPage/${start}/${limit}`,
		method: 'get'
	})
}
// 文章明细
function productArticle(id){
	return request({
		url: `/lejuClient/productArticle/productArticle/${id}`,
		method: 'get'
	})
}
// 品牌列表
function findBrandsByPage(start,limit){
	return request({
		url: `/lejuClient/brand/findBrandsByPage/${start}/${limit}`,
		method: 'get'
	})
}
export {
	findArticleByPage,
	findBrandsByPage,
	productArticle
}