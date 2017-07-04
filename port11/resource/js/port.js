// JavaScript Document
// JavaScript Document
/*首页滚动新闻*/
$(function(){
	(function(){
		var curr = 0;
		//控制不同个数时的按钮情况
		var numbers = $(".photo_scroll img").length;
		var i = numbers - 1;
		for(i = 4; i >= numbers; i --)
		{			
			$(".trigger").eq(i).css("display","none");
		}
		$("#jsNav .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$("#photo_scroll img").eq(i).fadeIn("slow").siblings("img").hide();
				$(".wrapper_picNews").eq(i).fadeIn("slow").siblings(".wrapper_picNews").hide();
				$(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
				return false;
			});
		});
		
		var pg = function(flag){
			//flag:true表示前翻， false表示后翻
			if (flag) {
				if (curr == 0) {
					todo = 2;
				} else {
					todo = (curr - 1) % numbers;
				}
			} else {
				todo = (curr + 1) % numbers;
			}
			$("#jsNav .trigger").eq(todo).click();
		};
		
		//前翻
		$("#prev").click(function(){
			pg(true);
			return false;
		});
		
		//后翻
		$("#next").click(function(){
			pg(false);
			return false;
		});
		
		//自动翻
		var timer = setInterval(function(){
			todo = (curr + 1) % numbers;
			$("#jsNav .trigger").eq(todo).click();
		},4000);
		
		//鼠标悬停在触发器上时停止自动翻
		$("#jsNav a").hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % numbers;
					$("#jsNav .trigger").eq(todo).click();
				},4000);			
			}
		);
	})();
});


/**字符串截断***/
/*cutClassName 要截断的class
*length阶段后剩余长度
*/
function cutStrings(cutClassName,length){
var ua = $.browser;   
	if (ua.mozilla)
	{
		$(document).ready(function(){
		//限制字符个数
		$(cutClassName).each(function(){
		var maxwidth=length;
		if($.trim($(this).text()).length>maxwidth){
		$(this).text($(this).text().substring(0,maxwidth));
		$(this).html($(this).html()+'…');
		}
		});
		});
	}
}
//分页

var pagination = function(o){
	//存放分页的代码片段
	var pHtml = "";
	if( !!o && o.id == "pagination" )
	{
		var c = o.cPage;	
		var t = o.tPage;
		var tr = o.tRecord;
		var d = o.dNum
		var skin = "pBasic";
		if(!!o.skin){
				skin = o.skin;  
		}
		pHtml = "<span class='wraperRecord'>共"+ "<strong class='recordNum'>" +tr+"</strong>"+"条记录</span>";
		pHtml += "<span class='wraperPagesNum'>页数"+c+"/"+t + "</span>";
		pHtml += "<span class='wraperPages'>";
		
		//分页中页码的显示
		pHtml += pagerender(c, t, tr, d);
		if (c != t) pHtml += "<a href='javascript:;' class='nextPage'>下一页></a>" + "<a href='javascript:;' class='lastPage'>尾页</a>";
		if(skin != "")
			$("#wraper_pagination").addClass(skin);
		pHtml += "</span>";
		$("#wraper_pagination").html(pHtml);
	}
};

var pagerender = function(cPage, tPage, tRecord, dNum){
		var c = cPage;
		var t = tPage;
		var tr = tRecord;
		var d = dNum;
		var p = "";
		var m ; 							//中间项
		
		//页码不为1时，显示"第一页"
		if( c > 1){
			p += "<a href='javascript:;' class='firstPage'>首页</a>";
		}
		
		if( c != 1){
			p += "<a href='javascript:;' class='prePage'><上一页</a>";
		}
		
		//如果总条数小于显示的条数，显示所有的条目
		if(d >= t){
			p += paginationDisplay(1, t, c);			
		}
		//如果总数大于显示的条目，则开始分页
		else{
			//计算开始页码和显示的条目
			//根据分页设置中共显示的页码数量计算显示形式,根据当前页码计算出显示的页码
			//要把当前项居中显示，先计算dNum的中间项，一般来说，为了显示美观，dNum为奇数
			//计算中间项
			((d % 2) == 1 )? m = Math.floor(d/2) + 1 : m = Math.floor(d / 2);
			
			//根据当前页码和中间项的关系组织页码显示
			var condition1 = !!(c < m);					//当前页码小于中间项，显示时中间项对应的页码居中。
			var condition2 = !!(t - c  < m -1 );		//剩余项与中间项比较，如果剩余项小于中间项-1，则说明此页页码显示不显示后面部分
			
			//c < m ? paginationDisplay(1, t) : paginationDisplay(c - t/2, t);
			//如果当前页码小于中间项
			if(condition1) {
				p += paginationDisplay(1, d, c);
			}
			
			//如果当前页码大于等于中间项并且剩余项可以显示
			if(!condition1 && !condition2) {
				//显示差值，当中间项确定后，确定中间项前后显示的页码数量
				p += paginationDisplay(c - m + 1, d, c);
			}
			//如果当前页码后的页面小于中间项
			if(condition2){
				p += paginationDisplay(c - m + 1, t - c + m, c);
			}
		}
		return p;
};

