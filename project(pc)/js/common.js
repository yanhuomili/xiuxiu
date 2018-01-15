$(function(){
	//点击logo跳到首页
	$('.logo').click(function(){
		window.location="shouye.html";
	})
	//页面跳转效果
	$('.nav li').click(function(){
		$(this).children().addClass('active').parent().siblings().children().removeClass('active');
	})
	//意见反馈弹框
	$('.opinion').click(function(){
		$('.modalBox').show();
	})
	//字数提示
	$('.cText').get(0).oninput=function(){
		var n=this.value.length;
		var textNum=500-n;
		$('.number').text(textNum);
	}
	//提交
	$('.pub').click(function(){
		var text=$('.cText').val();
		console.log(text);
		var text=$('.cText').val('');
		$('.modalBox').hide();
		$('.tip').show();
	})
	//提示框
	$('.know').click(function(){
		$('.tip').hide();
	})
	
	//加入我们
	$('.joinUs').click(function(){
		window.location="problem.html";
		localStorage.setItem('pageNum',4);
	})

	
	
	index();
	function index(){//首页
		var myswiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: true,
		    autoplay:2000,
		    autoplayDisableOnInteraction:false,//操作后是否停止自动轮播
		    paginationClickable:true,//点击切换
		    pagination: '.swiper-pagination',// 如果需要分页器
		})
	}
	weixiu();//维修页面
	function weixiu(){
		$('.pinpai').nextAll().not('.nextStep').hide();
		$('.problemDetail>ol').hide();
		//品牌选择
		$('.pinpai li').click(function(){
			var that=$(this);
			choose(that);
		})
		//型号选择
		$('.xinghao li').click(function(){
			var that=$(this);
			choose(that);
		})
		//颜色选择
		$('.yanse li').click(function(){
			var that=$(this);
			choose(that)
		})
		function choose(that){//维修选择流程
			console.log(that.parent().parent());
			that.addClass('active').siblings().removeClass('active');//给选中的添加样式
			that.parent().parent().next().find('li').removeClass('active');//下一步的li清除样式
			that.parent().parent().next().show().nextAll().not('.beizhu,.fangan,span').hide().find('li').removeClass('active');
		}
		//故障选择滑动事件
		var timer;
		$('.problemAll ol').hide();
		$('.g').mouseenter(function(){
			var index=$(this).index();
			$(this).addClass('gzActive').siblings().removeClass('gzActive');//鼠标划上显示背景颜色
			clearTimeout(timer);
			index>4?$('.problemAll').css('top','240px'):$('.problemAll').css('top','145px');//显示框定位
			$('.problemAll').show().find('ol').eq(index).show().siblings('ol').hide();//让指定的具体故障显示
			
			
		})
		$('.g').mouseleave(function(){
				var index=$(this).index();
				var that=$(this);
				timer=setTimeout(function(){//移出0.5秒后让具体故障隐藏
					console.log('隐藏')
					$('.problemAll').hide().find('ol').hide();
					that.removeClass('gzActive');//去掉背景颜色
				},500)
			})
		
		
		$('.problemAll').mouseenter(function(){//滑进另一个li时清楚计时器
			clearTimeout(timer);
		})
		$('.problemAll').mouseleave(function(){
			$(this).hide().find('ol').hide();
			$('.g').removeClass('gzActive');//鼠标划出去掉背景颜色
			
		})
		$('.problemAll ol li').mouseenter(function(){
			$(this).addClass('hoverActive');//滑进每个具体故障时添加背景
		})
		$('.problemAll ol li').mouseleave(function(){
			$(this).removeClass('hoverActive');//划出每个具体故障删除背景
		})
		//选择具体的故障
		$('.problemAll').on('click','li',function(){
			var index=$(this).parent().index();
			var val=$('.guzhang ul li').eq(index).text();//一级故障名
			console.log(index,val)
			$(this).toggleClass('active');
			var index=$(this).parent().index();//父级的下标
			var n=0;
			for(var i=0;i<$(this).parent().children().length;i++){
				if($(this).parent().children().eq(i).hasClass('active')){
					n++;
				}
			}
			if(n!=0){
				$('.g').eq(index).addClass('active');
			}else{
				$('.g').eq(index).removeClass('active');
			}
			
			$('.fangan,.beizhu').show();
			
		})
//		
		$('.nextStep').click(function(){
			if($(this).hasClass('active')){
				window.location.href="yuyue.html";
			}
			
		})
						
	}
	yuyue();//预约页面
	function yuyue(){
		$('.dropdown-menu a').click(function(){
			var val=$(this).text();
			$(this).parents('.btn-group').children().find('i').text(val);
		})
		
		var num=60;
		var timer=null;
		$('.send').on('click',function(){
			$('.send').html('<i>'+num+'</i>s后再获取');
			$('.send').addClass('active');
			clearInterval(timer);
			timer=setInterval(function(){
				num--;
				$('.send').html('<i>'+num+'</i>s后再获取');
				if(num==0){
					$('.send').html('验证码');
					$('.send').removeClass('active');
					num=60;
					clearInterval(timer);
				}
			},1000)
			
		})
		
		$('.next').click(function(){
//			window.location.href="tijiao.html";//跳页面
			var time=$('.appointment').attr('data');//预约时间
			
			var pIndex=$('#province10').get(0).selectedIndex;//获取选中省的下标
			var province=$('#province10').get(0).options[pIndex].text;//获取选中省的名字
			var cIndex=$('#city10').get(0).selectedIndex;//获取选中市的下标
			var city=$('#city10').get(0).options[cIndex].text;//获取选中市的名字
			var dIndex=$('#district10').get(0).selectedIndex;//获取选中省的下标
			var district=$('#district10').get(0).options[dIndex].text;//获取选中省的名字
			console.log(time,province,city,district)
		})
		
		
		
		
	}
	
	problem();//常见问题页面
	function problem(){
		$('.sildeBar li').click(function(){
			var index=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('.problemDetail').eq(index).show().siblings('.problemDetail').hide();
		})
		
		
		
		var n=localStorage.getItem('pageNum');
		$('.sildeBar li').eq(n).addClass('active').siblings().removeClass('active');
		$('.problemDetail').eq(n).show().siblings('.problemDetail').hide();
		localStorage.removeItem('pageNum');
		console.log(localStorage.getItem('pageNum'))
	}
	
	forget();//忘记密码
	function forget(){
		var num=60;
		var timer=null;
		$('.get').on('click',function(){
			$('.get').addClass('active');
			$('.get').html('<i>'+num+'</i>s后再获取');
			clearInterval(timer);
			timer=setInterval(function(){
				num--;
				$('.get').html('<i>'+num+'</i>s后再获取');
				if(num==0){
					$('.get').html('验证码');
					$('.get').removeClass('active');
					num=60;
					clearInterval(timer);
				}
			},1000)
			
		})
	}
	
	//订单查询
	order();
	function order(){
		$('.searchBtn').click(function(){
			window.location="showSearch.html";
			var val=$('.phoneNumber').val();
			localStorage.setItem('phoneNumber',val);
		})
	}
	
	showSearch()//订单列表页面
	function showSearch(){
		var val=localStorage.getItem('phoneNumber');
		console.log(val)
		if(val){
			$('.search').focus().val(val);
		}
		
		$('.open').click(function(){
			$(this).children().toggleClass('active');
			if($(this).children().hasClass('active')){
				$(this).parents('dt').next().slideDown();
			}else{
				$(this).parents('dt').next().slideUp();
			}
		})
		
		//已完成删除订单
		$('.finishBtn').click(function(){
			$('.finishDel').show();
		})
		//未完成取消订单
		$('.unfinishBtn').click(function(){
			$('.unfinishDel').show();
		})
		//维修中取消订单
		$('.repairingBtn').click(function(){
			$('.repairingDel').show();
		})
		//选择取消原因
		$('.cancelBox li').click(function(){
			$(this).find('i').addClass('active').parent().siblings().find('i').removeClass('active');
		})
		//重下一单
		$('.again').click(function(){
			alert('sf')
			$(this).parents('.cancelBox').hide();
		})
		
		//确定按钮
		$('.sure').click(function(){
			$(this).parents('.cancelBox').hide();
		})
		//取消操作
		$('.delete').click(function(){
			$(this).parents('.cancelBox').hide();
		})
	}
	$()
	
	
})