<template>
	<view class="container">
		<!--header-->
		<view class="tui-header-box" >
			<view class="tui-header">
				<view class="tui-searchbox tui-search-mr" :style="{marginTop:inputTop+'px'}" @tap="searchStart()">
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
		<!--screen-->
		<view class="tui-header-screen">
			<view class="tui-screen-top">
				<view class="tui-top-item tui-icon-ml" :class="[tabIndex==0?'tui-active tui-bold':'']" data-index="0" @tap="screen">
					<view>{{selectedName}}</view>
					<tui-icon :name="selectH>0?'arrowup':'arrowdown'" :size="14" :color="tabIndex==0?'#e41f19':'#444'" tui-icon-class="tui-ml"></tui-icon>
				</view>
				<view class="tui-top-item" :class="[tabIndex==1?'tui-active tui-bold':'']" @tap="screen" data-index="1">销量</view>
				<view class="tui-top-item" @tap="screen" data-index="2">
					<tui-icon :name="isList?'manage':'listview'" :size="isList?22:18" :bold="isList?false:true" color="#333"></tui-icon>
				</view>
				<view class="tui-top-item tui-icon-ml" @tap="screen" data-index="3">
					<text>筛选</text>
					<tui-icon name="screen" :size="12" color="#333" tui-icon-class="tui-ml" :bold="true"></tui-icon>
				</view>

				<!--下拉选择列表--综合-->
				<view class="tui-dropdownlist" :class="[selectH>0?'tui-dropdownlist-show':'']" :style="{height:px(selectH)}">
					<view class="tui-dropdownlist-item tui-icon-middle" :class="[item.selected?'tui-bold':'']" v-for="(item,index) in dropdownList"
					 :key="index" @tap.stop="dropdownItem" :data-index="index">
						<text class="tui-ml tui-middle">{{item.name}}</text>
						<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected" tui-icon-class="tui-middle"></tui-icon>
					</view>

				</view>
				<view class="tui-dropdownlist-mask" :class="[selectH>0?'tui-mask-show':'']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->

			</view>
			<view class="tui-screen-bottom">
				<block v-for="(item,index) in attrArr" :key="index">
					<view class="tui-bottom-item tui-icon-ml" :class="[item.isActive?'tui-btmItem-active':'',attrIndex==index?'tui-btmItem-tap':'']"
					 :data-index="index" @tap="btnDropChange">
						<view class="tui-bottom-text" :class="[attrIndex==index?'tui-active':'']">{{item.isActive?item.selectedName:item.name}}</view>
						<tui-icon :name="attrIndex==index?'arrowup':'arrowdown'" :size="14" :color="attrIndex==index || item.isActive?'#e41f19':'#444'"
						 tui-icon-class="tui-ml" v-if="item.list.length>0"></tui-icon>
					</view>
				</block>
			</view>
		</view>
		<!--screen-->

		<!--list-->
		<view class="container">
			<view class="product-list" :style="{marginTop:px(dropScreenH+18)}">
				<!--商品列表-->
				<view class="pro-item" @tap="goToProductInfo(item.id)" v-for="(item,index) in productListPage.list" :key="index">
					<image :src="item.productGuidePicUrl" class="pro-img" mode="widthFix" />
					<view class="pro-content">
						<view class="pro-tit">{{item.productName}}</view>
						<view>
							<view class="pro-price">
								<text class="sale-price">￥{{item.adultPrice}}</text>
								<view class="tui-tag-small tui-danger tui-tag-fillet">精品</view>
							</view>
							<!-- <view class="pro-pay">{{item.payNum}}人付款</view> -->
						</view>
					</view>
				</view>
				<!--商品列表-->
			</view>
          </view>
		<!--list-->

		<!--顶部下拉筛选弹层 属性-->
		<tui-top-dropdown bgcolor="#f7f7f7" :show="dropScreenShow" :paddingbtm="110" :translatey="dropScreenH" @close="btnCloseDrop">
			<scroll-view class="tui-scroll-box" scroll-y :scroll-top="scrollTop">
				<view class="tui-seizeaseat-20"></view>
				<view class="tui-drop-item tui-icon-middle" :class="[item.selected?'tui-bold':'']" v-for="(item,index) in attrData"
				 :key="index" @tap.stop="btnSelected(item.name)" :data-index="index">
					<tui-icon name="check" :size="16" color="#e41f19" :bold="true" v-if="item.selected" tui-icon-class="tui-middle"></tui-icon>
					<text class="tui-ml tui-middle">{{item.name}}</text>
				</view>
				<view class="tui-seizeaseat-30"></view>
			</scroll-view>
			<view class="tui-drop-btnbox">
				<view class="tui-drop-btn tui-btn-white" hover-class="tui-white-hover" :hover-stay-time="150" @tap="reset">重置</view>
				<view class="tui-drop-btn tui-btn-red" hover-class="tui-red-hover" :hover-stay-time="150" @tap="btnSure">确定</view>
			</view>
		</tui-top-dropdown>
		<!---顶部下拉筛选弹层 属性-->


		<!--左抽屉弹层 筛选 -->
		<tui-drawer mode="right" :visible="drawer" @close="closeDrawer">
			<view class="tui-drawer-box" :style="{paddingTop:height+'px'}">
				<scroll-view class="tui-drawer-scroll" scroll-y :style="{height:drawerH+'px'}">
					<view class="tui-drawer-title">
						<text class="tui-title-bold">价格区间</text>
						<!-- <view class="tui-attr-right">
							<tui-icon name="position-fill" color="#e41f19" :size="14" class="tui-location"></tui-icon>
							<text>北京朝阳区三环到四环之间</text>
						</view> -->
					</view>
					<view class="tui-drawer-content">
						<input placeholder-class="tui-phcolor" class="tui-input" placeholder="最低价" maxlength="11" type='number' v-model="queryParams.startAdultPrice"/>
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<input placeholder-class="tui-phcolor" class="tui-input" placeholder="最高价" maxlength="11" type='number' v-model="queryParams.endAdultPrice"/>
					</view>

					<view class="tui-drawer-title">
						<text class="tui-title-bold">路线分类</text>
						<view class="tui-all-box tui-icon-ml">
							<view class="tui-attr-right">全部</view>
							<tui-icon name="arrowdown" :size="14" color="#444" tui-icon-class="tui-ml"></tui-icon>
						</view>
					</view>
					<view class="tui-drawer-content tui-flex-attr">
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.lineType === '1'}" @click="setLineType('1')">
							<view class="tui-attr-ellipsis" >国内游</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.lineType === '2'}" @click="setLineType('2')">
							<view class="tui-attr-ellipsis">境外游</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.lineType === '3'}" @click="setLineType('3')">
							<view class="tui-attr-ellipsis">一日游</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.lineType === '4'}" @click="setLineType('4')">
							<view class="tui-attr-ellipsis">赴台游</view>
						</view>
						<!-- <view class="tui-attr-item">
							<view class="tui-attr-ellipsis">文化</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">服饰配件</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">流行男鞋</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">艺术</view>
						</view> -->
					</view>

					<!-- <view class="tui-drawer-title">
						<text class="tui-title-bold">品牌</text>
						<view class="tui-all-box tui-icon-ml">
							<view class="tui-attr-right tui-active ">花花公子，七匹狼（SEPTWOLVES）</view>
							<tui-icon name="arrowdown" :size="14" color="#444" tui-icon-class="tui-ml"></tui-icon>
						</view>
					</view>
					<view class="tui-drawer-content tui-flex-attr">
						<view class="tui-attr-item tui-btmItem-active">
							<view class="tui-attr-ellipsis">花花公子</view>
						</view>
						<view class="tui-attr-item tui-btmItem-active">
							<view class="tui-attr-ellipsis">七匹狼（SEPTWOLVES）</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">吉普</view>
						</view>
					</view> -->

					<view class="tui-drawer-title">
						<text class="tui-title-bold">出发城市</text>
						<view class="tui-all-box tui-icon-ml">
							<view class="tui-attr-right">全部</view>
							<tui-icon name="arrowup" :size="14" color="#444" tui-icon-class="tui-ml"></tui-icon>
						</view>
					</view>
					<view class="tui-drawer-content tui-flex-attr">
						<view class="tui-attr-item " :class="{'tui-btmItem-active':queryParams.startingCity == '太原市'}" @click="setStartingCity('太原市')">
							<view class="tui-attr-ellipsis ">太原市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '大同市'}" @click="setStartingCity('大同市')">
							<view class="tui-attr-ellipsis">大同市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '朔州市'}" @click="setStartingCity('朔州市')">
							<view class="tui-attr-ellipsis">朔州市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '忻州市'}" @click="setStartingCity('忻州市')">
							<view class="tui-attr-ellipsis">忻州市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '阳泉市'}" @click="setStartingCity('阳泉市')">
							<view class="tui-attr-ellipsis">阳泉市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '吕梁市'}" @click="setStartingCity('吕梁市')">
							<view class="tui-attr-ellipsis">吕梁市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '晋中市'}" @click="setStartingCity('晋中市')">
							<view class="tui-attr-ellipsis">晋中市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '长治市'}" @click="setStartingCity('长治市')">
							<view class="tui-attr-ellipsis">长治市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '晋城市'}" @click="setStartingCity('晋城市')">
							<view class="tui-attr-ellipsis">晋城市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '临汾市'}" @click="setStartingCity('临汾市')">
							<view class="tui-attr-ellipsis">临汾市</view>
						</view>
						<view class="tui-attr-item" :class="{'tui-btmItem-active':queryParams.startingCity === '运城市'}" @click="setStartingCity('运城市')">
							<view class="tui-attr-ellipsis">运城市</view>
						</view>
						<!-- <view class="tui-attr-item">
							<view class="tui-attr-ellipsis">38</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">39</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">40</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">41</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">42</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">43</view>
						</view>
						<view class="tui-attr-item">
							<view class="tui-attr-ellipsis">44</view>
						</view> -->
					</view>
					<view class="tui-safearea-bottom"></view>
				</scroll-view>
				<view class="tui-attr-btnbox">
					<view class="tui-attr-safearea">
						<view class="tui-drawer-btn tui-drawerbtn-black" hover-class="tui-white-hover" :hover-stay-time="150" @tap="reset">重置</view>
						<view class="tui-drawer-btn tui-drawerbtn-primary" hover-class="tui-red-hover" :hover-stay-time="150" @tap="queryList">确定</view>
					</view>
				</view>
			</view>
		</tui-drawer>
		<!--左抽屉弹层 筛选-->

		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import tuiIcon from "../../components/icon/icon.vue"
	import tuiDrawer from "../../components/drawer/drawer"
	import tuiLoadmore from "../../components/loadmore/loadmore"
	import tuiNomore from "../../components/nomore/nomore"
	import tuiTopDropdown from "../../components/top-dropdown/top-dropdown"
	const request = require("../../../../common/request.js")
	export default {
		components: {
			tuiIcon,
			tuiDrawer,
			tuiLoadmore,
			tuiNomore,
			tuiTopDropdown
		},
		data() {
			return {
				searchKey: "", //搜索关键词
				width: 375, //header宽度
				height: 40, //header高度
				inputTop: 0, //搜索框距离顶部距离
				arrowTop: 0, //箭头距离顶部距离
				dropScreenH: 0, //下拉筛选框距顶部距离
				attrData: [],
				attrIndex: -1,
				dropScreenShow: false,
				scrollTop: 0,
				tabIndex: 0, //顶部筛选索引
				isList: false, //是否以列表展示  | 列表或大图
				drawer: false,
				drawerH: 0, //抽屉内部scrollview高度
				selectedName: "综合",
				selectH: 0,
				dropdownList: [
				{
					name: "价格升序",
					selected: false,
				}, {
					name: "价格降序",
					selected: false,
				}],
				attrArr: [{
					name: "精品",
					selectedName: "精品",
					isActive: false,
					list: []
				}, {
					name: "路线类型",
					selectedName: "路线类型",
					isActive: false,
					list: [{
						name: "国内游",
						selected: false,
						value:'2'
					}, {
						name: "境外游",
						selected: false,
						value:'4'
					}, {
						name: "一日游",
						selected: false,
						value:'1'
					}, {
						name: "赴台游",
						selected: false,
						value:'3'
					},
					]
				}, {
					name: "出发城市",
					selectedName: "出发城市",
					isActive: false,
					list: [{
						name: "太原市",
						selected: false,
						value:'太原市'
					}, {
						name: "大同市",
						selected: false,
						value:'大同市'
					}, {
						name: "朔州市",
						selected: false,
						value:'朔州市'
					}, {
						name: "忻州市",
						selected: false,
						value:'忻州市'
					}, {
						name: "阳泉市",
						selected: false,
						value:'忻州市'
					}, {
						name: "吕梁市",
						selected: false,
						value:'吕梁市'
					}, {
						name: "晋中市",
						selected: false,
						value:'晋中市'
					}, {
						name: "长治市",
						selected: false,
						value:'长治市'
					}, {
						name: "晋城市",
						selected: false,
						value:'晋城市'
					}, {
						name: "临汾市",
						selected: false,
						value:'临汾市'
					}, {
						name: "运城市",
						selected: false,
						value:'运城市'
					},
					]
				}],
				pageIndex: 1,
				productListPage: {
					list:[],
					currPage:1,
					totalPage:1
				},
				queryParams:{
					limit:10,
					page:1,
					startingCity:'',
				},
				loadding: false,
				pullUpOn: true
			}
		},
		onLoad: function(options) {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-BAIDU
			obj = swan.getMenuButtonBoundingClientRect();
			// #endif
			// #ifdef MP-ALIPAY
			my.hideAddToDesktopMenu();
			// #endif
			uni.getSystemInfo({
				success: (res) => {
					this.width = obj.left || res.windowWidth;
					this.height = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
					this.inputTop = obj.top ? (obj.top + (obj.height - 30) / 2) : (res.statusBarHeight + 7);
					this.arrowTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
					this.searchKey = options.searchKey || "";
					//略小，避免误差带来的影响
					this.dropScreenH = this.height * 750 / res.windowWidth + 186;
					this.drawerH = res.windowHeight - uni.upx2px(100) - this.height
				}
			})
		},
		onShow: function(options) {
			this.queryParams={limit:10,page:1,startingCity:'',lineType:''};
			let lineType = uni.getStorageSync('lineType');
			uni.removeStorageSync('lineType');
			this.queryParams.lineType=lineType;
			this.getProductList();
		},
		methods: {
			//获取产品数据
			getProductList:function(){
				let data=request.request('/app/tourism/productInfo/getPageList',{
					method:"GET",
					data:this.queryParams
				});
				data.then((v)=>{
					if(v.currPage===1){
						this.productListPage.list=v.list;
					}else{
						this.productListPage.list=this.productListPage.list.concat(v.list);
					}
					//this.productListPage.list=this.productListPage.list.concat(v.list);
					this.productListPage.totalPage=v.totalPage;
					this.productListPage.currPage=v.currPage;
					this.queryParams.page=v.currPage;
					this.loadding = false;
				});
			},
			//设置出发城市
			setStartingCity:function(name){
				this.queryParams.startingCity=name;
				let cityList=this.attrArr[1];
			},
			//设置产品路线
			setLineType:function(value){
				this.queryParams.lineType=value;
			},
			px(num) {
				return uni.upx2px(num) + "px"
			},
			//展开路线
			btnDropChange: function(e) {
				let index = e.currentTarget.dataset.index;
				let arr = JSON.parse(JSON.stringify(this.attrArr[index].list));
				if (arr.length === 0) {
					this.$set(this.attrArr[index], "isActive", !this.attrArr[index].isActive)
				} else {
					this.attrData = arr;
					this.attrIndex = index;
					this.dropScreenShow = true;
					if(index===1){
						for(let i=0;i<this.attrData.length;i++){
							if(this.queryParams.lineType===this.attrData[i].value){
								this.$set(this.attrData[i], "selected", true);
							}else{
								this.$set(this.attrData[i], "selected", false);
							}
						}
					}else if(index===2){ 
						for(let i=0;i<this.attrData.length;i++){
							if(this.queryParams.startingCity===this.attrData[i].name){
								this.$set(this.attrData[i], "selected", true);
							}else{
								this.$set(this.attrData[i], "selected", false);
							}
						}
					}
					this.$set(this.attrArr[index], "isActive", false);
					this.scrollTop = 1;
					this.$nextTick(() => {
						this.scrollTop = 0
					});
				}
			},
			//选择下拉内容
			btnSelected: function(e) {
				//let index = e.currentTarget.dataset.index;
				for(let i=0;i<this.attrData.length;i++){
					if(this.attrData[i].name===e){
						this.$set(this.attrData[i], "selected", true);
						let value=this.attrData[i].value;
						if(this.attrData.length===11){
							this.queryParams.startingCity=value;
						}
						else{
						   this.queryParams.lineType=value;
						}
					}else{
						this.$set(this.attrData[i], "selected", false)
					}
				}
				// this.$set(this.attrData[index], "selected", !this.attrData[index].selected)
			},
			reset() {
				// let arr = this.attrData;
				// for (let item of arr) {
				// 	item.selected = false;
				// }
				// this.attrData = arr
				this.queryParams.startAdultPrice='';
				this.queryParams.endAdultPrice='';
				this.queryParams.startingCity='';
				this.queryParams.lineType='';
				this.getProductList();
				this.drawer = false
				// 	}
				this.btnCloseDrop();
			},
			queryList:function(){
			    this.getProductList();
				this.drawer = false
			},
			btnCloseDrop() {
				this.scrollTop = 1;
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				this.dropScreenShow = false;
				this.attrIndex = -1
			},
			btnSure: function() {
				let index = this.attrIndex;
				let arr = this.attrData;
				let active = false;
				let attrName = "";
				this.getProductList();
				// //这里只是为了展示选中效果,并非实际场景
				// for (let item of arr) {
				// 	if (item.selected) {
				// 		active = true;
				// 		attrName += attrName ? ";" + item.name : item.name
				// 	}
				// }
				// let obj = this.attrArr[index];
				this.btnCloseDrop();
				// this.$set(obj, "isActive", active);
				// this.$set(obj, "selectedName", attrName);
			},
			showDropdownList: function() {
				this.selectH = 246;
				this.tabIndex = 0;
			},
			hideDropdownList: function() {
				this.selectH = 0
			},
			dropdownItem: function(e) {
				let index = e.currentTarget.dataset.index;
				let arr = this.dropdownList;
				for (let i = 0; i < arr.length; i++) {
					if (i === index) {
						arr[i].selected = true;
					} else {
						arr[i].selected = false;
					}
				}
				this.dropdownList = arr;
				this.selectedName = index == 0 ? '综合' : '价格';
				this.selectH = 0
			},
			screen: function(e) {
				let index = e.currentTarget.dataset.index;
				if (index == 0) {
					this.showDropdownList();
				} else if (index == 1) {
					this.tabIndex = 1
				} else if (index == 2) {
					this.isList = !this.isList
				} else if (index == 3) {
					this.drawer = true
				}
			},
			closeDrawer: function() {
				debugger;
				console.log(this.queryParams);
				this.drawer = false
			},
			back: function() {
				if (this.drawer) {
					this.closeDrawer()
				} else {
					uni.navigateBack()
				}
			},
			search: function() {
				uni.navigateTo({
					url: '../news-search/news-search'
				})
			},
			searchStart: function(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			goToProductInfo: function(id){
				uni.navigateTo({
					url: '/pages/product/productInfo/productInfo?id='+id
				});
			},
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			// let loadData = JSON.parse(JSON.stringify(this.productList));
			// loadData = loadData.splice(0, 10);
			// this.productList = loadData;
			// this.pageIndex = 1;
			// this.pullUpOn = true;
			// this.loadding = false;
			// uni.stopPullDownRefresh()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.productListPage.currPage ==this.productListPage.totalPage) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				this.queryParams.page=this.queryParams.page+1;
				this.getProductList();
			}
		}
	}
