(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"3eeb":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return a}));var u=function(){var e=this,t=e.$createElement;e._self._c},c=[]},"3f57":function(e,t,n){"use strict";n.r(t);var a=n("8468"),u=n.n(a);for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);t["default"]=u.a},8468:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){n.e("components/module/f-login/f-login").then(function(){return resolve(n("594e"))}.bind(null,n)).catch(n.oe)},u={components:{fLogin:a},data:function(){return{timeShow:"",tanchaung:!1,userdetail:{},data:[]}},onLoad:function(){this.dateDefault(),this.show()},created:function(){this.getTop()},methods:{dateDefault:function(){var e=(new Date).getFullYear(),t=(new Date).getMonth()+1,n=(new Date).getDate(),a=(new Date).getHours(),u=(new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes();(new Date).getSeconds(),(new Date).getSeconds();this.timeShow=e+"-"+t+"-"+n+" "+a+":"+u},show:function(){var t=this;wx.checkSession({success:function(){wx.getWeRunData({success:function(e){console.log(e)}})},fail:function(){wx.hideTabBar(),t.tanchaung=!0}}),null!=e.getStorageSync("nickName")&&""!=e.getStorageSync("nickName")||(wx.hideTabBar(),t.tanchaung=!0)},getTop:function(){var t=this;e.request({url:"https://wxapi.weiqh.net/api/wx/alltop",method:"GET",success:function(e){for(var n=0;n<=2;n++)t.data.push(e.data.data[n]);console.log(e.data.data)}})}}};t.default=u}).call(this,n("543d")["default"])},c37e:function(e,t,n){"use strict";n.r(t);var a=n("3eeb"),u=n("3f57");for(var c in u)"default"!==c&&function(e){n.d(t,e,(function(){return u[e]}))}(c);n("d7ba");var o,i=n("f0c5"),r=Object(i["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=r.exports},cc42:function(e,t,n){},d7ba:function(e,t,n){"use strict";var a=n("cc42"),u=n.n(a);u.a},e0d4:function(e,t,n){"use strict";(function(e){n("1c65");a(n("66fd"));var t=a(n("c37e"));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])}},[["e0d4","common/runtime","common/vendor"]]]);