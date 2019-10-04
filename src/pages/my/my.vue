<template>
	<!--pages/my/my.wxml-->
	<view class='container'>
		<view class='top-container'>
			<image class='bg-img' src='../../static/my/mine_bg_3x.png'></image>
			<view @tap='logout' class='logout' hover-class="opcity" :hover-stay-time="150">
				
			</view>
			<view v-show="!isLogin" class='user-wrapper'>
				<navigator hover-class="opcity" :hover-stay-time="150" class='user' @click="goRegister()">
					<image class='avatar-img' :src="avatarUrl"></image>
					<text class='user-info-mobile'>成为渠道商</text>
					<!-- <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="getUserInfo">获取用户信息</button> -->
				</navigator>
			</view>
			<view v-show='isLogin' class='user-wrapper'>
				<navigator hover-class="opcity" :hover-stay-time="150" class='user' >
					<image class='avatar-img' :src="avatarUrl"></image>
					<text class='user-info-mobile'>{{channelName}}</text>
					<!-- <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="getUserInfo">获取用户信息</button> -->
				</navigator>
			</view>
		</view>


		<view class='bottom-container'>
			<view class='ul-item'>
				<view @tap='tapEvent' data-index="2" data-key='未处理订单' class='item' hover-class="opcity" :hover-stay-time="150">
					<image class='item-img' src='../../static/my/dcldd.png'></image>
					<text class='item-name'>未处理订单</text>
				</view>
				<view @tap='tapEvent' data-index="2" data-key='' class='item' hover-class="opcity" :hover-stay-time="150">
					<image class='item-img' src='../../static/my/wcxdd.png'></image>
					<text class='item-name'>待出行订单</text>
				</view>
				<view @tap='tapEvent' data-index="2" data-key='已完成订单' class='item' hover-class="opcity" :hover-stay-time="150">
					<image class='item-img' src='../../static/my/ywcdd.png'></image>
					<text class='item-name'>已完成订单</text>
				</view>
			</view>
		</view>
		
		<view class="tui-list-view">
			<tui-list-cell @click="goToUserIno" :arrow="true" class="tui-list">
				<tui-icon name="wealth-fill" size="24" color="#ff7900"></tui-icon>
				<text class="tui-list-cell-name">渠道商信息</text>
			</tui-list-cell>
			<tui-list-cell @click="goToPedestriansList" :arrow="true" class="tui-list">
				<image src="../../static/my/cxrxx.png" class="logo" mode="widthFix"></image>
				<view class="tui-list-cell-name">出行人信息</view>
			</tui-list-cell>
			<tui-list-cell @click="detail" :arrow="true" class="tui-list">
				<image src="../../static/my/kf.png" class="logo" mode="widthFix"></image>
				<view class="tui-list-cell-name">客服中心</view>
				<tui-tag size="small" type="light-green" shape="circle" class="tui-right">客服中心</tui-tag>
			</tui-list-cell>
			<!-- <tui-list-cell @click="detail" :arrow="true" class="tui-list">
				<tui-icon name="shop-fill" size="23" color="#ed3f14"></tui-icon>
				<view class="tui-list-cell-name">我的店铺</view>
				<view class="tui-right">进入店铺</view>
			</tui-list-cell> -->
			<tui-list-cell @click="detail" :arrow="true" last="true" class="tui-list">
				<image src="../../static/my/guanyu.png" class="logo" mode="widthFix"></image>
				<text class="tui-list-cell-name">关于</text>
				<view class="tui-right">山西省旅游信息平台</view>
			</tui-list-cell>
		</view>
		
		
		
	</view>
</template>

<script>
	import tuiListView from "../components/list-view/list-view"
	import tuiListCell from "../components/list-cell/list-cell"
	import tuiIcon from "../components/icon/icon"
	import tuiTag from "../components/tag/tag"
	import tuiBadge from "../components/badge/badge"
	const request = require("../../../common/request.js")
	export default {
		components: {
			tuiListView,
			tuiListCell,
			tuiIcon,
			tuiTag,
			tuiBadge
		},
		data() {
			return {
				isLogin:false,
				avatarUrl:"../../static/my/mine_def_touxiang_3x.png",
				channelName:""
			}
		},
		onShow: function() {
			const openId = uni.getStorageSync('openId');
			this.getUserInfo(openId);
		},
		onLoad() {
			//this.getWeiXinUserInfo();
		},
		methods: {
			getUserInfo:function(id){
				let my=this;
				let data=request.request('/app/base/channelMerchantsInfo/info',{
					method:"GET",
					data:{
						id:id
					}
				});
				data.then((v)=>{
					if(v){
						my.isLogin=true;
						my.avatarUrl=v.headPortraitUrl;
						my.channelName=v.channelName;
					}
				});
			},
			//到注册页面
			goRegister:function(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			//到出行人列表页面
			goToPedestriansList:function(){
				uni.navigateTo({
					url: '/pages/pedestrians/list/list'
				});
			},
			//用户详情页面
			goToUserIno:function(){
				uni.navigateTo({
					url: '/pages/userDetails/userDetails'
				});
			},
			//获取微信用户信息
			getWeiXinUserInfo:function(){
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								console.log(infoRes);
								that._data.avatarUrl = infoRes.userInfo.avatarUrl;
							}
						});
					}
				});
			},
			logout: function() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					confirmColor: '#5677FC',
					success: (res) => {
						if (res.confirm) {
							uni.clearStorage()
							uni.reLaunch({
								url: '../login/login'
							})
						}
					}
				});
			},
			edit() {
				this.tui.toast("功能开发中~")
			},
			tapEvent: function(e) {
				let index = e.currentTarget.dataset.index;
				let url = "";
				if (index == 1) {
					url = '../about/about'
				} else if (index == 2) {
					let key = e.currentTarget.dataset.key;
					url = '../maps/maps?key=' + key
				} else {
					url = '../log/log'
				}
				uni.navigateTo({
					url: url
				})
			},
			github: function(type) {
				if (type == 1) {
					const that = this
					uni.setClipboardData({
						data: 'https://github.com/dingyong0214/ThorUI-uniapp',
						success(res) {
							uni.getClipboardData({
								success(res) {
									that.tui.toast("链接已复制", 2000, true)
								}
							})
						}
					})
				} else {
					// #ifdef H5
					location.href = "https://github.com/dingyong0214/ThorUI-uniapp"
					// #endif
				}
			},
			previewReward: function() {
				uni.previewImage({
					urls: ["https://thorui.cn/img/reward.jpg"]
				})
			}
		}
	}
