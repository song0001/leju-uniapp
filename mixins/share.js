var obj = {
	// 设置页面可分享 及分享页面路径
	// #ifdef MP-WEIXIN
	onShareAppMessage(res) {
		 var pages = getCurrentPages();
		 var path = pages[pages.length - 1].route;
		 var params =  pages[pages.length - 1].options;
		 if(params){
			 for(var i in params){
				 path = path+`?${i}=${params[i]}`
			 }
		 }
	   if (res.from === 'button') {// 来自页面内分享按钮
	     console.log(res.target)
	   }
	   return {
	     title: '不凡',
	     path: path
	   }
	}
	// #endif
}

export default obj