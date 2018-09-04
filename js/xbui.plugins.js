/*==============================================
 *http://www.xiaobing360.com
 * jQuery交互组件 Version 1.0 
 * Copyright 2016-2017 xb, Inc. Author WANGHAO 
 * Licensed under the MIT license
 */
if (typeof (jQuery) === 'undefined') {
    throw new Error('需要添加jQuery!')
}
/**
 * XBUI导航交互组件
 * Author：wanghao
 * 2017-03-06
 * role="navigation" 
 * data-cell=".nav-item" 
 * data-toggle="movingLine" 
 * data-direction="h" 
 * data-trigger="mouseover" 
 * data-target=".submenu-wrap" 
 * data-scroll="true"
 */
+ (function($) {

    "use strict";
    //构造函数
    function Navigation(element, options) {
        // this.settings = $.extend(true,$.fn.KEFUTU.defaults, options||{});
        //获取参数
        var me = this;
        me.obj = element; //导航对象
        me.data_cell = me.obj.data('cell'); //触发对象
        me.data_toggle = me.obj.data('toggle'); //触发效果
        me.data_trigger = me.obj.data('trigger'); //触发事件
        me.data_target = me.obj.data('target'); //触发目标
        me.data_direction = me.obj.data('direction'); //线条移动方向
        me.data_scroll = me.obj.data('scroll'); //导航菜单是否滑动
        me.init();

        return element;
    };

    //定义初始化函数 在此可以知道你需要增加的特效
    Navigation.prototype.init = function() {
        var me = this;

        // 初始化参数
        if (me.data_toggle == '' || me.data_toggle == undefined) me.data_toggle = 'slideDown';
        if (me.data_trigger == '' || me.data_trigger == undefined) me.data_trigger = 'mouseover';
        if (me.data_direction == '' || me.data_direction == undefined) me.data_direction = 'h';
        if (me.data_cell == '' || me.data_cell == undefined) me.data_cell = '.list-item';
       
        me.obj.find(me.data_cell).hover(function() {
            $(this).addClass('on');
        },
        function() {
            $(this).removeClass('on');
        })
        //文字滑动
        me.sliding();
        //判断是否有子集
        me.checkSubMenu()
        //渲染不同的特效
        switch (me.data_toggle) {

        case 'slideDown':
          me.obj.find(me.data_cell).hover(function(){
            
            $(this).find('>'+ me.data_target).stop(true,true).slideDown(300);
                console.log($(this).find('>'+ me.data_target));
              },function(){
                $(this).find('>'+ me.data_target).stop(true,true).slideUp(300);
              })
          break;

        case 'fade':
          me.obj.find(me.data_cell).hover(function(){
      
            $(this).find('>'+ me.data_target).stop(true,true).fadeIn(300);
          },function(){
            $(this).find('>'+ me.data_target).stop(true,true).fadeOut(300);
          })
          break;

        case 'movingLine':

            me.movingLine();

            break;

        case 'movingLine-v':
            me.movingLine();

            break;
        default:
            //n 与 case 1 和 case 2 不同时执行的代码
        }
        // 参数
        // console.log(me.effect);  
    };
    Navigation.prototype.movingLine = function() {
        var me = this;

        if (me.obj.find('.active').length) {
            //初始化焦点
            var pX = me.obj.find('.active').position().left; //当前列坐标
            var pY = me.obj.find('.active').position().top; //当前列坐标
            var pW = me.obj.find('.active').outerWidth(); //当前列宽
            var pH = me.obj.find('.active').outerHeight(); //当前列高
            var pMl = parseInt(me.obj.find('.active').css("margin-left")); //当前列marginleft
            var pIndex = me.obj.find('.active').index(); //当前索引
            me.obj.find('.active').removeClass('move');


            if (me.data_direction == 'h') {
                me.obj.find(".movingLine").stop().animate({
                    'left': pX,
                    'width': pW
                },
                300);
            }

            if (me.data_direction == 'v') {
                me.obj.find(".movingLine").stop().animate({
                    'left': pX,
                    'top': pY + pH,
                    'width': pW
                },
                300);
            }

            // 绑定鼠标事件
            me.obj.find(me.data_cell).each(function(index) {
                var $this = $(this);

                // 鼠标来领
                $this.on('mouseenter',
                function(e) {
                    // 获取导航列基本属性
                    var pX = $(this).position().left; //当前列坐标
                    var pY = $(this).position().top; //当前列坐标
                    var pW = $(this).outerWidth(); //当前列宽
                    var pH = $(this).outerHeight(); //当前列高
                    var pMl = parseInt($(this).css("margin-left")); //当前列marginleft
                    var pIndex = index; //当前索引
                    // 如果当前不是active项
                    if (!$(this).hasClass('active')) {
                        me.obj.find('.active').addClass('move'); //移动中
                    }

                    if (me.data_direction == '' || me.data_direction == 'h') {
                        me.obj.find(".movingLine").stop().animate({
                            'left': pX,
                            'width': pW
                        },
                        300);
                    }

                    if (me.data_direction == 'v') {
                        me.obj.find(".movingLine").stop().animate({
                            'left': pX,
                            'top': pY + pH,
                            'width': pW
                        },
                        300);
                    }
                    // 子菜单
                    $(this).find(me.data_target).stop(true, true).slideDown();
                    // console.log(pX+'/'+pY+'/'+pW+'/'+pH+'/'+pMl+'/'+pIndex);
                })

                $this.on('mouseleave',
                function(e) {
                    // 获取导航列高亮栏目基本属性
                    var pX = me.obj.find('.active').position().left; //当前列坐标
                    var pY = me.obj.find('.active').position().top; //当前列坐标
                    var pW = me.obj.find('.active').outerWidth(); //当前列宽
                    var pH = me.obj.find('.active').outerHeight(); //当前列高
                    var pMl = parseInt(me.obj.find('.active').css("margin-left")); //当前列marginleft
                    var pIndex = me.obj.find('.active').index(); //当前索引
                    me.obj.find('.active').removeClass('move');

                    if (me.data_direction == '' || me.data_direction == 'h') {
                        me.obj.find(".movingLine").stop().animate({
                            'left': pX,
                            'width': pW
                        },
                        300);
                    }
                    if (me.data_direction == 'v') {
                        me.obj.find(".movingLine").stop().animate({
                            'left': pX,
                            'top': pY + pH,
                            'width': pW
                        },
                        300);
                    }

                    // 子菜单
                    $(this).find(me.data_target).stop(true, true).slideUp();

                })
            })

        } else {

            // 绑定鼠标事件
            me.obj.find(me.data_cell).each(function(index) {
                var $this = $(this);
                var movingLine = me.obj.find(".movingLine");
                movingLine.hide();
                // 鼠标来领
                $this.on('mouseenter',
                function(e) {
                    // 获取导航列基本属性
                    var pX = $(this).position().left; //当前列坐标
                    var pY = $(this).position().top; //当前列坐标
                    var pW = $(this).outerWidth(); //当前列宽
                    var pH = $(this).outerHeight(); //当前列高
                    var pMl = parseInt($(this).css("margin-left")); //当前列marginleft
                    var pIndex = index; //当前索引
                    me.obj.find('.active').addClass('move'); //移动中
                    // movingLine.fadeIn(300);
                    if (me.data_direction == '' || me.data_direction == 'h') {
                        movingLine.stop(true, true).fadeIn(300).stop(true, true).animate({
                            'left': pX,
                            'width': pW
                        },
                        300);
                    }

                    if (me.data_direction == 'v') {
                        movingLine.stop(true, true).fadeIn(300).stop(true, true).animate({
                            'left': pX,
                            'top': pY + pH,
                            'width': pW
                        },
                        300);
                    }

                    // console.log(pX+'/'+pY+'/'+pW+'/'+pH+'/'+pMl+'/'+pIndex);
                })
                // 
            })
        }

    }
    Navigation.prototype.sliding = function() {
        var me = this;
        if (me.data_scroll) {
            var pH = me.obj.find(me.data_cell).find('span').outerHeight(); //列高
            me.obj.find(me.data_cell).hover(function() {
                $(this).find('span').stop().animate({
                    'top': -pH
                });
            },
            function() {
                $(this).find('span').stop().animate({
                    'top': 0
                });
            })

        };

        //动态判断是否有子菜单；
        Navigation.prototype.checkSubMenu = function() {
           
            var me = this;

            me.obj.find(me.data_cell).each(function(index) {
                
                // 鼠标来领
                $(this).hover(function(e) {
                      var subWrap = $(this).find(me.data_target),
                          subItem = subWrap.children();
                      if(subWrap.length && subItem.length){
                        $(this).addClass('hasSub');
                      }
                  
                },function(e){
                      // var subWrap = $(this).find(me.data_target),
                      //     subItem = subWrap.children();
                      // if(subWrap.length && subItem.length){
                      //   $(this).removeClass('hasSub');
                      // } 
                      $(this).removeClass('hasSub');                
                })
            })
        }
    };

    $.fn.navigation = function(element, options) {
        //为了链式调用
        return this.each(function() {

            var me = $(this);
            //初始化实例
            var instance = me.attr('role');
            if (instance == 'navigation') {
                instance = new Navigation(me, options);
            }

        })
    }

    /*
    $(window).on('load',function(){
     $('[role="navigation"]').navigation();
    });
    */ 
    $(document).ready(function() {
        // var obj = ;
        $('[role="navigation"]').navigation();
    })

})(jQuery);