</script>

<style>
	/* pages/my/my.wxss */
	.container {
		position: relative;
	}

	.top-container {
		height: 440upx;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.bg-img {
		position: absolute;
		width: 100%;
		height: 440upx;
		z-index: -1;
	}

	.logout {
		width: 110upx;
		height: 36upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 42upx 0 24upx 32upx;
	}

	.logout-img {
		width: 36upx;
		height: 36upx;
		margin-right: 11upx;
	}

	.logout-txt {
		font-size: 28upx;
		color: #FEFEFE;
		line-height: 28upx;
	}

	.user-wrapper {
		display: flex;
		justify-content: center;
	}

	.user {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.avatar-img {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		align-self: center;
	}

	.user-info {
		display: flex;
		flex-direction: row;
		margin-top: 30upx;
		align-items: center;
	}

	.user-info-mobile {
		margin-top: 30upx;
		position: relative;
		font-size: 28upx;
		color: #FEFEFE;
		line-height: 28upx;
		align-self: center;
		padding: 0 50upx;
	}

	.edit-img {
		position: absolute;
		width: 42upx;
		height: 42upx;
		right: 0;
		bottom: -4upx;
	}

	.edit-img>image {
		width: 42upx;
		height: 42upx;
		padding-left: 25upx;
	}

	.middle-container {
		height: 138upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 10upx;
		background-color: #FFFFFF;
		margin: -30upx 30upx 26upx 30upx;
		box-shadow: 0 15upx 10upx -15upx #efefef;

	}

	.middle-item {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.ticket-img {
		width: 80upx;
		height: 80upx;
		margin-left: 65upx;
	}

	.middle-tag {
		font-size: 28upx;
		color: #333333;
		line-height: 28upx;
		font-weight: bold;
		padding-left: 22upx;
	}

	.car-img {
		width: 80upx;
		height: 80upx;
		margin-left: 97upx;
	}

	.bottom-container {
		height: 213upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 74upx 40upx 95upx;
		margin: 0 30upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		box-sizing: border-box;
		box-shadow: 0 0 10upx #efefef
	}

	.ul-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.item-img {
		width: 64upx;
		height: 64upx;
	}

	.item-name {
		padding-top: 13upx;
		font-size: 24upx;
		color: #666666;
		min-width: 80upx;
		text-align: center;
	}

	.btn-feedback {
		background: transparent !important;
		position: absolute;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}
	
	
	
	/**  list  **/
	.tui-list-view {
		padding-top: 40upx !important
	}
	
	.tui-list-cell-name {
		padding-left: 20upx;
		vertical-align: middle;
		line-height: 55upx;
	}
	
	.tui-list::after {
		left: 94upx !important
	}
	
	.tui-right {
		margin-left: auto;
		margin-right: 34upx;
		font-size: 26upx;
		line-height: 1;
		color: #999;
	}
	
	.logo {
		height: 40upx;
		width: 40upx;
	}
	
	.tui-flex {
		display: flex;
		align-items: center;
	}
	
	.tui-msg-box {
		display: flex;
		align-items: center;
	}
	
	.tui-msg-pic {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		display: block;
		margin-right: 24upx;
	}
	
	.tui-msg-item {
		max-width: 500upx;
		min-height: 80upx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34upx;
		line-height: 1;
		color: #262b3a;
	}
	
	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26upx;
		line-height: 1;
		color: #9397a4;
	}
	
	.tui-msg-right {
		max-width: 120upx;
		height: 88upx;
		margin-left: auto;
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.tui-msg-right.tui-right-dot {
		height: 76upx;
		padding-bottom: 10upx;
	
	}
	
	.tui-msg-time {
		width: 100%;
		font-size: 24upx;
		line-height: 24upx;
		color: #9397a4;
	}
	
	.tui-badge {
		width: auto
	}
	
	.tui-msg::after {
		left: 154upx !important
	}
</style>
