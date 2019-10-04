<template>
	<view class="container">
		<view v-show="showList">
			<view class="tui-btn-box">
				<button class="btn-primary" hover-class="btn-hover" formType="button" type="primary" @click="goAddPage">新增</button>
			</view>
			<tui-swipe-action :actions="actions"  @click="handlerButton" v-for="(item,index) in dataList"
			 :key="index" :params="item">
				<template v-slot:content>
					<view class="list-item">
						<!-- <image :src="'../../../static/pedestrians/'+item.img" class="item-img" ></image> -->
						<image :src="'../../../static/pedestrians/man.png'" class="item-img" v-if="item.sex === '男'"></image>
						<image :src="'../../../static/pedestrians/woman.png'" class="item-img" v-if="item.sex === '女'"></image>
						<view class="item-box">
							<view class="item-title">{{item.name}}</view>
							<view class="item-time">手机号：{{item.mobile}}身份证号：{{item.cardNumber}}</view>
						</view>
					</view>
				</template>
			</tui-swipe-action>
		</view>
		
		
		<view v-show="!showList">
			<form @submit="saveOrUpdate" >
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">旅客姓名：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入旅客姓名" maxlength="50" type="text" v-model="channelMerchantsPeople.name"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">身份证号：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入身份证号" maxlength="50" type="text" v-model="channelMerchantsPeople.cardNumber"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">手机号：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入手机号" maxlength="50" type="text" v-model="channelMerchantsPeople.mobile"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">性别：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入性别" maxlength="50" type="text" v-model="channelMerchantsPeople.sex"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">出生日期：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入出生日期" maxlength="50" type="text" v-model="channelMerchantsPeople.birthDate"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">年龄：</view>
						<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入年龄" maxlength="50" type="text" v-model="channelMerchantsPeople.age"/>
					</view>
				</tui-list-cell>
				<view class="tui-btn-box">
					<button class="btn-primary" hover-class="btn-hover" formType="submit" type="primary">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	const form = require("../../components/utils/formValidation.js")
	import tuiListCell from "../../components/list-cell/list-cell"
	import tuiSwipeAction from "../../components/swipe-action/swipe-action"
	const request = require("../../../../common/request.js")
	export default {
		components:{
			tuiSwipeAction,
			tuiListCell
		},
		data() {
			return {
				showList:true,
				dataList: [],
				channelMerchantsPeople:{},
				openId:"",
				actions: [
					{
						name: '修改',
						color: '#fff',
						fontsize: 30,
						width: 80,
						//icon: 'like.png',//此处为图片地址
						background: '#ff7900'
					},
					{
						name: '删除',
						color: '#fff',
						fontsize: 30,//单位upx
						width: 80, //单位px
						//icon: 'like.png',//此处为图片地址
						background: '#ed3f14'
					},
				]
			}
		},
		onShow: function() {
			const openId = uni.getStorageSync('openId');
			this.openId=openId;
			this.getChannelMerchantsPeoplePageList(openId);
		},
		methods: {
			getChannelMerchantsPeoplePageList:function(openId){
				let list=this;
				let data=request.request('/app/base/channelMerchantsPeople/getPageList',{
					method:"GET",
					data:{
						channelId:openId,
						page:1,
						limit:10
					}
				});
				data.then((v)=>{
					if(v){
						list.dataList=v.list;
					}
				});
			},
			handlerButton(e) {
				let index = e.index;
				let item = e.item;
				let menuTxt = [ "修改","删除"][index];
				console.log("您点击了【" + menuTxt + "】按钮，列表id：" + item.id);
				//修改按钮
				if(index===0){
					this.goUpdatePage(item.id);
				}
				//删除按钮
				else if(index===1){
					let ids=new Array();
					ids[0]=item.id;
					this.deleteByIds(ids);
				}
			},
			//去新增页面
			goAddPage:function(){
				this.channelMerchantsPeople={};
				this.showList=false;
			},
			//去修改页面
			goUpdatePage:function(id){
				this.getInfoById(id);
				this.showList=false;
			},
			deleteByIds:function(ids){
				let info=this;
				let data=request.request('/app/base/channelMerchantsPeople/delete',{
					method:"DELETE",
					data:ids
				});
				data.then((v)=>{
					uni.showToast({
						title: "删除成功！！",
						icon: 'none',
						duration: 2000
					})
					info.getChannelMerchantsPeoplePageList(info.openId);
				});
			},
			getInfoById:function(id){
				let info=this;
				let data=request.request('/app/base/channelMerchantsPeople/info?id='+id,{
					method:"GET",
					data:{
						id:id
					}
				});
				data.then((v)=>{
					info.channelMerchantsPeople=v;
				});
			},
			saveOrUpdate: function(e) {
				this.channelMerchantsPeople.channelId=this.openId;
				let id = this.channelMerchantsPeople.id;
				console.log(this.channelMerchantsPeople);
				let url="/app/base/channelMerchantsPeople/update";
				let type="PUT";
				if(id==null){
					url="/app/base/channelMerchantsPeople/save";
					type="POST";
				}
				let list=this;
				let data=request.request(url,{
					method:type,
					data:this.channelMerchantsPeople
				});
				data.then((v)=>{
					uni.showToast({
						title: "保存成功！！",
						icon: 'none',
						duration: 2000
					})
					list.getChannelMerchantsPeoplePageList(list.openId);
					list.showList=true;
				});
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
				// this.showList=true;
			},
		}
	}
</script>

<style>
    .container {
    	background: #fff;
    	padding-bottom: env(safe-area-inset-bottom);
    }
    
    .list-item {
    	padding: 30upx 30upx;
    	display: flex;
    	align-items: item;
    }
    
    .item-img {
    	height: 60upx;
    	width: 60upx;
    	margin-right: 20upx;
    	display: block
    }
    
    .item-box {
    	flex: 1;
    	width: 70%;
    	display: flex;
    	flex-direction: column;
    	justify-content: space-between
    }
    
    .item-title {
    	font-size: 32upx;
    	white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
    
    }
    
    .item-time {
    	color: #999;
    	font-size: 24upx;
    }
	
	
	.tui-btn-box {
		padding: 40rpx 50rpx;
		box-sizing: border-box;
	}
	
	
	
	/** form **/
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
