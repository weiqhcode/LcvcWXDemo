<template>
	<view>
        <u-popup :show="popoutShow" mode="bottom" :round="10">
            <view class="f__login">
                <view class="logo">
                    <image class="img" src="/static/logo.png"></image>
                </view>
                <view class="title">欢迎登录~</view>
				<view class="titlebody">行走的思政课</view>
                <view class="loginButton">
					<button class="button marginT" @click="onAuthorization" :style="{background:PrimaryColor}">微信授权登录</button>
					<!-- #ifdef MP-WEIXIN -->
					<navigator target="miniProgram" open-type="exit">
						<button class="button" style="background:#fff;margin-top:24rpx;" :style="{border:'2rpx solid '+PrimaryColor,color:PrimaryColor}">
						    暂不使用
						</button>
					</navigator>
					<!-- #endif -->
				</view>
            </view>
        </u-popup>
	</view>
</template>
<script>
export default {
    name: 'f-login',
	data() {
		return {
            PrimaryColor: '#1fba1a', //主题色
			popoutShow: true,
			jsCode: "",
			nickName: ""
		};
	},
	methods: {
        //个人信息授权登录
        onAuthorization(e) {
			// #ifdef MP-WEIXIN
			var that = this
				uni.showLoading({
					title: '正在登录...'
				});
				wx.login({
				        success: (res) => { 
				            if (res.code) { 
				                that.jsCode=res.code
								 console.log(res.code)
				                uni.request({
				                    url: 'https://wxapi.weiqh.net/api/wx/decrypt',
				                    method:'POST',  
				                    data: {
				                        code: res.code 
				                    },
				                    success: (cts) => {
										uni.setStorageSync('openid', cts.data.code.openid)
										uni.setStorageSync('session_key', cts.data.code.session_key)
				                    }
				                });
				            } else {
				                console.log('登录失败！' + res.errMsg)  
				            }
				        }
				})
				uni.hideLoading();
				uni.showLoading({
					title: '正在获取用户信息...'
				});
				wx.getUserProfile({
					  desc: '获取用户信息，初始化',
					  success: res => {
					   console.log(res);
					   uni.setStorageSync('nickName', res.userInfo.nickName)
					   uni.setStorageSync('src', res.userInfo.avatarUrl)
					   that.nickName = res.userInfo.nickName;
					   
					   uni.request({
					   	url: 'https://wxapi.weiqh.net/api/wx/login?nickName=' + res.userInfo.nickName +"&src="+res.userInfo.avatarUrl,
					   	method:'GET',
					   	success: (res) => {
					   		console.log(res.data)
							console.log(res.data.data.sumBu)
							uni.setStorageSync('sumBu', res.data.data.sumBu)
							uni.setStorageSync('code', res.data.code)
							uni.setStorageSync('inClass', res.data.data.inClass)
							uni.setStorageSync('specialized', res.data.data.specialized)
					   	}
					   })
					  }
				})
				uni.hideLoading();
				    wx.getSetting({
				      success(res){
				        // console.log(res)
				        if(!res.authSetting['scope.werun']){
				// 如果用户还未授权过，需要用户授权读取微信运动数据
				          wx.authorize({
				            scope: 'scope.werun',
				            success() {
				              //读取微信步数数据
				              // that.getWeRunData()
							  console.log("====--------------------------==")
							  that.getRun()
							  that.closeLogin()
				            },
				            fail() {
				              //如果用户拒绝授权，提示用户需要同意授权才能获取他的微信运动数据
				              wx.showModal({
				                title: '读取微信运动数据失败',
				                content: '请在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中允许我们访问微信运动数据',
				              })
				            }
				          })
				
				        }else{
				           //如果用户已授权过，直接开始同步微信运动数据
				          //读取微信步数数据
				          // that.getWeRunData()
						   console.log("------------------------------")
						   that.getRun()
						   that.closeLogin()
				        }
				      }
				    })
				
			// #endif
			// #ifdef H5
				this.closeLogin()
			// #endif
        },
		getRun(){
			wx.getWeRunData({
			  success (res) {
			    // 拿 encryptedData 到开发者后台解密开放数据
			    // const encryptedData = res.encryptedData
			    // 或拿 cloudID 通过云调用直接获取开放数据
			    // const cloudID = res.cloudID
				console.log(res)
			  }
			})
		},
		closeLogin(){
            console.log('closeLogin')
            this.popoutShow = false;
			wx.showTabBar()
		},
	}
};
</script>

<style lang="scss" scoped>
.f__login {
    padding: 48rpx 32rpx;
    border-radius: 18rpx 18rpx 0 0;
    z-index: 99;
    position: relative;
    .loginLoading {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, .95);
        z-index: 999;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .logo {
        width: 60%;
        height: 120rpx;
        border-radius: 18rpx;
        overflow: hidden;
        .img {
            width: 100%;
            height: 90rpx;
        }
    }
    .title {
		font-family:"Times New Roman",Times,serif;
        font-size: 40rpx;
        font-weight: bold;
        margin-top: 24rpx;
    }
    .text {
        font-size: 24rpx;
        color: #666;
        margin-top: 16rpx;
    }
    .loginButton {
        margin-top: 56rpx;
        .button {
            color: #fff;
            width: 100%;
            height: 92rpx;
        }
        .marginT{
            margin-top: 24rpx;
        }
    }
    .tips {
        margin-top: 24rpx;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .left {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
        }
        .goBuy {
            font-size: 24rpx;
            /* margin-left: 16rpx; */
            background: none;
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            justify-content: flex-start;
            padding: 0;
            margin: 0;
            color: #1fba1a;
        }
    }
}
.loginPhone{
    .form-row {
        position: relative;
        border-bottom: 1rpx solid #e8e8e8;
        line-height: 1;
        margin-top: 24rpx;
        .input{
            font-size: 34rpx;
            line-height: 102rpx;
            height: 94rpx;
            width: 100%;
            box-sizing: border-box;
            font-size: 30rpx;
            padding: 0;
            font-weight: bold;
        }
        .getvcode {
            font-size: 26rpx;
            height: 80rpx;
            color: #333;
            line-height: 80rpx;
            background: #eee;
            min-width: 188rpx;
            text-align: center;
            border-radius: 8rpx;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            z-index: 11;
            &.forhidden {
                background: #eee;
                color: #cccccc;
            }
        }
    }
    .submit{
        margin-top: 60rpx;
        color: #fff;
        width: 100%;
        border: none;
    }
	.nav{
		-webkit-tap-highlight-color: transparent;
		    background-color: #f8f8f8;
		    border-radius: 5px;
		    box-sizing: border-box;
		    cursor: pointer;
		    display: block;
		    font-size: 18px;
		    line-height: 2.55555556;
		    margin-left: auto;
		    margin-right: auto;
		    overflow: hidden;
		    padding-left: 14px;
		    padding-right: 14px;
		    position: relative;
		    text-align: center;
		    text-decoration: none;
	}
}
.titlebody{
	font-family:"Times New Roman",Times,serif;
	font-size: 50rpx;
	font-weight: bold;
	margin-top: 24rpx;
	color: #2967ff;
}
</style>
