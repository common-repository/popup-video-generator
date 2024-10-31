// FancyPlayer.js - A spicy mix of FancyBox and Flowplayer

$(document).ready(function() {

	var videoclip;
	var player;
	var vidid;
	var captions;
	var capShow;
	var ccbutShow;
	
	$(".video_link").hover(function(){
		vidid = $(".video_link").index(this);
		videoclip = $(".video_link").eq(vidid).attr("name");
		if ($(".video_link").eq(vidid).hasClass('captions')) {
		captions = $(".video_link").eq(vidid).attr("name")+'.srt';
		capShow = true;
		ccbutShow = { width: 20, height: 15, right: 5, bottom: 32, label: 'SUBS' };
		} else { 
		captions = 'swf/empty.srt';
		capShow = false;
		ccbutShow = null;
		}
	});
	
	$(".video_link").fancybox({
		'hideOnContentClick':false,
		'overlayOpacity' :.8,
		'zoomSpeedIn'    :400,
		'zoomSpeedOut'   :400,
		'easingIn'		 : 'easeOutBack',
		'easingOut'		 : 'easeInBack',
		
		'callbackOnShow' :function(){
			
			if (videoclip == 'image') {				
				
				$("#fancy_right, #fancy_left").css({height:$("#fancy_div").height(), bottom: '0'});
				
			} else {
			
				player = $f("fancy_content",{src: swfplayer, wmode: 'opaque'},{

				plugins: {
				
				captions: { 
					url: swfcaptions, 					 
					// pointer to a content plugin (see below) 
					captionTarget: 'content',
					showCaptions: capShow,
					button: ccbutShow
				}, 
				/* 
					configure a content plugin so that it  
					looks good for showing subtitles 
				*/ 
				content: { 
					url:swfcontent, 
					bottom: 25, 
					height:40, 
					backgroundColor: 'transparent', 
					backgroundGradient: 'none', 
					border: 0, 
					textDecoration: 'outline', 
					style: {  
						body: {  
							fontSize: 16,  
							fontFamily: 'Arial', 
							textAlign: 'center', 
							color: '#ffffff' 
						}  
					}  
				},
				
				controls:  {
					url:swfcontrols
				}

				},
				
				clip:{
					autoPlay:true,
					autoBuffering:true,
					url:videoclip+'',
					bufferLength:5,
					captionUrl: videopath+captions+'', 
					onStart:function(clip){
						var wrap=jQuery(this.getParent());
						var clipwidth = 800;
						var clipheight= 450;
						var pos = $.fn.fancybox.getViewport();
						$("#fancy_outer").css({width:clipwidth+20,height:clipheight+20});
						$("#fancy_outer").css('left', ((clipwidth + 36) > pos[0] ? pos[2] : pos[2] + Math.round((pos[0] - clipwidth	- 36)	/ 2)));
						$("#fancy_outer").css('top',  ((clipheight + 50) > pos[1] ? pos[3] : pos[3] + Math.round((pos[1] - clipheight - 50)	/ 2)));
						$("#fancy_right, #fancy_left").css({height:clipheight-60, bottom: '70px'});
						
					}
				}
				
			});
			
			player.load();
			
			}
			
			$('#fancy_right, #fancy_right_ico').click(function(){
				vidid++;
				videoclip = $(".video_link").eq(vidid).attr("name");
				if ($(".video_link").eq(vidid).hasClass('captions')) {
				captions = $(".video_link").eq(vidid).attr("name")+'.srt';
				capShow = true;
				ccbutShow = { width: 20, height: 15, right: 5, bottom: 32, label: 'CC' };
				} else {
				captions = 'swf/empty.srt';
				capShow = false;
				ccbutShow = null;
				}
			});
			
			$('#fancy_left, #fancy_left_ico').click(function(){
				vidid--;
				videoclip = $(".video_link").eq(vidid).attr("name");
				if ($(".video_link").eq(vidid).hasClass('captions')) {
				captions = $(".video_link").eq(vidid).attr("name")+'.srt';
				capShow = true;
				ccbutShow = { width: 20, height: 15, right: 5, bottom: 32, label: 'SUBS' };
				} else {
				captions = 'swf/empty.srt';
				capShow = false;
				ccbutShow = null;
				}
			});
		},
		'callbackOnClose':function(){
			$("#fancy_content_api").remove();
		}
	});
	
}); 