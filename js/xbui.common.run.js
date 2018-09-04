/*==============================================

 * js公共库 用于自定义
 * Copyright 2017 xb, Inc. Author WANGHAO 
 * Licensed xiaobingTECH
 */

$(document).ready(function(){

	/*页面控制*/
	;(function($){
        /*
        *页面导航控制
        */ 
        var header = $('.header')//头部
        var header_Height = header.outerHeight();
        var navbarMain_Height = header.find('.navbar-main').outerHeight();
        var win_width = $(window).width(); //浏览器当前窗口可视区域宽度
        var win_height = $(window).height(); //浏览器当前窗口可视区域高度
        var offset =  header_Height//跟随偏移量
        var offsetTop = header_Height-navbarMain_Height //微调偏移量
        var $body = $('body');
        $body.css({'padding-top':header_Height});

        // 事件
        $(window).scroll(function() { 
          var st = $(document).scrollTop();
          if(st>offset){
            header.addClass('xb-mod-header-white');
          }else{
            header.removeClass('xb-mod-header-white');
          }
        });

        $('#nav-main li a').click(function(){
            __this = $(this);
            var myId = __this.attr('href');
            myId = myId.substr(1,myId.length)
            aScroll(myId);
            return false;
        })

        ;(function(){
          // 首页幻灯
          var indexSlide = jQuery("#full-slide"); //首页幻灯
          indexSlide.slide({ 
              mainCell:".bd ul",
              titCell:".hd ul",
              effect:"fold",  
              autoPlay:true,
              autoPage:true, 
              trigger:"click",
              mouseOverStop:true,
              interTime:2000,
              delayTime:600,
              startFun:function(i,c,s){
                  var src = s.find('.bd li').eq(i).data('src');
                  s.find('.bd li').eq(i).css({'background-image':'url('+ src +')'});
              }
          });

        })();



        // tabs 首页
        $("#nav-case-tabsIndex").tabs(".nav-case-tabsContent > div",{event:'mouseover',tab:'div',tabs:'.item',effect: 'default',current:'active',fadeInSpeed:600});


        // 让页面滚动更有趣
        (function(){
            window.sr = ScrollReveal({
            reset: false,
            viewFactor : 0.15,
            duration   : 1000,
            distance   : "10px",
            scale      : 0
          });

          sr.reveal('.xb-module');
          sr.reveal('.footer .footerWrap');
        })()
        

      /**
       * 列表菜单特效
       * @type {[type]}
       */
      var navSide = $("#nav-side");
      navSide.find('dt a').click(function(e){
        me = $(this);
        // 关闭
        me.parents('dl').siblings().removeClass('on').find('dd').slideUp();

        // 打开
        
        if(!me.parents('dl').hasClass('on')){
           me.parents('dl').addClass('on');
           me.parent().siblings('dd').slideDown();
        }else{
          me.parents('dl').removeClass('on');
          me.parent().siblings('dd').slideUp();
        }

        return false;
      })

        /**
         * Author MR wanghao 2016-06-02
         * 滑动跳转构造函数
         */
        function aScroll(id,event) {
            var h = $('#' + id).offset().top -header_Height;//- parseInt($('.header').css('height'))-60;
            $("html, body").stop().animate({
                    scrollTop: h + "px"
                },
                {
                    duration: 600,
                    easing: "swing"
                });

            return false;
        }




    })(jQuery)

//end ready
})


































