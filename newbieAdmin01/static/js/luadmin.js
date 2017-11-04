
layui.define(['element'],function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  
  var element = layui.element, 
  	  $ = layui.jquery;

  var luadmin = {
    hello: function(str){
      alert('Hello '+ (str||'test'));
    },

    init:function() {

    	/**
		*  左侧菜单的显示和隐藏
		*/
		$('.lu-tab-switch').click(function() {

			if($(this).hasClass('open')) {
			  	$(".layui-side").animate({
				      'left': -200
			    }, 300);

			    $(".lu-body").animate({
			    	'left': 0
					}, 300);
					
					$(".lu-footer").animate({
						'left': 0
					},300);
			    $(this).attr('title','展开'); //设置自定义属性
			    $(this).removeClass('open');
			} else {
				$(".layui-side").animate({
				      'left': 0
			    }, 300);

			    $(".lu-body").animate({
			    	'left': 200
					}, 300);
					
					$(".lu-footer").animate({
						'left': 200
					},300);
			    $(this).attr('title','关闭');
			    $(this).addClass('open');
			}
		})

		//监听Tab切换
		element.on('nav(leftNav)', function(elem){
		  	
		  	//获取icon
		  	var icon = $(elem).find('a').find('i').attr('class');
				//获取title
				var title = $(elem).find('a').find('span').text();
				//获取id
				var id    = $(elem).find('a').attr('data-id');
				//获取url
				var url   = $(elem).find('a').attr('data-url');
				
				if(title == '首页') {
					element.tabChange('main-tab', 0);
					return;
				}
				if (url == undefined) return;
				//判断当前选择的内容在右侧是否存在
				var tabDiv = $('.lu-main').children('.lu-tab-title');
				var tabExist = tabDiv.find('li[lay-id='+id+']');
	
				if(tabExist.length > 0) {
					element.tabChange('main-tab',id);
					$('#'+id).attr('src',url);
				} else {
					element.tabAdd('main-tab',{
						title:'<i class= "'+ icon+'" aria-hidden="true"></i>' + ' <span>'+title+'</span>',
						content: '<iframe id="' + id + '" src="' + url + '" class="lu-tab-iframe"></iframe>',
						id:id
					});
					element.tabChange('main-tab', id);
				}
		});

    }

  };
 
  //输出test接口
  exports('luadmin', luadmin);
});    