/**
 * XBUI列表交互方案
 * @author Wanghao
 * @date:20170320
 * data-cell//触发对象
 * data-toggle//触发效果
 * data-trigger//触发事件
 * data-target//触发目标
 * data-mask//遮罩层
 * mask//遮罩
 */
+ (function($) {

    "use strict";

    //构造函数
      function Datalist(element,options){
        // this.settings = $.extend(true,$.fn.KEFUTU.defaults, options||{});//获取参数
        var me = this;
        me.obj = element; //对象
        me.data_cell = me.obj.data('cell');//触发对象
        me.data_toggle = me.obj.data('toggle');//触发效果
        me.data_trigger = me.obj.data('trigger');//触发事件
        me.data_target = me.obj.data('target');//触发目标
        me.data_mask = me.obj.data('mask');//遮罩
        me.data_direction = me.obj.attr('direction');//线条移动方向

        me.init();

        return element;
      }
      
      //定义初始化函数 在此可以知道你需要增加的特效
      Datalist.prototype.init=function(){
              var me = this;
              
              // 导航交互效果
              if(me.data_toggle =='' || me.data_toggle =='undefined') me.data_toggle = "fade";
              if(me.data_trigger =='' || me.data_trigger =='undefined') me.data_trigger = "mouseover";
              
              me.obj.find(me.data_cell).hover(function(){
                $(this).addClass('on');
              },function(){
                $(this).removeClass('on');
              })

              switch(me.data_toggle)
              {
               
                case 'fade':

                  me.setMask();

                  break;

                case 'custom':
                  

                  break;

                default:
                //n 与 case 1 和 case 2 不同时执行的代码
              }
              // 参数
              // console.log(me.effect);  
      };

      //遮罩
      Datalist.prototype.setMask = function(e,effect){
      
        var me = this;
        me.obj.find(me.data_cell).hover(function(){

          $(this).find(me.data_mask).stop(true,true).fadeIn();

        },function(){

          $(this).find(me.data_mask).stop(true,true).fadeOut();

        })
      };

    $.fn.Datalist = function(element, options) {
        //为了链式调用
        return this.each(function() {
            var me = $(this);
            //初始化实例
            var instance = me.attr('role');
            if (instance == 'datalist') {
                instance = new Datalist(me, options);
            }

        })
    }

    $(document).ready(function() {
        $('[role="datalist"]').Datalist();
    })

})(jQuery);

