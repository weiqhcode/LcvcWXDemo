<template>
	<view >
		<view class="main">
			<!-- <image src="https://weiqh.net/img/Monument.jpg"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scanURL: "",
				nickName: "",
				code: "",
				data: {},
			}
		},
		onTabItemTap() {
			// #ifdef MP-WEIXIN
			uni.showLoading({
				title: '正在处理...'
			});
			this.nickName = uni.getStorageSync('nickName')
			this.scan()
			uni.hideLoading()
			// #endif
		},
		methods: {
			scan(){
				var _this = this;
				this.nickName = uni.getStorageSync('nickName')
				uni.scanCode({
					success: function (res) {
						_this.scanURL = res.result;
						console.log(res.result.substring(8,17))
						if(res.result=="开始"){
							uni.request({
								url: 'https://wxapi.weiqh.net/api/wx/start?nickName='+_this.nickName,
								method:'GET',
								success: (res) => {
									console.log(res)
									_this.code = res.data.code;
									if(_this.code==1||_this.code=="1"){
										uni.switchTab({
											url: '/pages/index/index'
										})
										uni.showModal({
											content: '欢迎上课！',
											confirmText: '确定'
										});
									}else{
										uni.switchTab({
											url: '/pages/index/index'
										})
										uni.showModal({
											content: '重复扫码，请扫其他二维码',
											confirmText: '确定'
										});
									}
								}
							})
						}else if(res.result=="结束"){
							uni.redirectTo({
								url: '/pages/finish/index'
							})
						}else if(res.result.substring(8,17)=="weiqh.net"){
							let param = res.result.split("/")[4].split(".")[0]
							uni.request({
								url: 'https://wxapi.weiqh.net/api/wx/addBu?nickName='+_this.nickName+'&number='+param,
								method:'GET',
								success: (res) => {
									console.log("扫码")
									console.log(res.data)
									_this.code = res.data.code
									if(_this.code==0||_this.code=="0"){
										uni.switchTab({
											url: '/pages/index/index'
										})
										uni.showModal({
											content: '重复扫码，请选择其他课程',
											confirmText: '确定'
										});
									}else if(_this.code==4||_this.code=="4"){
										uni.switchTab({
											url: '/pages/index/index'
										})
										uni.showModal({
											content: '请扫开始码以开始',
											confirmText: '确定'
										});
									}else{
										_this.toPage(param)
									}
								}
							})
							
						}else{
							uni.switchTab({
								url: '/pages/index/index'
							})
							uni.showModal({
								content: '请扫描正确二维码',
								confirmText: '确定'
							});
						}
						
						// if(res.result.substring(8,17)=="weiqh.net"){
						// 	let param = res.result.split("/")[4].split(".")[0]
						// 	console.log(param)
							
						// 	_this.toPage()
						// }else{
						// 	uni.switchTab({
						// 		url: '/pages/index/index'
						// 	})
						// 	uni.showModal({
						// 		content: '请扫描正确二维码',
						// 		confirmText: '确定'
						// 	});
						// }
						
						
					},
					fail: (e) => {
						uni.switchTab({
							url: '/pages/index/index'
						})
						uni.showModal({
							content: '请扫描正确二维码',
							confirmText: '确定'
						});
					},
					complete: function (){
						
					}
				})
			},
			toPage(param){
				this.data.data = this.scanURL;
				this.data.type = param;
				let item = encodeURIComponent(JSON.stringify(this.data));
				uni.redirectTo({
					url: '/pages/scan/result/index?data=' + item
				})
			}
		}
	}
</script>

<style>
	page{
		background-image: url("https://weiqh.net/img/Monument.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-color: #CCCCCC;
	}
</style>
