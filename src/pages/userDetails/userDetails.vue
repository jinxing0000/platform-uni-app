<template>
	<view class='container'>
		<view class='top-container'>
			<image class='bg-img' src='../../static/my/mine_bg_3x.png'></image>
			<view @tap='logout' class='logout' hover-class="opcity" :hover-stay-time="150">
				<image class='logout-img' src='../../static/my/icon_out_3x.png' v-show='isLogin'></image>
				<text class='logout-txt' v-show='isLogin'>退出</text>
			</view>
			<view v-show="!isLogin" class='user-wrapper'>
				<navigator hover-class="opcity" :hover-stay-time="150" class='user'>
					<image class='avatar-img' :src="avatarUrl"></image>
					<text class='user-info-mobile'>{{nickName}}</text>
					<!-- <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="getUserInfo">获取用户信息</button> -->
				</navigator>
			</view>
		</view>
		
		
		<view class="tui-list-view">
			<tui-list-cell :arrow="true" last="true" class="tui-list">
				<image src="../../static/userDetails/qdsmc.png" class="logo" mode="widthFix"></image>
				<text class="tui-list-cell-name">渠道商名称</text>
				<view class="tui-right">{{channelMerchantsInfo.channelName}}</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" last="true" class="tui-list">
				<image src="../../static/userDetails/lxrxx.png" class="logo" mode="widthFix"></image>
				<text class="tui-list-cell-name">联系人</text>
				<view class="tui-right">{{channelMerchantsInfo.contactsName}}</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" last="true" class="tui-list">
				<image src="../../static/userDetails/sfzh.png" class="logo" mode="widthFix"></image>
				<text class="tui-list-cell-name">身份证号</text>
				<view class="tui-right">{{channelMerchantsInfo.cardNumber}}</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" last="true" class="tui-list">
				<image src="../../static/userDetails/lxdd.png" class="logo" mode="widthFix"></image>
				<text class="tui-list-cell-name">联系电话</text>
				<view class="tui-right">{{channelMerchantsInfo.contactNumber}}</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" last="true" class="tui-list">
				<image src="../../static/userDetails/wxh.png" class="logo" mode="widthFix"></image>
				<text class="tui-list-cell-name">微信号</text>
				<view class="tui-right">{{channelMerchantsInfo.wechatNumber}}</view>
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
				avatarUrl:"../../static/my/mine_def_touxiang_3x.png",
				nickName:"",
				channelMerchantsInfo:{}
			}
		},
		onShow: function() {
			const openId = uni.getStorageSync('openId');
			this.getUserInfo(openId);
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
						my.nickName=v.channelName;
						my.channelMerchantsInfo=v;
					}
				});
			},
		}
	}
</script>

<style>
   /* pages/my/my.wxss */
   .container {
   	position: relative;
   }
   
   .top-container {
   	height: 360upx;
   	position: relative;
   	display: flex;
   	flex-direction: column;
   }
   
   .bg-img {
   	position: absolute;
   	width: 100%;
   	height: 360upx;
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
