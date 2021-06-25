import request from '@/api/request.js'

function doLogin(data){
	return request({
		url: '/lejuClient/login/doLogin',
		method: 'POST',
		data
	})
}
function register(data){
 	return request({
 		url: '/lejuClient/member/register',
 		method: 'POST',
 		data
 	})
 }


 //  获取个人信息
 function getMemberInfo(data){
  	return request({
  		url: '/lejuClient/login/getMemberInfo',
  		method: 'get',
  		data
  	})
  }
 
 
 //  上传头像
 function uploadAvatar(data){
  	return request({
  		url: '/lejuClient/login/uploadAvatar',
  		method: 'post',
  		data
  	})
  }
 
 //  更新用户信息
 function updateMemberInfo(data){
  	return request({
  		url: '/lejuClient/member/updateMemberInfo',
  		method: 'post',
  		data
  	})
  }
  
 //  重置密码
 function resetPassword(id){
  	return request({
  		url: `/lejuClient/member/resetPassword/${id}`,
  		method: 'post'
  	})
  }
  
 // 获取购物车列表
function findAllCartItem(data){
 	return request({
 		url: '/lejuClient/cart/findAllCartItem',
 		method: 'get',
 		data
 	})
 }

 // 删除购物车列表
function delCartItems(data){
 	return request({
 		url: '/lejuClient/cart/delCartItems',
 		method: 'post',
 		data
 	})
 }
export default {
	doLogin,
	register,
	getMemberInfo,
	uploadAvatar,
	updateMemberInfo,
	resetPassword
	
}

export {
	findAllCartItem,
	delCartItems
}