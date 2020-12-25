import request from "../request.js"
// 1.查询轮播广告
function bannerAds(data){
	return request({
		url:"/lejuClient/home/bannerAds",
		data:data
	})
}

// 查询所有分类
function findAllCategory(data){
	return request({
		url:`/lejuClient/productCategory/findAllCategory`,
		data:data
	})
}

// 限时活动列表
function recommendList(data){
	return request({
		url:"/lejuClient/home/recommendList",
		data:data
	})
}

// 热门推荐
function hotList(data){
	return request({
		url:"/lejuClient/home/hotList",
		data:data
	})
}
// 新品推荐
function latestProducts(start,limit,data){
	return request({
		url:`/lejuClient/home/latestProducts/${start}/${limit}`,
		data:data
	})
}
 
export {
	bannerAds,findAllCategory,recommendList,hotList,latestProducts
}