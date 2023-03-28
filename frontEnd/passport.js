if (!String.prototype.endsWith){
	String.prototype.endsWith = function(suffix) {
	    return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}
/**
 * 构造函数
 *@param option: {
 *					umtUrl:'http://passport.escience.cn', //umt的地址，必填
 *					viewPort:$("#testDiv"),						//显示message的地方，可不填
 *					message:'haha,runing...',					//提示信息的内容，可不填
 *					loginclass:'miaomiao'}						//提示信息加载后的，class，可不填
 * */
function Passport(option){
	this.umtUrl=option.umtUrl;
	this.option=option;
	/**
	 * 拼接向umt发请求的参数
	 * @param returnUrl 单点登录实现里面WebServerURL的值相同，回调地址
	 * @param params 是一个json对象，里面的参数有
	 * 							{
	 * 								
	 * 								target:'none',   //无作用
	 * 								appname:'dct', //应用名称
	 * 								theme:'ddl'	   //如果在umt里面有定制版，
	 * 							}
	 * */
	this._buildLoginUrl=function(returnUrl, params){
		var url;
		if (this.umtUrl.endsWith("/")){
			url = this.umtUrl+"login";
		}else{
			url = this.umtUrl+"/login";
		};
		url = url+"?WebServerURL="+escape(returnUrl);
		
		if (params){
			if (params.target){
				url=url+"&target="+params.target;
			}
			if (params.appname){
				url=url+"&appname="+params.appname;
			}
			if (params.theme){
				url=url+"&theme="+params.theme;
			}
		};
		return url;
	};
	/**
	 * 获取cookie的val值，不推荐外部调用
	 * @param offset 偏移值
	 * @return cookieVal
	 * */
	this._getCookieVal = function (offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	};
	/**
	 * 获取cookie值
	 * @param name cookie的key，会返回相应的value
	 * @return 如果未找到，则返回null
	 * */
	this._getCookie = function (name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return this._getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i === 0) {
				break;
			}
		}
		return null;
	};
	/***
	 * 触发checkAndLogin请求之后，刷页面之前，会在遗留页面显示提示信息，比如登陆中
	 * @return  none
	 * */
	this._showPrompt=function(){
		var div = document.createElement("div");
		var viewport = $(this.option.viewPort);
		var position  = viewport.offset();
		var left = viewport.width()+position.left-100;
		if (this.option.message){
			$(div).text(this.option.message);
		}else{
			$(div).text("登录中...");
		}
		if (this.option.loginclass){
			$(div).attr("class", this.option.loginclass);
		}else{
			$(div).css({"position":"absolute",
				"background-color":"#F7CA7F",
				"top":"0",
				"left":left+"px",
				"width":"100px",
				"height":"20px"});
		};
		$(document.body).append(div);
	};
	/**
	 * 去验证cookie信息，是否已登录
	 *@return cookie里面时候有已登录的值 
	 * */
	this.hasSsoLoginFlag=function(){
		 //先验证单点登录cookie是否有效
		var cookieVal=this._getCookie("UMTID");
		return cookieVal!=null&&cookieVal!=-1;
	}
	/**
	 * 只判断登陆，不刷新页面
	 * @param callback(flag) 回调函数，如果直接return 会有异步返回问题
	 * */
	this.checkLogin=function(callback){
		if(this.hasSsoLoginFlag()){
			/*if Pcookie's  ip is changed,the page is not jump to login page of umt, it wrong */
			//callback(true);
			//return;
		}
		 //再判断session里是否有用户
		$.getScript(this.umtUrl+"/js/isLogin.do", function(){
			callback(data.result);
		});
	};
	/**
	 * 如果已登录，就去umt掉一下login，回刷
	 * @param returnUrl 单点登录实现里面WebServerURL的值相同，登陆成功以后的回调地址
	 * @param params 是一个json对象，里面的参数有
	 * 							{
	 * 								target:'none',   //无作用
	 * 								appname:'dct', //应用名称
	 * 								theme:'ddl'	   //如果在umt里面有定制版，
	 * 							}
	 * */
	this.checkAndLogin=function(returnUrl, params){
		var self=this;
		self.checkLogin(function(flag){
			if(flag){
				if(self.option.viewPort!=null&&self.option.viewPort!=""){
					self._showPrompt();
				}
				window.location.href=self._buildLoginUrl(returnUrl,params);
				return;
			}
		});
	};
}