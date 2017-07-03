function searchText() {
	var searchInput = $('.searchInput');
	searchInput.focus(function(){
		var oldText = searchInput.val();
		if(oldText == "输入关键字"){
			searchInput.val('');
		}
	});
	searchInput.blur(function(){
		var oldText = searchInput.val();
		if(oldText == ""){
			searchInput.val('输入关键字');
		}
	});
}
var index=0;//当前显示的第几张图，默认开始为0；
var mg=$(".slideSection img");//将焦点图储存为一个变量方便调用节省下载调用查询时间。
var len=mg.length;//焦点图图片数量
 
function play(n){
	mg.eq(n).fadeIn(100).siblings("img").fadeOut(0);
}
 
function indexSlide(){
	var prev = $('.prev');
	var next = $('.next');
	mg.mouseover(function(event){
		prev.fadeIn();
		next.fadeIn();
	});
	$(".contentWrapper").mouseover(function(event){
		prev.fadeOut();
		next.fadeOut();
	});
	$(".navWrapper").mouseover(function(event){
		prev.fadeOut();
		next.fadeOut();
	});
	prev.click(function(){
		play(index);
		index --;
		if(index == 0){
			index = len;
		}
	});
	next.click(function(){
		play(index);
		index ++;
		if(index==len){//当当前播放的索引值等于总图片数就重置为0，重新开始循环
			index=0;
		}
	});
}
function login(){
	$('.login').click(function(){
		$('.maskLayer').fadeIn();
		$('.loginWrapper').fadeIn();
	});
	$('.maskLayer').click(function(){
		$(this).fadeOut();
		$('.loginWrapper').fadeOut();
	});
	$('.closeBtn').click(function(){
		$('.maskLayer').fadeOut();
		$('.loginWrapper').fadeOut();
	});

}

/**
*首页页面数据获取与渲染
**/
function indexAjax(param){
	$.ajax({
	  url: param.dairyIndex,
	  data: {
	  },
	  success: function( data ) {
		var html = template('dairyTemplete', data);
		document.getElementById('dairyId').innerHTML = html;
	  }
	});
	$.ajax({
	  url: param.bookIndex,
	  data: {
	  },
	  success: function( data ) {
		var html = template('bookTemplete', data);
		document.getElementById('bookId').innerHTML = html;
	  }
	});
}
/**
*顶部微信二维码
**/
function twoCode(){
	$(".weixinLink").click(function(){
		$(".twoCode").fadeIn();
	});
	$(".weixinLink").mouseout(function(){
		$(".twoCode").fadeOut();
	});
}
/**
*日志以及路书页面数据获取
**/
function pageRefreshFunction(ajaxUrl, sendData){
		var tagesIndex = $(this).attr('index');
		var sendData = sendData;
		$.ajax({
		  url: ajaxUrl,
		  data: sendData,
		  success: function( data ) {
			var html = template('templete', data);
			document.getElementById('renderId').innerHTML = html;
		  }
		});
}
function dairyRefresh(param){
	pageRefreshFunction(param.dairyPage,{"tagesType":1});
	$('.tagsLink').click(function(){
		var tagesType = $(this).attr('index');
		var sendData = {};
		sendData.tagesType = tagesType;
		pageRefreshFunction(param.dairyPage, sendData);
		$('.tagsLink').removeClass("currentLink");
		$(this).addClass("currentLink");
	});
}
function bookRefresh(param){
	pageRefreshFunction(param.bookPage,{"tagesType":1});
	$('.bookTagsLink').click(function(){
		var tagesType = $(this).attr('index');
		var sendData = {};
		sendData.tagesType = tagesType;
		pageRefreshFunction(param.bookPage, sendData);
		$('.bookTagsLink').removeClass("bookCurrentLink");
		$(this).addClass("bookCurrentLink");
	});
}
function loginSwitch(){
 $("#J_emailLogin").click(function(){
	$('#login-container').animate({scrollTop:240},200,function(){$('#user_email').focus()});return false;
 });
 $("#J_socialLogin").click(function(){
	$('#login-container').animate({scrollTop:0}	,200);return false;
 });
 }
 function headClick(){
	$(".selfHeadLink").click(function(){
		$(".successClickUl").slideToggle();
		setTimeout(function(){
			$(".successClickUl").fadeOut();
		}, 2000)
	});
 }

/*首页调用*/
function indexFunctions(param){
	indexSlide();
	indexAjax(param);
}
loginSwitch();
login();
twoCode();
searchText();
 headClick();