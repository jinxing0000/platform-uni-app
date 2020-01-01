<style>
	@import "index.css";
	@import '../../static/style/thorui.css';
</style>
<template>
    <view class="container">
		
		<!--header-->
		<view class="tui-header-box">
			<view class="tui-header">
				<view class="tui-searchbox tui-search-mr" :style="{marginTop:inputTop+'px'}" @tap="searchStart">
					<!-- #ifdef APP-PLUS || MP -->
					<icon type="search" :size='13' color='#999'></icon>
					<!-- #endif -->
					<text class="tui-search-text" v-if="!searchKey">搜索Thorui商品</text>
					<view class="tui-search-key" v-if="searchKey">
						<view class="tui-key-text">{{searchKey}}</view>
						<tui-icon name="shut" :size='12' color='#fff'></tui-icon>
					</view>
				</view>
			</view>
		</view>
		<!--header-->
		
		
        <view class="uni-padding-wrap">
            <view class="page-section swiper">
                <view class="page-section-spacing">
                    <swiper class="u-wrp-bnr" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
                        <swiper-item v-for="(item,index) in bannerList">
							<image :src="item" class='u-img-slide'></image>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
		
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @click="goToProductList('2')">
				<image src="../../static/index/gnl.png"></image>
				<text>国内游</text>
			</view>
			<view class="cate-item" @click="goToProductList('4')">
				<image src="../../static/index/jwl.png"></image>
				<text>境外游</text>
			</view>
			<view class="cate-item" @click="goToProductList('1')">
				<image src="../../static/index/yry.png"></image>
				<text>一日游</text>
			</view>
			<view class="cate-item" @click="goToProductList('3')">
				<image src="../../static/index/fty.png"></image>
				<text>赴台游</text>
			</view>
		</view>
		
		<!--list-->
		<view class="container">
			
			<view class="tui-group-name">
				<text>精品路线</text>
			</view>
			
			<view class="product-list">
				<!--商品列表-->
				<view class="pro-item" @tap="goToProductInfo(item.id)" v-for="(item,index) in productListPage.list" :key="index">
					<image :src="item.productGuidePicUrl" class="pro-img" mode="widthFix" />
					<view class="pro-content">
						<view class="pro-tit">{{item.productName}}</view>
						<view>
							<view class="pro-price">
								<text class="sale-price">￥{{item.adultPrice}}起</text>
								<view class="tui-tag-small tui-danger tui-tag-fillet">精品</view>
							</view>
							<!-- <view class="pro-pay">{{item.payNum}}人付款</view> -->
						</view>
					</view>
				</view>
				<!--商品列表-->
			</view>
			<!--加载loadding-->
			<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
			<tui-nomore :visible="!pullUpOn"></tui-nomore>
			<!--加载loadding-->
		</view>
		<!--list-->
    </view>
</template>

<script>
	import tuiLoadmore from "../components/loadmore/loadmore"
	import tuiNomore from "../components/nomore/nomore"
	const request = require("../../../common/request.js")
	export default {
		components: {
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				bannerList: [
					'../../static/index/banner1.jpg',
					'../../static/index/banner2.jpg',
					'../../static/index/banner3.jpg',
					'../../static/index/banner4.jpg',
				],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				productListPage:{
					list:[],
					currPage:1,
					totalPage:1
				},
				loadding: false,
				pullUpOn: true
			}
		},
		//第一次加载
		onShow:function() {
			this.getProductList();
		},
		methods: {
			//获取产品数据
			getProductList:function(){
				let data=request.request('/app/tourism/productInfo/getPageList',{
					method:"GET",
					data:{
						page:this.productListPage.currPage,
						limit:10
					}
				});
				data.then((v)=>{
					if(v.currPage===1){
						this.productListPage.list=v.list;
					}else{
						this.productListPage.list=this.productListPage.list.concat(v.list);
					}
					this.productListPage.totalPage=v.totalPage;
					this.productListPage.currPage=v.currPage;
				});
			},
			searchStart(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			goToProductInfo(id){
				uni.navigateTo({
					url: '/pages/product/productInfo/productInfo?id='+id
				});
			},
			goToProductList(lineType){
				uni.removeStorageSync('lineType');
				uni.setStorageSync('lineType', lineType);
				uni.switchTab({
					url: '/pages/product/productList/productList'
				});
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			//延时为了看效果
			// setTimeout(() => {
			// 	this.productList = this.loadData;
			// 	this.pageIndex = 1;
			// 	this.pullUpOn = true;
			// 	this.loadding = false;
			// 	uni.stopPullDownRefresh();
			// 	this.tui.toast("刷新成功")
			// }, 200)
		},
		
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.productListPage.currPage == this.productListPage.totalPage) {
				this.loadding = false;
				this.pullUpOn = false;
			} else {
				this.getProductList();
				this.productListPage.currPage = this.productListPage.currPage + 1;
				this.loadding = false;
			}
		}
	}
