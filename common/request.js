//公共js,以及基本方法封装 nvue里使用
const fetch = {
	interfaceUrl: function() {
		//接口地址
		return "http://192.168.2.183:8080";
	},
	toast: function(tips) {
		uni.showToast({
			title: tips || "出错啦~",
			icon: 'none',
			duration: 2000
		})
	},
	request: function(url,data) {
		uni.showLoading({
			mask: true,
			title: '正在加载...'
		})
		//设置请求头
		let header = {
			'content-type':'application/json'
		}
		//请求方式
		let method=data.method;
		//请求参数
		let params=data.data;
		//是否加入token
		let isToken=data.token;
		if(method!='GET'){
			params=JSON.stringify(params);
		}
		//是否需要token
		if(isToken){
			let token = uni.getStorageSync('token');
			header.Authorization=token;
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: fetch.interfaceUrl() + url,
				data: params,
				header:header,
				method: method, 
				dataType: 'json',
				success: (res) => {
					uni.hideLoading();
					if(res.data.code===0){
						resolve(res.data.data);
					}else{
						fetch.toast(res.data.msg);
					}
				},
				fail: (res) => {
					fetch.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	}
}

module.exports = {
	request: fetch.request,
	toast: fetch.toast
}