/**
 * XBUI多选单选控件解决方案
 * 增加自定义属性<data-formControl="radio"> ，checkbox  dropdown input
 * @Author Wanghao
 * @date:20170320
 */
+ (function($) {

    "use strict";

    //构造函数
    function formControl(element, options) {
        // this.settings = $.extend(true,$.fn.KEFUTU.defaults, options||{});//获取参数
        var me = this;
        me.obj = element; //导航对象
        me.data_type = me.obj.data('formControl');
        me.data_cell = me.obj.data('formCell'); //触发对象
        me.init();
        return element;
    }

    //定义初始化插件
    formControl.prototype.init = function() {
        var me = this;

        if (me.data_cell == '' || me.data_toggle == undefined) me.data_cell = '.form-item';

        switch (me.data_type) {

        case 'radio':

            me.radio();

            break;

        case 'checkbox':

            break;

        default:
            //n 与 case 1 和 case 2 不同时执行的代码
        }
    }
    // radio美化
    formControl.prototype.radio = function() {
        var me = this;
        var input_hidden = me.obj.find('input[type=hidden]').eq(0);
        //绑定事件
        me.obj.find(me.data_cell).on('click',
        function() {
            me.obj.find(me.data_cell).removeClass('checked');
            $(this).addClass('checked');
            input_hidden.val($(this).attr('data-value'));
        })

        //高亮
        me.obj.find(me.data_cell + '.checked').click();
    }
    // 析构函数
    $.fn.formControl = function(element, options) {
        //为了链式调用
        return this.each(function() {
            var me = $(this);
            //初始化实例
            var instance = new formControl(me, options);
        })
    }
    //自动绑定事件
    $(document).ready(function() {
        $('[data-formControl]').formControl();
    })

})(jQuery);

