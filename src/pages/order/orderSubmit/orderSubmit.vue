<template>
    <view class="container">
		<view v-show="!showPeopleList">
			<form>
				<tui-list-cell>
					<view class="tui-line-cell">
						<view>{{productInfo.productName}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">出发城市：{{productInfo.startingCity}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">产品有效期：{{productInfo.startDate}}至{{productInfo.endDate}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title tui-flex-1">成人</view>
						<view class="tui-title tui-flex-1" style="color: red;">￥{{productInfo.adultPrice}}元/人</view>
						<tui-numberbox :min="0" :max="100" :value="productOrder.adultNumber" @change="setAdultNumber"></tui-numberbox>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title tui-flex-1">儿童</view>
						<view class="tui-title tui-flex-1" style="color: red;">￥{{productInfo.childrenPrice}}元/人</view>
						<tui-numberbox :min="0" :max="100" :value="productOrder.childrenNumber" @change="setChildrenNumber"></tui-numberbox>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title tui-flex-1">单房差</view>
						<view class="tui-title tui-flex-1" style="color: red;">￥{{productInfo.singleRoomPrice}}元/间</view>
						<tui-numberbox :min="0" :max="100" :value="productOrder.singleRoomNumber" @change="setSingleRoomNumber"></tui-numberbox>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">出生日期：</view>
						 <picker mode="date" :value="productOrder.setOutDate" @change="bindDateChange" :start="productInfo.startDate" end="productInfo.endDate">
						    <view class="uni-input">{{productOrder.setOutDate}}</view>
						 </picker>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">出行人：</view>
						<input placeholder-class="phcolor" class="tui-input" name="contactsName" placeholder="请输入出行人" maxlength="50" type="text" />
						<button class="tui-btn tui-btn-small tui-primary" hover-class="tui-primary-hover" @click="selectPeopleList">选择</button>
					</view>
				</tui-list-cell>
				<tui-swipe-action :actions="actions"  @click="handlerButton" v-for="(item,index) in productOrder.productOrderPeopleList"
				 :key="index" :params="item">
					<template v-slot:content>
						<view class="list-item">
							<!-- <image :src="'../../../static/pedestrians/'+item.img" class="item-img" ></image> -->
							<image :src="'../../../static/pedestrians/man.png'" class="item-img" v-if="item.sex === '男'"></image>
							<image :src="'../../../static/pedestrians/woman.png'" class="item-img" v-if="item.sex === '女'"></image>
							<view class="item-box">
								<view class="item-title">{{item.name}}</view>
								<view class="item-time">身份证号：{{item.cardNumber}}</view>
							</view>
						</view>
					</template>
				</tui-swipe-action>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">联系人：</view>
						<input placeholder-class="phcolor" class="tui-input" name="contactsName" placeholder="请输入联系人" maxlength="50" type="text" v-model="productOrder.contactsName"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">联系电话：</view>
						<input placeholder-class="phcolor" class="tui-input" name="contactNumber" placeholder="请输入联系电话" maxlength="50" type="text" v-model="productOrder.contactNumber"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">联系邮箱：</view>
						<input placeholder-class="phcolor" class="tui-input" name="email" placeholder="请输入联系邮箱" maxlength="50" type="text" v-model="productOrder.email"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">买家留言：</view>
						<input placeholder-class="phcolor" class="tui-input" name="leavingMessage" placeholder="请输入买家留言" maxlength="50" type="text" v-model="productOrder.leavingMessage"/>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
					</view>
				</tui-list-cell>
			</form>
			<!--底部操作栏-->
			<view class="tui-operation">
				<view class="tui-operation-left tui-col-5">
					<view class="tui-operation-item">
						<view class="tui-operation-text tui-scale-small" style="font-size: 17px;color: red;">应付款:￥{{productOrder.orderTotal}}元</view>
					</view>
				</view>
				<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
					<!-- <view class="tui-flex-1">
						<tui-button type="danger" shape="circle" size="mini" @click="showPopup">加入购物车</tui-button>
					</view> -->
					<view class="tui-flex-1">
						<tui-button type="danger" shape="circle" size="mini" @click="goOrderSubmitPage">提交订单</tui-button>
					</view>
				</view>
			</view>
			<!--底部操作栏-->
		</view>
		
		
		
		<view v-show="showPeopleList">
			<view class="tui-btn-box">
				<button class="btn-primary" hover-class="btn-hover" formType="button" type="primary" @click="backOrderSubmit">确定</button>
			</view>
			<checkbox-group @change="checkboxChange">
			<tui-swipe-action :actions="actions"  @click="handlerButton" v-for="(item,index) in peopleDataList"
			 :key="index" :params="item">
				<template v-slot:content>
					<view class="list-item">
						<checkbox :value="item.id" :checked="false" />
						<!-- <image :src="'../../../static/pedestrians/'+item.img" class="item-img" ></image> -->
						<image :src="'../../../static/pedestrians/man.png'" class="item-img" v-if="item.sex === '男'"></image>
						<image :src="'../../../static/pedestrians/woman.png'" class="item-img" v-if="item.sex === '女'"></image>
						<view class="item-box">
							<view class="item-title">{{item.name}}</view>
							<view class="item-time">身份证号：{{item.cardNumber}}</view>
						</view>
					</view>
				</template>
			</tui-swipe-action>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "../../components/icon/icon"
	import tuiTag from "../../components/tag/tag"
	import tuiBadge from "../../components/badge/badge.vue"
	import tuiNomore from "../../components/nomore/nomore"
	import tuiButton from "../../components/button/button"
	import tuiTopDropdown from "../../components/top-dropdown/top-dropdown"
	import tuiBottomPopup from "../../components/bottom-popup/bottom-popup"
	import tuiNumberbox from "../../components/numberbox/numberbox"
	import tuiDivider from "../../components/divider/divider"
	import tuiDropdownList from "../../components/dropdown-list/dropdown-list"
	const form = require("../../components/utils/formValidation.js")
	import tuiListCell from "../../components/list-cell/list-cell"
	import tuiSwipeAction from "../../components/swipe-action/swipe-action"
	const request = require("../../../../common/request.js")
	export default {
		components: {
			tuiIcon,
			tuiTag,
			tuiBadge,
			tuiNomore,
			tuiButton,
			tuiTopDropdown,
			tuiBottomPopup,
			tuiNumberbox,
			tuiDivider,
			tuiSwipeAction,
			tuiListCell,
			tuiDropdownList
		},
		data() {
			return {
				showPeopleList:false,
				productInfo:{
					
				},
				productOrder:{
					adultNumber:1,
					childrenNumber:0,
					singleRoomNumber:0,
					productOrderPeopleList:[],
					setOutDate:""
				},
				peopleDataList: [],
				peopleMap:{},
				openId:""
			}
		},
		onLoad: function(options) {
			let id = options.id;
			this.getProductInfo(id);
			const openId = uni.getStorageSync('openId');
			this.openId=openId;
		},
		methods: {
			//获取产品信息详情
			getProductInfo:function(id){
				let data=request.request('/app/tourism/productInfo/info?id='+id,{
					method:"GET",
					data:{
						id:id
					}
				});
				data.then((v)=>{
					this.productInfo=v;
					this.productOrder.productId=v.id;
					this.productOrder.orderType="1";
					this.productOrder.adultNumber=1;
					this.productOrder.orderTotal=v.adultPrice;
					this.productOrder.setOutDate=v.startDate;
					this.productOrder.channelMerchantsId=this.openId;
					this.productOrder.supplierId=v.supplierId;
					this.productOrder.supplierName=v.supplierName;
					this.productOrder.productName=v.productName;
					this.productOrder.productGuidePicUrl=v.productGuidePicUrl;
				});
			},
			goOrderSubmitPage:function(){
				console.log(this.productOrder);
				let contactNumber=this.productOrder.contactNumber;
				let contactsName=this.productOrder.contactsName;
				if(!contactsName){
					uni.showToast({
						title: "请输入联系人！！",
						icon: 'none',
						duration: 2000
					})
					return ;
				}
				const mobileReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
				if(!mobileReg.test(contactNumber)){
					uni.showToast({
						title: "请输入有效的手机号！！",
						icon: 'none',
						duration: 2000
					})
					return;
				}
				let productOrderPeopleList=this.productOrder.productOrderPeopleList;
				let adultNumber=this.productOrder.adultNumber;
				let childrenNumber=this.productOrder.childrenNumber;
				let total=adultNumber+childrenNumber;
				if(productOrderPeopleList.length!=total){
					uni.showToast({
						title: "选择出行人与成人儿童数量不符！！",
						icon: 'none',
						duration: 2000
					})
					return ;
				}
				let data=request.request('/app/tourism/productOrder/save',{
					method:"POST",
					data:this.productOrder	
				});
				data.then((v)=>{
					uni.switchTab({
						url: '/pages/order/orderList/orderList'
					});
				});
			},
			//设置成人数
			setAdultNumber:function(e){
				this.productOrder.adultNumber=e.value;
				this.setCalculationTotal();
			},
			//设置儿童数
			setChildrenNumber:function(e){
				this.productOrder.childrenNumber=e.value;
				this.setCalculationTotal();
			},
			//设置房差数
			setSingleRoomNumber:function(e){
				this.productOrder.singleRoomNumber=e.value;
				this.setCalculationTotal();
			},
			//计算总价
			setCalculationTotal:function(){
				let adultNumber=this.productOrder.adultNumber;
				let childrenNumber=this.productOrder.childrenNumber;
				let singleRoomNumber=this.productOrder.singleRoomNumber;
				let adultPrice=this.productInfo.adultPrice;
				let childrenPrice=this.productInfo.childrenPrice;
				let singleRoomPrice=this.productInfo.singleRoomPrice;
				let total=adultNumber*adultPrice+childrenNumber*childrenPrice+singleRoomNumber*singleRoomPrice;
				this.productOrder.orderTotal=total;
			},
			//选择出行人
			selectPeopleList:function(){
				this.getChannelMerchantsPeoplePageList();
				this.showPeopleList=true;
			},
			//查询出行人信息
			getChannelMerchantsPeoplePageList:function(){
				let list=this;
				let data=request.request('/app/base/channelMerchantsPeople/getPageList',{
					method:"GET",
					data:{
						channelId:this.openId,
						page:1,
						limit:100
					}
				});
				data.then((v)=>{
					if(v){
						list.peopleDataList=v.list;
						let peopleMap=new Map();
						let count=v.list.length;
						for(let i=0;i<count;i++){
							peopleMap.set(v.list[i].id,v.list[i]);
						}
						list.peopleMap=peopleMap;
					}
				});
			},
			backOrderSubmit:function(){
				this.showPeopleList=false;
			},
			//复选框选择
			checkboxChange:function(e){
				let peopleList=new Array();
				let values = e.detail.value;
				for(let i=0;i<values.length;i++){
					peopleList[i]=this.peopleMap.get(values[i]);
				}
				this.productOrder.productOrderPeopleList=peopleList;	
			},
			//出行时间
			bindDateChange: function(e) {
			    this.productOrder.setOutDate = e.target.value;
			},
		}
	}
</script>

<style>
	/* icon 也可以使用组件*/
	@import "../../../static/style/icon.css";	
	@import '../../../static/style/thorui.css';
	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100upx;
		/* box-sizing: border-box; */
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-operation-text {
		font-size: 22upx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100upx;
		/* box-sizing: border-box; */
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-btnbox-4 .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28upx !important;
	}

	.tui-operation .tui-badge-class {
		position: absolute;
		top: -6upx;
		/* #ifdef H5 */
		transform: translateX(50%)
		/* #endif  */
	}

	.tui-flex-1 {
		flex: 1;
	}

	/*底部操作栏*/
	
	
	
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
		font-size: 20rpx;
	}
	
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