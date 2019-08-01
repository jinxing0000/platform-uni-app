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
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [
					'../../../static/index/banner1.jpg',
					'../../../static/index/banner2.jpg',
					'../../../static/index/banner3.jpg',
					'../../../static/index/banner4.jpg',
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
		methods: {
			
		}
	}
</script>

<style>
/*首页banner图片轮播开始*/
.u-wrp-bnr {
  width: 95%;
  height: 400rpx;
  display: block;
  position: relative;
  background: #FFFFFF;
  top:10rpx;
  left:20rpx;
  right: 20rpx; 
  bottom: 30rpx;
}
.u-img-slide {
  width: 100%;
  height: inherit;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  border-radius:15px;
}
/*首页banner图片轮播结束*/
</style>