/**
 * 幻灯片交互方案  基于http://www.superslide2.com/ 大话主席 改编
 * @author Wanghao
 * @date:20170320
 */
+ (function($) {

    "use strict";

    //构造函数
    function Xbslide(element, options) {
        // this.settings = $.extend(true,$.fn.KEFUTU.defaults, options||{});//获取参数
        var me = this;
        me.obj = element; //导航对象
        me.data_cell = me.obj.attr('data-cell'); //触发对象
        me.data_toggle = me.obj.attr('data-toggle'); //触发效果
        me.data_trigger = me.obj.attr('data-trigger'); //触发事件
        me.data_target = me.obj.attr('data-target'); //触发目标
        me.data_direction = me.obj.attr('data-direction'); //线条移动方向
        me.init();
        return element;
    }

    //定义初始化函数 在此可以知道你需要增加的特效
    Xbslide.prototype.init = function() {
        var me = this;

        // 导航交互效果
        if (me.data_toggle == '' || me.data_toggle == undefined) me.data_toggle = 'slideDown';
        if (me.data_trigger == '' || me.data_trigger == undefined) me.data_trigger = 'mouseover';

        switch (me.data_toggle) {

        case 'fadeIn':
            me.obj.slide({
                mainCell:
                ".bd ul",
                titCell: ".hd ul",
                effect: "fold",
                autoPlay: false,
                autoPage: true,
                trigger: "click",
                mouseOverStop: true,
                interTime: 3500,
                delayTime: 600,
                endFun: function(i, c, s) {}
            });

            break;

        case 'custom':

            break;

        default:
            //n 与 case 1 和 case 2 不同时执行的代码
        }

    }

    $.fn.Xbslide = function(element, options) {
        //为了链式调用
        return this.each(function() {
            var me = $(this);
            //实例
            var instance = me.attr('role');
            if (instance == 'slide') instance = new Xbslide(me, options);

        })
    }

    // $(window).on('load',function(){
    //   // alert();
    //   // obj.navigation({});
    //   var obj = $('[role="navigation"]');
    //   var effect = obj.attr('effect');
    //   obj.navigation();
    // });
    $(document).ready(function() {
        // var obj = ;
        $('[role="slide"]').Xbslide();
    })

})(jQuery);

/**
 * 图片等比例缩放 
 * 使用说明增加data-zoom="true" 
 * 设置宽度高度 data-width="50" 
 * data-height="20" 
 * 插件会在页面下载之后自动运行
 * @data-zoom="true" data-width="50" data-height="20"
 * 
 */
