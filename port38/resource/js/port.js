/*
*name:未选中的样式名称
*classSelect：选中的样式名称
*注意：在css文件中name 要在classSelect前面
*/
function changeRadio(name,classSelect,inputName){
	var length = $(name).length;
	
	//初始化
	var classF = name;
	var classS = classSelect;
	classF = classF.replace(/./,"");
	classS = classS.replace(/./,"");
	$(name).eq(0).addClass(classS);
	var i = 0;
	for(i = 0; i < length; i ++)
	{
		(function(j){
			$(name).eq(j).bind('click',function(){
				var k = 0;
				for(k = 0; k < length; k ++)
				{
					$(name).eq(k).removeClass(classS);
					$(name).eq(k).addClass(classF);
				}
				$(name).eq(j).addClass(classS);
				//赋值
				$(inputName).val(j);
			});
		}
		)(i);
	}
};

/*首页图片新闻*/
$(function(){
	(function(){
		var curr = 0;
		//控制不同个数时的按钮情况
		var numbers = $(".js img").length;
		var i = numbers - 1;
		for(i = 4; i >= numbers; i --)
		{
			$(".trigger").eq(i).hide();
		}
		$("#jsNav .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$("#js img").eq(i).fadeIn("slow").siblings("img").hide();
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
				},1500);			
			}
		);
	})();
});