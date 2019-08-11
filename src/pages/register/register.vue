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
		
		
		
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">渠道商名称：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入渠道商名称" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">联系人：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入联系人" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">身份证号：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入身份证号" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">联系电话：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入联系电话" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">微信号：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入微信号" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<view class="tui-btn-box">
					<button class="btn-primary" hover-class="btn-hover" formType="submit" type="primary">注册</button>
					<button class="btn-primary btn-gray" hover-class="btn-gray-hover" formType="reset">返回</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	const form = require("../components/utils/formValidation.js")
	import tuiListCell from "../components/list-cell/list-cell"
	export default {
		components: {
			tuiListCell
		},
		data() {
			return {
				avatarUrl:"../../static/my/mine_def_touxiang_3x.png",
				nickName:""
			}
		},
		onShow: function() {
			this.getWeiXinUserInfo();
		},
		methods: {
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
								that._data.nickName = infoRes.userInfo.nickName;
							}
						});
					}
				});
			},
			formSubmit: function(e) {
				console.log("提交数据！！")
				//表单规则
				// let rules = [{
				// 	name: "name",
				// 	rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
				// 	msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
				// }, {
				// 	name: "sex",
				// 	rule: ["required"],
				// 	msg: ["请选择性别"]
				// }, {
				// 	name: "age",
				// 	rule: ["required", "isNum", "range:[0,150]"],
				// 	msg: ["请输入年龄", "请输入正确的年龄", "请输入正确的年龄范围：0-150"]
				// }, {
				// 	name: "mobile",
				// 	rule: ["required", "isMobile"],
				// 	msg: ["请输入手机号", "请输入正确的手机号"]
				// }, {
				// 	name: "email",
				// 	rule: ["required", "isEmail"],
				// 	msg: ["请输入邮箱", "请输入正确的邮箱"]
				// }, {
				// 	name: "idcard",
				// 	rule: ["required", "isIdCard"],
				// 	msg: ["请输入身份证号码", "请输入正确的身份证号码"]
				// }, {
				// 	name: "pwd",
				// 	rule: ["required", "isEnAndNo"],
				// 	msg: ["请输入密码", "密码为8~20位数字和字母组合"]
				// }, {
				// 	name: "pwd2",
				// 	rule: ["required", "isSame:pwd"],
				// 	msg: ["请输入确认密码", "两次输入的密码不一致"]
				// }, {
				// 	name: "range",
				// 	rule: ["required", "range:[3,20]"],
				// 	msg: ["请输入区间数字", "请输入3-20之间的数字"]
				// }, {
				// 	name: "amount",
				// 	rule: ["required", "isAmount"],
				// 	msg: ["请输入金额", "请输入正确的金额，允许保留两位小数"]
				// }];
				// //进行表单检查
				// let formData = e.detail.value;
				// let checkRes = form.validation(formData, rules);
				// if (!checkRes) {
				// 	uni.showToast({
				// 		title: "验证通过!",
				// 		icon: "none"
				// 	});
				// } else {
				// 	uni.showToast({
				// 		title: checkRes,
				// 		icon: "none"
				// 	});
				// }
				uni.switchTab({
					url: '/pages/my/my'
				});
			},
			formReset: function(e) {
				uni.switchTab({
					url: '/pages/my/my'
				});
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
	
	
	
	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	
	.tui-title {
		line-height: 32rpx;
		flex-shrink: 0;
	}
	
	.tui-input {
		font-size: 32rpx;
		color: #333;
		padding-left: 20rpx;
		flex: 1;
	}
	
	.radio-group {
		margin-left: auto;
		transform: scale(0.8);
		transform-origin: 100% center;
		flex-shrink: 0;
	}
	
	.tui-radio {
		display: inline-block;
		padding-left: 28rpx;
		font-size: 36rpx;
		vertical-align: middle;
	}
	
	/** form **/
	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
	}
	
	.btn-gray {
		margin-top: 30rpx;
	}
	
	.tui-tips {
		padding: 30rpx;
		color: #999;
		font-size: 24rpx;
	}
	
</style>
