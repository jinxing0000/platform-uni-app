<template>
	<view class="container">
		<view>
			<tui-swipe-action :actions="actions"  @click="handlerButton" v-for="(item,index) in dataList"
			 :key="index" :params="item">
				<template v-slot:content>
					<view class="list-item">
						<image :src="'../../../static/pedestrians/'+item.img" class="item-img"></image>
						<view class="item-box">
							<view class="item-title">{{item.title}}</view>
							<view class="item-time">手机号：13333445566身份证号：142401199312134233</view>
						</view>
					</view>
				</template>
			</tui-swipe-action>
		</view>
		
	</view>
</template>

<script>
	const form = require("../../components/utils/formValidation.js")
	import tuiListCell from "../../components/list-cell/list-cell"
	import tuiSwipeAction from "../../components/swipe-action/swipe-action"
	export default {
		components:{
			tuiSwipeAction,
			tuiListCell
		},
		data() {
			return {
				dataList: [{
					id: 1,
					title: "张三",
					img: 'man.png'
				}, {
					id: 2,
					title: "李四",
					img: 'woman.png'
				}, {
					id: 3,
					title: "王五",
					img: 'woman.png'
				},
				],
			}
		},
		methods: {
			
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
