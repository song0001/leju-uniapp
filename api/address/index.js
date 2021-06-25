import request from '@/api/request.js'

// 注意  修改地址的收获 切换默认地址  是通过调取switchDefault 来达到修改地址的作用
// 新增不受影响
// 1. 获取地址列表
function findAllAddress(id){
	return request({
		url: `/lejuClient/address/findAllAddress`,
		method: 'get',
		// data
	})
}
// 2. 更新地址
function updateAddressInfo(data){
	return request({
		url: `/lejuClient/address/updateAddressInfo`,
		method: 'post',
		data
	})
}
// 3. 新增收获地址
function addAddressInfo(data){
	return request({
		url: `/lejuClient/address/addAddressInfo`,
		method: 'post',
		data
	})
}
// 4. 切换修改地址默认
function switchDefault(addressId,defaultStatus){
	return request({
		url: `/lejuClient/address/switchDefault/${addressId}/${defaultStatus}`,
		method: 'post'
	})
}
// 5. 删除地址
function delAddressInfo(addressId){
	return request({
		url: `/lejuClient/address/delAddressInfo/${addressId}`,
		method: 'delete'
	})
}
export {
	findAllAddress,
	updateAddressInfo,
	addAddressInfo,
	switchDefault,
	delAddressInfo
}