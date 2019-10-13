<template>
    <view class="container">
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
					<view class="tui-title">出发日期：{{productInfo.startDate}}出发{{productInfo.endDate}}返回</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title tui-flex-1">成人</view>
					<view class="tui-title tui-flex-1" style="color: red;">￥{{productInfo.adultPrice}}元/人</view>
					<tui-numberbox :min="1" :max="10" :value="value2" ></tui-numberbox>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title tui-flex-1">儿童</view>
					<view class="tui-title tui-flex-1" style="color: red;">￥{{productInfo.childrenPrice}}元/人</view>
					<tui-numberbox :min="1" :max="10" :value="value2" ></tui-numberbox>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title tui-flex-1">单房差</view>
					<view class="tui-title tui-flex-1" style="color: red;">￥{{productInfo.singleRoomPrice}}元/间</view>
					<tui-numberbox :min="1" :max="10" :value="value2" ></tui-numberbox>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">出行人：</view>
					<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入出行人" maxlength="50" type="text" />
					<button class="tui-btn tui-btn-small tui-primary" hover-class="tui-primary-hover" @click="selectPedestriansList">选择</button>
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
					<view class="tui-title">联系电话：</view>
					<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入联系电话" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">联系邮箱：</view>
					<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入联系邮箱" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false">
				<view class="tui-line-cell">
					<view class="tui-title">买家留言：</view>
					<input placeholder-class="phcolor" class="tui-input" name="age" placeholder="请输入买家留言" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
		</form>
		<!--底部操作栏-->
		<view class="tui-operation">
			<view class="tui-operation-left tui-col-5">
				<view class="tui-operation-item">
					<view class="tui-operation-text tui-scale-small" style="font-size: 20px;color: red;">应付款:￥2599元</view>
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
		
	    <!--下拉选择框 dropdownlist-->
	    <view class="tui-drop-input-box">
	    	<tui-dropdown-list :show="dropdownShow" :top="94" :height="400">
                   111111111111111111111111111111
	    	</tui-dropdown-list>
	    </view>
	    <!--下拉选择框-->
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
				dropdownShow: false,
				productInfo:{
					
				}
			}
		},
		onLoad: function(options) {
			let id = options.id;
			this.getProductInfo(id);
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
				});
			},
			goOrderSubmitPage:function(){
				uni.navigateTo({
					url: '/pages/order/orderSubmit/orderSubmit'
				});
			},
			selectPedestriansList:function(){
				debugger;
				this.dropdownShow = !this.dropdownShow
			}
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
</style>