// JavaScript Document
var d = document, //用d代替document
	isStrict = d.compatMode == "CSS1Compat",  // 判断是否以标准模式兼容如果是"CSS1Compat"，是标准模式，如果为BackCompat是怪异模式
	dd = d.documentElement,  //兼容模式下
	db = d.body,  //非兼容模式 ie
	m = Math.max,
	ie = !!d.all,
	ua = navigator.userAgent.toLowerCase();
	var wh = {h : 0, w : 0};
	var add = function(w, h){return 0};
	var popVar = {};
	
	popVar.parentNode = "";
	popVar.childNode = "";
	
	/*预定义几个弹出层——恋爱通告*/
	//lookover查看某人给我的通告
	var conLookOver = '<div class="lookover"><ul class="lookover_content"><li><div class="lookover_content_Open"></div>于 2010年2月25日 神秘人物赠送</li><li><div class="lookover_content_secretClose"></div>于 2010年2月25日 神秘人物赠送</li><li><div class="lookover_content_publicClose"></div>于 2010年2月25日 神秘人物赠送</li>';
	conLookOver += '<li><div class="lookover_content_publicClose"></div>于 2010年2月25日 吴宗宗赠送</li><li><div class="lookover_content_Open"></div>于 2010年2月25日 吴宗宗赠送</li><li><div class="lookover_content_publicClose"></div>于 2010年2月25 日吴宗宗赠送</li></ul>';
	conLookOver += '<a href="javacript:;"><div class="lookover_left"></div></a><div class="lookover_page">1/15</div><a href="javacript:;"><div class="lookover_right"></div></a></div>';  

	
	var getWH=function()
	{
		return {h:(isStrict?dd:db).clientHeight,w:(isStrict?dd:db).clientWidth}
	};
	//获取滚动条位置（卷起的宽高）
	var getS=function()
	{
		return{t:m(dd.scrollTop,db.scrollTop),l:m(dd.scrollLeft,db.scrollLeft)}
	};
	//输入一个a，返回屏幕内的位置
	var getP = function(a)
	{
		var r={t:0,l:0},
		isGecko=/gecko/.test(ua),  //是否为火狐浏览器
		add = function(t,l){r.l+=l,r.t+=t},	//改变t、l
		p = a,//p：a标签的本地化
		sTL = getS();  //sTL存储滚动条环境
		
		if(a && a != db)
		{
			if(a.getBoundingClientRect)	//获取元素在屏幕内的位置
			{
				var b=a.getBoundingClientRect();   //盒模型本地化
				if(b.top==b.bottom)
				{
					var g=a.style.display;
					a.style.display="block";
					b.top=b.top-a.offsetHeight;
					a.style.display=g
				}
				add(b.top+sTL.t-dd.clientTop,b.left+sTL.l-dd.clientLeft) //找到a标签本身的偏移和滚动条的偏移减去可视区域的偏移，即是该标签在屏幕上应有的位置
			}
			else
			{
				var c=d.defaultView;
				while(p)
				{add(p.offsetTop,p.offsetLeft);
				var e=c.getComputedStyle(p,null);
				if(isGecko)
				{
					var f=parseInt(e.getPropertyValue("border-left-width"),10)||0,
					bt=parseInt(e.getPropertyValue("border-top-width"),10)||0;
					add(bt,f);
					if(p!=a&&e.getPropertyValue("overflow")!="visible")
					{add(bt,f)}
				}
				p=p.offsetParent}p=a.parentNode;
				while(p&&p!=db)
				{add(-p.scrollTop,-p.scrollLeft);p=p.parentNode}
			}
		}
		return r;
	};
	
	//创建一个div，插入到指定的位置, t是元素类型， a是插入点， o是属性
	var creElm=function(o,t,a)
	{
		var b=d.createElement(t||"div");
		for(var p in o)
		{
			p == "style" ? (b[p].cssText=o[p]) : (b[p]=o[p])
		}
		return(a||db).insertBefore(b,(a||db).firstChild);
	};
	
	var con = "<img src=../images/ask.png />";
	
	var pop = function(s)//s可以是节点或者字符串
		{
			popContent(s);
			ltpop.style.display=cover.style.display="none";
			var a=getS();
			ltpop.style.display="block";
			ltpop.style.margin=(-ltpop.offsetHeight/2+a.t)+"px "+(-ltpop.offsetWidth/2+a.l)+"px";
			//var closeB = document.getElementById('close');
			//closeB.onclick = centerClose;
			createCover();
			return false
		},
		
		popContent = function ( contentS ) { //接收elem或者字符串
			var content = contentS;
			if(content && typeof(content) == "string") ltpop.innerHTML = content;
			else if(content && typeof(content) == "object") 
			{
				var contentClone = content.cloneNode(true);
				if(contentClone.style.display) contentClone.style.display == "block";
				ltpop.appendChild(contentClone) ;
			}
		},
		createCover = function(){
			wh = getWH();
			s = getS();
			cover.style.width=wh.w + "px";
			cover.style.height = wh.h + "px";
			cover.style.display = "block";
			cover.style.top = s.t + "px";
			cover.style.left = s.l + "px";
			cover.onclick = centerClose;
		},
		choose = function(o)
		{
			clearTimeout(inputTimer);
			inputTimer=setTimeout 
			(
				function()
				{
					var s=o.value.replace(/^\s+|\s+$/,""),
					frag=d.createDocumentFragment();
					for(var p in texts)
					{
						eval("var f = /"+(s||".")+"/ig.test(p)");
						!!texts[p].cloneNode&&(f&&frag.appendChild(texts[p].cloneNode(true)))
					}
					list.innerHTML="";
					list.appendChild(frag);
				},100);
		},
		
		centerClose = function(){
			$(cover).hide('normal');
			$(ltpop).hide('fast');	
			$(ltpop).html("");
		};
		
		
		
		(function(){
			cover=creElm({id:"cover",style:"position:absolute;z-index:100;display:none;top:0;left:0; background:#333; filter:alpha(opacity = 80); -moz-opacity:0.8; opacity:0.8;"});
			ltpop=creElm({id:"pop",style:"position:absolute;z-index:1000000000;display:none;top:30%;left:50%;overflow:auto;"});
		})();
		
		/*当屏幕的尺寸变化的时候重新定义遮罩层的大小*/
		window.onresize = function() 
		{
				if(cover.style.display == "block") createCover();
		}
		