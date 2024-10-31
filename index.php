<?php

/*

Plugin Name: PopUp Video Generator

Plugin URI: http://www.justmakemedia.com/news/2010/10/popup-video-generator-wordpress-plugin/

Description: <a href="http://www.justmakemedia.com/news/2010/10/popup-video-generator-wordpress-plugin/">PopUp Video Generator</a> is a plugin for Wordpress that takes your FLV videos and adds an AWESOME popup feature to any text link or image link. This plugin is very easy to use and gives your videos a nice popup feature.

Version: 1.01

Author: Justmake Media

Author URI: http://www.justmakemedia.com/

*/

function popupvideo_plugin_callback($match) {
	
	$domain = get_bloginfo('url');
	
	$tag_parts = substr($match[0], 13, -2); 
	$tag_parts = explode("\" \"", $tag_parts);
	$title = $tag_parts[0];
	$image = $tag_parts[1];
	if($image == '') {
		$image = $title;
	} else {
		$image = '<img src="' . $domain . $tag_parts[1] . '" />';
	}
	$video = $tag_parts[2];
	$popupimage = $domain . $tag_parts[3];
	
	$output = '
	<link href="'.$domain.'/wp-content/plugins/popup-video-generator/css/jquery.fancybox.css" rel="stylesheet" rev="stylesheet" /> 
	<script type="text/javascript" src="'.$domain.'/wp-content/plugins/popup-video-generator/js/jquery-1.4.1.min.js"></script>
	<script type="text/javascript" src="'.$domain.'/wp-content/plugins/popup-video-generator/js/flowplayer-3.2.2.min.js"></script> 
	<script type="text/javascript" src="'.$domain.'/wp-content/plugins/popup-video-generator/js/jquery.fancybox-1.2.1.pack.js"></script> 
	<script type="text/javascript" src="'.$domain.'/wp-content/plugins/popup-video-generator/js/jquery.easing.1.3.js"></script> 
	<script type="text/javascript" src="'.$domain.'/wp-content/plugins/popup-video-generator/js/fancyplayer.js"></script> 
 
	<script type="text/javascript"> 
	var videopath = "'.$domain.'/wp-content/plugins/popup-video-generator/";
	var swfplayer = videopath + "swf/flowplayer-3.2.2.swf";
	var swfcontrols = videopath + "swf/flowplayer.controls-3.2.1.swf";
	var swfcontent = videopath + "swf/flowplayer.content-3.2.0.swf";
	var swfcaptions = videopath + "swf/flowplayer.captions-3.2.1.swf";
	</script>
	
	<a href="'.$popupimage.'" 
    name="'.$domain.$video.'" 
    title="'.$title.'" 
    class="video_link" 
    > 
    '.$image.'
    </a>';
	
	return $output;
	
}

function popupvideo_plugin($content) {
	return (preg_replace_callback("/\[popupvideo ([[:print:]]+)\]/", 'popupvideo_plugin_callback', $content));
}


add_filter('the_content', 'popupvideo_plugin');

?>
