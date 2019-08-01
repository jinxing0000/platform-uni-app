<template>
	<view>
		<view class="content">
			<sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter>
			<!-- <view class="text">
				<text>{{filterResult}}</text>
			</view> -->
		</view>
		<view class="uni-product-list">
		    <view class="uni-product" v-for="(product,index) in productList" :key="index" @click="goToProductInfo">
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
	import slFilter from '../../components/sl-filter/sl-filter.vue';
	export default {
		components: {
			slFilter
		},
		data() {
			return {
				themeColor: '#000000',
				titleColor: '#666666',
				filterResult: '',
				menuList: [{
						'title': '职位',
						'detailTitle': '请选择职位类型（可多选）',
						'isMutiple': true,
						'key': 'jobType',
						'defaultSelectedIndex': [1,2,5],
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': 'uni-app',
								'value': 'uni-app'
							},
							{
								'title': 'java开发',
								'value': 'java'
							},
							{
								'title': 'web开发',
								'value': 'web'
							},
							{
								'title': 'Android开发',
								'value': 'Android'
							},
							{
								'title': 'iOS开发',
								'value': 'iOS'
							},
							{
								'title': '测试工程师',
								'value': '测试'
							},
							{
								'title': 'UI设计',
								'value': 'UI'
							},
							{
								'title': 'Ruby开发',
								'value': 'Ruby'
							},
							{
								'title': 'C#开发',
								'value': 'C#'
							},
							{
								'title': 'PHP开发',
								'value': 'php'
							},
							{
								'title': 'Python开发',
								'value': 'Python'
							}
						]

					},
					{
						'title': '月薪',
						'key': 'salary',
						'isMutiple': true,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '0~2000',
								'value': '0~2000'
							},
							{
								'title': '2000~3000',
								'value': '2000~3000'
							},
							{
								'title': '3000~4000',
								'value': '3000~4000'
							},
							{
								'title': '4000~5000',
								'value': '4000~5000'
							},
							{
								'title': '5000~6000',
								'value': '5000~6000'
							},
							{
								'title': '6000~7000',
								'value': '6000~7000'
							},
							{
								'title': '7000~8000',
								'value': '7000~8000'
							},
							{
								'title': '8000~9000',
								'value': '8000~9000'
							},
							{
								'title': '9000~10000',
								'value': '9000~10000'
							},
							{
								'title': '10000以上',
								'value': '10000~1000000'
							}
						]

					},
					{
						'title': '单选',
						'key': 'single',
						'isMutiple': false,
						'detailTitle': '请选择（单选）',
						'reflexTitle': true,
						'defaultSelectedIndex': 2,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '条件1',
								'value': 'test_1'
							},
							{
								'title': '条件2',
								'value': 'test_2'
							},
							{
								'title': '条件3',
								'value': 'test_3'
							},
							{
								'title': '条件4',
								'value': 'test_4'
							},
							{
								'title': '条件5',
								'value': 'test_5'
							},
							{
								'title': '条件6',
								'value': 'test_6'
							},
							{
								'title': '条件7',
								'value': 'test_7'
							},
							{
								'title': '条件8',
								'value': 'test_8'
							},
						]
					},
					{
						'title': '排序',
						'key': 'sort',
						'isSort': true,
						'reflexTitle': true,
						'defaultSelectedIndex': 2,
						'detailList': [{
								'title': '默认排序',
								'value': ''
							},
							{
								'title': '发布时间',
								'value': 'add_time'
							},
							{
								'title': '薪资最高',
								'value': 'wages_up'
							},
							{
								'title': '离我最近',
								'value': 'location'
							}
						]
					}
				],
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
			result(val) {
				console.log('filter_result:' + JSON.stringify(val));
				this.filterResult = JSON.stringify(val, null, 2)
			},
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
			goToProductInfo(){
				debugger;
				alert('1111111111111111');
				// uni.navigateTo({
				// 	url: '/pages/product/productInfo/productInfo'
				// });
			}
		}
	}
</script>

<style>
	.text {
		margin-top: 50px;
		margin-left: 20px;
		width: 100%;
	}
	/*产品列表开始*/
	    page {
	        background: #F8F8F8;
	    }
	
	    view {
	        font-size: 28upx;
	    }
	
	    .uni-product-list {
	        display: flex;
	        width: 100%;
	        flex-wrap: wrap;
	        flex-direction: row;
			margin-top: 10px;
	    }
	
	    .uni-product {
	        padding: 20upx;
	        display: flex;
	        flex-direction: column;
	    }
	
	    .image-view {
	        height: 330upx;
	        width: 330upx;
	        margin: 12upx 0;
	    }
	
	    .uni-product-image {
	        height: 330upx;
	        width: 330upx;
	    }
	
	    .uni-product-title {
	        width: 300upx;
	        word-break: break-all;
	        display: -webkit-box;
	        overflow: hidden;
	        line-height: 1.5;
	        text-overflow: ellipsis;
	        -webkit-box-orient: vertical;
	        -webkit-line-clamp: 2;
	    }
	
	    .uni-product-price {
	        margin-top: 10upx;
	        font-size: 28upx;
	        line-height: 1.5;
	        position: relative;
	    }
	
	    .uni-product-price-original {
	        color: #e80080;
	    }
	
	    .uni-product-price-favour {
	        color: #888888;
	        text-decoration: line-through;
	        margin-left: 10upx;
	    }
	
	    .uni-product-tip {
	        position: absolute;
	        right: 10upx;
	        background-color: #ff3333;
	        color: #ffffff;
	        padding: 0 10upx;
	        border-radius: 5upx;
	    }
		/*产品列表结束*/
</style>