</script>
<style lang="less" scoped>
		/* 分类 */
		.cate-section {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-wrap:wrap;
			padding: 12upx 22upx; 
			background: #fff;
			.cate-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				// font-size: $font-sm + 2upx;
				// color: $font-color-dark;
			}
			/* 原图标颜色太深,不想改图了,所以加了透明度 */
			image {
				width: 100upx;
				height: 100upx;
				margin-bottom: 14upx;
				border-radius: 50%;
				opacity: .8;
				//box-shadow: 4upx 4upx 20upx #1296db;
			}
		}
		/* 搜索框 */
		.tui-header-box {
			width: 100%;
			background: #fff;
			position: fixed;
			z-index: 99998;
			left: 0;
			top: 0;
		}
		
		.tui-header {
			display: flex;
			align-items: flex-start;
			width: 97%;
			// height: 38px;
			padding-top: 5px;
			padding-left: 10px;
			padding-right: 10px;
			padding-bottom: 5px;
		}
		
		.tui-back {
			margin-left: 8upx;
			height: 32px !important;
			width: 32px !important;
		}
		
		.tui-searchbox {
			width: 100%;
			height: 30px;
			margin-right: 30upx;
			border-radius: 15px;
			font-size: 12px;
			background: #f7f7f7;
			padding: 3px 10px;
			box-sizing: border-box;
			color: #999;
			display: flex;
			align-items: center;
			overflow: hidden;
		}
		
		/* #ifdef MP-WEIXIN */
		.tui-search-mr {
			margin-right: 20upx !important;
		}
		
		/* #endif */
		/* #ifdef MP-BAIDU */
		.tui-search-mr {
			margin-right: 20upx !important;
		}
		
		/* #endif */
		
		.tui-search-text {
			padding-left: 16upx;
		}
		
		.tui-search-key {
			max-width: 80%;
			height: 100%;
			padding: 0 16upx;
			margin-left: 12upx;
			display: flex;
			align-items: center;
			border-radius: 15px;
			background: rgba(0, 0, 0, 0.5);
			color: #fff;
		}
		
		.tui-key-text {
			box-sizing: border-box;
			padding-right: 12upx;
			font-size: 12px;
			line-height: 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		/* 产品列表 */
		.container {
			padding-bottom: env(safe-area-inset-bottom);
		}
		
		.product-list {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 30upx 30upx 0 30upx;
			background: #fff;
		}
		
		.pro-item {
			background: #fff;
			box-sizing: border-box;
			width: 49%;
			position: relative;
			margin-bottom: 2%;
		}
		
		.pro-item::after {
			content: '';
			position: absolute;
			height: 200%;
			width: 200%;
			border: 1upx solid #eaeef1;
			transform-origin: 0 0;
			-webkit-transform-origin: 0 0;
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			left: 0;
			top: 0;
		}
		
		.pro-img {
			width: 100%;
			display: block;
		}
		
		.pro-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20upx;
			height: 180upx;
		}
		
		.pro-tit {
			/* font-size:  */
			color: #2e2e2e;
			font-size: 26upx;
			word-break: break-all;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		
		.pro-price {
			padding-top: 18upx;
		}
		
		.sale-price {
			font-size: 34upx;
			font-weight: 500;
			color: #ea1500;
		}
		
		.factory-price {
			font-size: 24upx;
			color: #a0a0a0;
			text-decoration: line-through;
			padding-left: 12upx;
		}
		
		.pro-pay {
			padding-top: 10upx;
			font-size: 24upx;
			color: #656565;
		}
		
		.tui-group-name {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding: 24rpx 0;
			color: #ea1500;
		}
		.tui-tag-fillet{
			margin-right: 3px;
			float: right;
		}
</style>
