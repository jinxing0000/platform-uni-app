<script>
	const request = require("../common/request.js")
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					let code=loginRes.code;
					let data=request.request('/app/weChat/getWeChatOpenId',{
						method:"GET",
						data:{
							code:code
						}
					});
					data.then((v)=>{
						uni.setStorageSync('openId', v.openId);
					});
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*每个页面公共css */
	@import "../common/app.css";
</style>
