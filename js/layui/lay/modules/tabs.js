/**
  扩展一个test模块
**/      
 
layui.define('jquery',function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  
	var $ = layui.jquery;

	var tabs = function(){
		console.log('模块示例')
	}

	//输出test接口
	exports('tabs',new tabs);
}); 