+ (function($) {

    "use strict";
    //构造函数
    function imgZoom(element, options) {
        // this.settings = $.extend(true,$.fn.KEFUTU.defaults, options||{});//获取参数
        var me = this;
        me.obj = element;
        me.data_zoom = me.obj.attr('data-zoom');
        me.data_width = me.obj.attr('data-width'); //触发对象
        me.data_height = me.obj.attr('data-height'); //触发对象
        me.init();
        return element;
    }
    //定义初始化函数 
    imgZoom.prototype.init = function() {
        var me = this;
        if (me.data_zoom) {
            me.DrawImage(me.data_width, me.data_height);
        }
    }
    //重新生成宽度高度 参数(图片,允许的宽度,允许的高度) 
    imgZoom.prototype.DrawImage = function(iwidth, iheight) {
        var me = this;
        var image = new Image();
        image.src = me.obj.attr('src');

        if (image.width > 0 && image.height > 0) {
            if (image.width / image.height >= iwidth / iheight) {
                if (image.width > iwidth) {
                    me.obj.css({
                        'width': iwidth,
                        'height': (image.height * iwidth) / image.width
                    })
                } else {
                    me.obj.css({
                        'width': iwidth,
                        'height': image.height
                    })
                }
            } else {
                if (image.height > iheight) {
                    me.obj.css({
                        'width': (image.width * iheight) / image.height,
                        'height': iheight
                    })
                } else {
                    me.obj.css({
                        'width': image.width,
                        'height': image.height
                    })
                }
            }
        }

    }

    // 注册成为jq插件
    $.fn.imgZoom = function(element, options) {
        //为了链式调用
        return this.each(function() {
            var me = $(this);
            //实例
            var instance = me.attr('data-zoom');
            if (instance == 'true') instance = new imgZoom(me, options);
        })
    }
    // 
    $(window).on('load',function() {
        $('[data-zoom]').imgZoom();
    })

})(jQuery);

/*基于layui组件
 *layui图片缓加载
 */
+ (function($) {

    "use strict";
    if (typeof (layui) === 'undefined') {
        throw new Error('需要加载layui');
        return false;
    }

    $(document).ready(function(){
        layui.use(['flow'], function(){
            var flow = layui.flow;
            flow.lazyimg(); 
        });
    })

})(jQuery);


/*禁止页面元素拖拽时新窗口打开
 *基于JQuery
 *date：2017-06-06
 *by:WH
 */
+ (function($) {

    "use strict";

    function myBrowser(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Opera"
        }; 
        //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } 
        //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
          return "Chrome";
         }
        if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } 
        //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }; 
        //判断是否IE浏览器
    }

    function releaseDrag (element,options){
        var me =  this;
        me.settings = $.extend(true,$.fn.releDrag.defaults, options||{});//获取参数
        me.element = element;//保存对象
        me.init();
    }

    releaseDrag.prototype.init = function(){

        var me = this;
        var $img = me.element;
        var moving = function(event){
          //do something
        }

        // IE下需要在document的mousemove里面取消默认事件;要用原生JS的事件不能用JQuery
        if ('IE' == myBrowser()) {
            document.onmousemove = function(e){
              var ev = e || event;
              ev.cancelBubble=true;
              ev.returnValue = false;
            }
        }

        $img.mousedown(function(event){
          //FF下需要在mousedown取消默认操作;
          event.preventDefault();
          event.stopPropagation();
          $(this).bind("mousemove",moving);    
        })
    }

    $.fn.releDrag = function(options){
       
        return this.each(function(){var me = $(this),instance = new releaseDrag(me,options);})
    }

    //默认参数配置
    $.fn.releDrag.defaults={
        dataTarget:'img',
    }

    $(document).ready(function(){
       $('img').releDrag();
    })
})(jQuery);



/**
 * @license 
 * jQuery Tools @VERSION Tabs- The basics of UI design.
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * http://flowplayer.org/tools/tabs/
 * Since: November 2008
 * Date: @DATE 
 */ 
