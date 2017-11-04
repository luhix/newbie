layui.define(['element'],function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

var element = layui.element,
    $ = layui.jquery;


var menu = {

    // 主体菜单 [请求地址,过滤ID,是否展开,携带参数]
    menuList:function(address,obj,treeStatus,data) {
        //请求数据
        $.get(address,data,function(res){

            var content = '';
            //异步请求获取菜单数据
            if(res.data) {
                console.log(res.data);
                $(res.data).each(function(k,v){
                    /* console.log(v.icon);
                    console.log(treeStatus); */
                    v.child && treeStatus ? content += '<li class="layui-nav-item layui-nav-itemed">' : content += '<li class="layui-nav-item">' ;
                    if(v.child) {
                        content += '<a class="" href="javascript:;"><i class="layui-icon">' + v.icon + '</i>' + v.title + '</a><dl class="layui-nav-child">';
                        $(v.child).each(function(ko,vo){
                            content += '<dd>';
                            // console.log(vo.target);
                            if(vo.target) {
                                content += '<a href="'+ vo.url+ '" target="_blank">';
                            } else {
                                content += '<a href="javascript:" data-url= "' + vo.url + '" data-id="' + vo.id +'">'; 
                            }
                            content += '<i class="layui-icon">' + vo.icon + '</i><span>' + vo.title + '</span></a></dd>';
                        });
                        content += '</dl>';
                    }
                });

                // console.log($('.lu-nav-tree'));
                $('.lu-nav-tree').html(content);
                //动态添加之后必须更新渲染
                element.init();
            }


        })
    }

}
  //输出test接口
  exports('menu', menu);
});    