</script>

<style>
	@import '../../../static/style/thorui.css';
	page {
		background: #f7f7f7;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 隐藏scroll-view滚动条*/

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tui-header-box {
		width: 100%;
		background: #fff;
		position: fixed;
		z-index: 99998;
		left: 0;
		top: 0px;
	}

	.tui-header {
		display: flex;
		align-items: flex-start;
		width: 97%;
		height: 70px;
		padding-left: 10px;
		padding-right: 10px;
		top:0px;
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

	/*screen*/

	.tui-header-screen {
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		z-index: 1000;
		top:70px;
	}

	.tui-screen-top,
	.tui-screen-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
		color: #333;
	}

	.tui-screen-top {
		height: 88upx;
		position: relative;
		background: #fff;
	}

	.tui-top-item {
		height: 28upx;
		line-height: 28upx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-topitem-active {
		color: #e41f19;
	}

	.tui-screen-bottom {
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 24upx;
		align-items: center;
		overflow: hidden;
	}

	.tui-bottom-text {
		line-height: 24upx;
		max-width: 82%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-bottom-item {
		flex: 1;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12upx;
		box-sizing: border-box;
		background: #f7f7f7;
		margin-right: 20upx;
		white-space: nowrap;
		height: 60upx;
		border-radius: 40upx;
	}

	.tui-bottom-item:last-child {
		margin-right: 0;
	}

	.tui-btmItem-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-btmItem-active::after {
		content: "";
		position: absolute;
		border: 1upx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40upx;
		left: 0;
		top: 0;
	}

	.tui-btmItem-tap {
		position: relative;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.tui-btmItem-tap::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 22upx;
		background: #f7f7f7;
		left: 0;
		top: 58upx;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-active {
		color: #e41f19;
	}

	.tui-icon-ml .tui-icon-class {
		margin-left: 6upx;
	}

	.tui-ml {
		margin-left: 6upx;
	}

	.tui-seizeaseat-20 {
		height: 20upx;
	}

	.tui-seizeaseat-30 {
		height: 30upx;
	}

	.tui-icon-middle .tui-icon-class {
		vertical-align: middle;
	}

	.tui-middle {
		vertical-align: middle;
	}

	/*screen*/

	/*顶部下拉选择 属性*/

	.tui-scroll-box {
		width: 100%;
		height: 480upx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		color: #fff;
		font-size: 30upx;
		word-break: break-all;
	}

	.tui-drop-item {
		color: #333;
		height: 80upx;
		font-size: 28upx;
		padding: 20upx 40upx 20upx 40upx;
		box-sizing: border-box;
		display: inline-block;
		width: 50%;
	}

	.tui-drop-btnbox {
		width: 100%;
		height: 100upx;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		display: flex;
	}

	.tui-drop-btn {
		width: 50%;
		font-size: 32upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border: 0;
	}

	.tui-btn-red {
		background: #e41f19;
		color: #fff;
	}

	.tui-red-hover {
		background: #c51a15 !important;
		color: #e5e5e5;
	}

	.tui-btn-white {
		background: #fff;
		color: #333;
	}

	.tui-white-hover {
		background: #e5e5e5;
		color: #2e2e2e;
	}

	/*顶部下拉选择 属性*/

	/*顶部下拉选择 综合*/

	.tui-dropdownlist {
		width: 100%;
		position: absolute;
		background: #fff;
		border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 10upx;
		padding-bottom: 26upx;
		left: 0;
		top: 88upx;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
		z-index: 999;
	}

	.tui-dropdownlist-show {
		visibility: visible;
	}

	.tui-dropdownlist-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: -1;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-dropdownlist-item {
		color: #333;
		height: 70upx;
		font-size: 28upx;
		padding: 0 40upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/*顶部下拉选择 综合*/

	.tui-drawer-box {
		width: 686upx;
		font-size: 24upx;
		overflow: hidden;
		position: relative;
		padding-bottom: 100upx;
	}

	.tui-drawer-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		box-sizing: border-box;
		height: 80upx;
	}

	.tui-title-bold {
		font-size: 26upx;
		font-weight: bold;
		flex-shrink: 0;
	}

	.tui-location {
		margin-right: 6upx;
	}

	.tui-attr-right {
		width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}

	.tui-all-box {
		width: 90%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.tui-drawer-content {
		padding: 16upx 30upx 30upx 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tui-input {
		border: 0;
		height: 64upx;
		border-radius: 32upx;
		width: 45%;
		background: #f7f7f7;
		text-align: center;
		font-size: 24upx;
		color: #333;
	}

	.tui-phcolor {
		text-align: center;
		color: #b2b2b2;
		font-size: 24upx;
	}

	.tui-flex-attr {
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tui-attr-item {
		width: 30%;
		height: 64upx;
		background: #f7f7f7;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 4upx;
		box-sizing: border-box;
		border-radius: 32upx;
		margin-right: 5%;
		margin-bottom: 5%;
	}

	.tui-attr-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 96%;
		text-align: center;
	}

	.tui-attr-item:nth-of-type(3n) {
		margin-right: 0%;
	}

	.tui-attr-btnbox {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 0 30upx;
		background: #fff;
	}

	.tui-attr-safearea {
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-attr-btnbox::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-drawer-btn {
		width: 47%;
		text-align: center;
		height: 60upx;
		border-radius: 30upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.tui-drawerbtn-black {
		border: 1upx solid #555;
	}

	.tui-drawerbtn-primary {
		background: #e41f19;
		color: #fff;
	}

	/* 商品列表*/

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

	/* 商品列表*/
	
	.tui-tag-fillet{
		margin-right: 3px;
		float: right;
	}
</style>