+(function($){$.tools=$.tools||{version:'@VERSION'};$.tools.tabs={conf:{tabs:'a',current:'current',onBeforeClick:null,onClick:null,effect:'default',initialEffect:false,initialIndex:0,event:'click',rotate:false,slideUpSpeed:400,slideDownSpeed:400,history:false},addEffect:function(name,fn){effects[name]=fn}};var effects={'default':function(i,done){this.getPanes().hide().eq(i).show();done.call()},fade:function(i,done){var conf=this.getConf(),speed=conf.fadeOutSpeed,panes=this.getPanes();if(speed){panes.fadeOut(speed)}else{panes.hide()}panes.eq(i).fadeIn(conf.fadeInSpeed,done)},slide:function(i,done){var conf=this.getConf();this.getPanes().slideUp(conf.slideUpSpeed);this.getPanes().eq(i).slideDown(conf.slideDownSpeed,done)},ajax:function(i,done){this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"),done)}};var animating,w;$.tools.tabs.addEffect("horizontal",function(i,done){if(animating)return;var nextPane=this.getPanes().eq(i),currentPane=this.getCurrentPane();w||(w=this.getPanes().eq(0).width());animating=true;nextPane.show();currentPane.animate({width:0},{step:function(now){nextPane.css("width",w-now)},complete:function(){$(this).hide();done.call();animating=false}});if(!currentPane.length){done.call();animating=false}});function Tabs(root,paneSelector,conf){var self=this,trigger=root.add(this),tabs=root.find(conf.tabs),panes=paneSelector.jquery?paneSelector:root.children(paneSelector),current;if(!tabs.length){tabs=root.children()}if(!panes.length){panes=root.parent().find(paneSelector)}if(!panes.length){panes=$(paneSelector)}$.extend(this,{click:function(i,e){var tab=tabs.eq(i),firstRender=!root.data('tabs');if(typeof i=='string'&&i.replace("#","")){tab=tabs.filter("[href*=\""+i.replace("#","")+"\"]");i=Math.max(tabs.index(tab),0)}if(conf.rotate){var last=tabs.length-1;if(i<0){return self.click(last,e)}if(i>last){return self.click(0,e)}}if(!tab.length){if(current>=0){return self}i=conf.initialIndex;tab=tabs.eq(i)}if(i===current){return self}e=e||$.Event();e.type="onBeforeClick";trigger.trigger(e,[i]);if(e.isDefaultPrevented()){return}var effect=firstRender?conf.initialEffect&&conf.effect||'default':conf.effect;effects[effect].call(self,i,function(){current=i;e.type="onClick";trigger.trigger(e,[i])});tabs.removeClass(conf.current);tab.addClass(conf.current);return self},getConf:function(){return conf},getTabs:function(){return tabs},getPanes:function(){return panes},getCurrentPane:function(){return panes.eq(current)},getCurrentTab:function(){return tabs.eq(current)},getIndex:function(){return current},next:function(){return self.click(current+1)},prev:function(){return self.click(current-1)},destroy:function(){tabs.off(conf.event).removeClass(conf.current);panes.find("a[href^=\"#\"]").off("click.T");return self}});$.each("onBeforeClick,onClick".split(","),function(i,name){if($.isFunction(conf[name])){$(self).on(name,conf[name])}self[name]=function(fn){if(fn){$(self).on(name,fn)}return self}});if(conf.history&&$.fn.history){$.tools.history.init(tabs);conf.event='history'}tabs.each(function(i){$(this).on(conf.event,function(e){self.click(i,e);return e.preventDefault()})});panes.find("a[href^=\"#\"]").on("click.T",function(e){self.click($(this).attr("href"),e)});if(location.hash&&conf.tabs=="a"&&root.find("[href=\""+location.hash+"\"]").length){self.click(location.hash)}else{if(conf.initialIndex===0||conf.initialIndex>0){self.click(conf.initialIndex)}}}$.fn.tabs=function(paneSelector,conf){var el=this.data("tabs");if(el){el.destroy();this.removeData("tabs")}if($.isFunction(conf)){conf={onBeforeClick:conf}}conf=$.extend({},$.tools.tabs.conf,conf);this.each(function(){el=new Tabs($(this),paneSelector,conf);$(this).data("tabs",el)});return conf.api?el:this}})(jQuery);