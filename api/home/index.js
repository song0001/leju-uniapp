import request from '@/api/request.js'
// 1. 广告部分
function bannerList(data){
	return request({
		url: '/lejuClient/home/bannerAds',
		method: 'get',
		// data
	})
}
// 2. 限时活动
function recommendList(data){
	return request({
		url: `/lejuClient/home/recommendList`,
		method: 'get',
	})
}

function brandList(data){
	return request({
		url: `/lejuClient/home/lejuLatestProducts/${data.start}/${data.limit}`,
		method: 'get',
	})
}

// 3. 最热推荐
function hotList(data){
	return request({
		url: `/lejuClient/home/hotList`,
		method: 'get'
	})
}
// 推荐新品列表
function productList(data){
	return request({
		url: `/lejuClient/home/latestProducts/${data.start}/${data.limit}`,
		method: 'get'
	})
}


 
// 4. 最新推荐
function lejuLatestProducts(data){
	return request({
		url: `/lejuClient/home/lejuLatestProducts`,
		method: 'get'
	})
}

// 5. 最高销量推荐
function saleMostProducts(data){
	return request({
		url: `/lejuClient/home/saleMostProducts`,
		method: 'get'
	})
}
export {
	bannerList,
	brandList,
	hotList,
	productList,
	lejuLatestProducts,
	saleMostProducts,
	recommendList
}