//条目拼装函数
var paginationDisplay = function (beginNum, displayNum, currentNum) {
	var b = beginNum;
	var d = displayNum;
	var c = currentNum;
	var p = "";
	for( var i = 0, l = d, s = b; i < l; i++){
		p += "<a href='javascript:;' class='page' pNum='"+(s + i).toString()+"'>";
		if( s + i == c) p += "<strong>" + (s + i).toString() + "</strong>";
		else p  += (s + i).toString();
		p += "</a>";
	}
	return p;
};

/**字符串截断***/
/*cutClassName 要截断的class
*length阶段后剩余长度
*/
function cutStrings(cutClassName,length){
var ua = $.browser;   
	if (ua.mozilla)
	{
		$(document).ready(function(){
		//限制字符个数
		$(cutClassName).each(function(){
		var maxwidth=length;
		if($.trim($(this).text()).length>maxwidth){
		$(this).text($(this).text().substring(0,maxwidth));
		$(this).html($(this).html()+'…');
		}
		});
		});
	}
}
/**字符串截断 多行的情况***/
/*cutClassName 要截断的class
*length阶段后剩余长度
*/
function cutStringsAll(cutClassName,length){
		$(document).ready(function(){
		//限制字符个数
		$(cutClassName).each(function(){
		var maxwidth=length;
		if($.trim($(this).text()).length>maxwidth){
		$(this).text($(this).text().substring(0,maxwidth));
		$(this).html($(this).html()+'…');
		}
		});
		});
}

//selectFirstNav是选中的第一层导航栏的序号，从0开始算,套页面时要改

var navInit = function(n){
	var st;
	var selectFirstNav = n;
	//$(".link_firstNav").eq(selectFirstNav).css("color","#619dd6");
	/*导航条*/
	$(".ul_secondNav").each(function(){$(this).hide();});
	var firstLength = $(".li_firstNav").length;
	var i = 0;
	for(i = 0; i < firstLength; i ++)
	{
		(function(m){
			$(".link_firstNav").eq(m).bind('mouseover',function(){
				clearTimeout(st);
				$(".ul_secondNav").each(function(){$(this).hide(0);});
				//$(".link_firstNav").eq(m).css("color","#619dd6");
				if(m != 0)
				{
					$(".ul_secondNav").eq(m-1).each(function(){$(this).fadeIn(0);});//显示对应的二级列表
				}		
			});
			
						
			$(".link_firstNav").eq(m).bind('mouseout',function(){
				st = setTimeout(function(){
					$(".ul_secondNav").each(function(){$(this).hide(0);});
				}, 100);
				if(m!=selectFirstNav)
				{
					//$(".link_firstNav").eq(m).css("color","#4f4f4f");
				}
			});
			$(".ul_secondNav").bind('mouseover', function(){
					clearTimeout(st);
			});
			$(".ul_secondNav").eq(m).bind('mouseover', function(){
					clearTimeout(st);
					//$(".link_firstNav").eq(m+1).css("color","#619dd6");
			});
			$(".ul_secondNav").eq(m).find(".li_secondNav .link_secondNav").each(function(){
				$(this).bind('mouseover',function(){
					clearTimeout(st);
					$(".ul_secondNav").eq(m).each(function(){$(this).fadeIn(0);});
				});	
			});
			$(".ul_secondNav").eq(m).find(".li_secondNav").each(function(){
				$(this).bind('mouseover',function(){
					clearTimeout(st);
				});	
			});
			$(".ul_secondNav").eq(m).bind('mouseout',function(){
				st = setTimeout(function(){
					$(".ul_secondNav").eq(m).each(function(){$(this).hide(0);});
				}, 100);
				//$(".link_firstNav").eq(m+1).css("color","#619dd6");
				if(m+1!=selectFirstNav)
				{
					//$(".link_firstNav").eq(m+1).css("color","#4f4f4f");
				}
			});
		})(i);
	}	
}