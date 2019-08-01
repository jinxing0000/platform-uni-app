<style>
	@import "index.css";
</style>
<template>
    <view>
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
		<view>
			<view class="search">
				<template>
					<input maxlength="20" type="text" value="" confirm-type="search" @confirm="searchStart()" placeholder="请输入目的地/关键词搜索" />
				</template>
				<image src="../../static/zy-search/search.svg" mode="aspectFit" @click="searchStart()" class="search-icon"></image>
			</view>
		</view>
		<view class="uni-product-list">
		    <view class="uni-product" v-for="(product,index) in productList" :key="index" v-on:click="goToProductInfo()">
		        <view class="image-view">
		            <image v-if="renderImage" class="uni-product-image" :src="product.image"></image>
		        </view>
		        <view class="uni-product-title">{{product.title}}</view>
		        <view class="uni-product-price">
		            <!-- <text class="uni-product-price-favour">￥{{product.originalPrice}}</text> -->
		            <text class="uni-product-price-original">￥{{product.favourPrice}}起</text>
		            <text class="uni-product-tip">{{product.tip}}</text>
		        </view>
		    </view>
		</view>
    </view>
</template>

<script>
	export default {
		props:{
			isFocus:{	//是否自动获取焦点
				type:Boolean,
				value:false
			},
			isBlock:{	//选择块级显示还是圆形显示
				type:Boolean,
				value:true
			},
			showWant:{	//是否展示推荐菜单
				type:Boolean,
				value:false
			}
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
				title: 'product-list',
                productList: [],
                renderImage: false
			}
		},
		onLoad() {
			this.loadData();
            setTimeout(() => {
                this.renderImage = true;
            }, 300);
		},
		methods: {
			loadData(action = 'add') {
                const data = [{
                        image: 'https://img.alicdn.com/bao/uploaded/i1/TB15p6PbQL0gK0jSZFtgIlQCXXa_070746.jpg_400x400.jpg',
                        title: '泰国旅游 普吉岛蓝钻岛大长岛6天5晚网红跟团游 飞猪旅行含机票',
                        originalPrice: 9999,
                        favourPrice: 3000,
                        tip: '精品'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
                        title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
                        originalPrice: 3499,
                        favourPrice: 3399,
                        tip: '优惠'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
                        title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
                        originalPrice: 12999,
                        favourPrice: 10688,
                        tip: '秒杀'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg',
                        title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
                        originalPrice: 999,
                        favourPrice: 958,
                        tip: '秒杀'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg',
                        title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
                        originalPrice: 8888,
                        favourPrice: 8288,
                        tip: '优惠'
                    },
                    {
                        image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg',
                        title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
                        originalPrice: 2899,
                        favourPrice: 2799,
                        tip: '自营'
                    }
                ];

                if (action === 'refresh') {
                    this.productList = [];
                }

                data.forEach(item => {
                    this.productList.push(item);
                });
            },
			onPullDownRefresh() {
				this.loadData('refresh');
				// 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 2000);
			},
			onReachBottom() {
				this.loadData();
			},
			searchStart(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			goToProductInfo(){
				uni.navigateTo({
					url: '/pages/product/productInfo/productInfo'
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.search{
			width: 640upx;
			margin: 30upx auto 0;
			position: relative;
			input{
				background-color: #F7F7F7;
				padding: 10upx 74upx;
				font-size: 28upx;
				border-radius: 50upx;
			}
			.voice-icon{
				width: 36upx;
				height: 36upx;
				padding: 16upx 20upx 16upx 0;
				position: absolute;
				left: 16upx;
				top: 4upx;
				z-index: 10;
			}
			.search-icon{
				width: 36upx;
				height: 36upx;
				padding: 16upx 20upx 16upx 0;
				position: absolute;
				right: 0;
				top: 4upx;
				z-index: 10;
			}
		}
		.s-block{
			margin-top: 30upx;
			.header{
				font-size: 32upx;
				padding: 30upx;
				position: relative;
				image{
					width: 36upx;
					height: 36upx;
					padding: 10upx;
					position: absolute;
					right: 40upx;
					top: 24upx;
				}
			}
			.list{
				display: flex;
				flex-wrap: wrap;
				view{
					width: 50%;
					color: #8A8A8A;
					font-size: 28upx;
					box-sizing: border-box;
					text-align: center;
					padding: 20upx 0;
					border-top: 2upx solid #FFF;
	    			border-left: 2upx solid #FFF;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					background-color: #F7F7F7;
				}
			}
		}
		.s-circle{
			margin-top: 30upx;
			.header{
				font-size: 32upx;
				padding: 30upx;
				border-bottom: 2upx solid #F9F9F9;
				position: relative;
				image{
					width: 36upx;
					height: 36upx;
					padding: 10upx;
					position: absolute;
					right: 40upx;
					top: 24upx;
				}
			}
			.list{
				display: flex;
				flex-wrap: wrap;
				padding: 0 30upx 20upx;
				view{
					padding: 8upx 30upx;
					margin: 20upx 30upx 0 0;
					font-size: 28upx;
					color: #8A8A8A;
					background-color: #F7F7F7;
					box-sizing: border-box;
					text-align: center;
					border-radius: 20upx;
				}
			}
		}
		.wanted-block{
			margin-top: 30upx;
			.header{
				font-size: 32upx;
				padding: 30upx;
			}
			.list{
				display: flex;
				flex-wrap: wrap;
				view{
					width: 50%;
					color: #8A8A8A;
					font-size: 28upx;
					box-sizing: border-box;
					text-align: center;
					padding: 20upx 0;
					border-top: 2upx solid #FFF;
					border-left: 2upx solid #FFF;
					background-color: #F7F7F7;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.wanted-circle{
			margin-top: 30upx;
			.header{
				font-size: 32upx;
				padding: 30upx;
			}
			.list{
				display: flex;
				flex-wrap: wrap;
				padding: 0 30upx 20upx;
				view{
					padding: 8upx 30upx;
					margin: 20upx 30upx 0 0;
					font-size: 28upx;
					color: #8A8A8A;
					background-color: #F7F7F7;
					box-sizing: border-box;
					text-align: center;
					border-radius: 20upx;
				}
			}
		}
</style>
