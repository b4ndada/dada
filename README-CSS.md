# CSS
==================
###	css文字溢出 ...
	{
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space:nowrap;
	    word-break:keep-all;
	    
	}

### ie 6 7 在使用滤镜后 文字不清晰, 添加背景颜色可以解决

###	IE6 下图片缩小失真bug 变得很模糊 出现锯齿
	一、处理符合大小的图片
	二、引入命名空间
	<html xmlns:v="urn:schemas-microsoft-com:vml">
	  <style type="text/css">
	    v\:image{ behavior: url(#default#VML); width:900px;height:200px;}
	  </style>
	<v:image src="1.jpg"/>

	_img{
		max-width:600px;
		height:auto;
		zoom:expression( function(elm)
		{ if (elm.width>600)
		{ var oldVW = elm.width;
		elm.width=600;
		elm.height = elm.height*(600 /oldVW);
		}
		elm.style.zoom = '1'; }
		(this));
	}

	三、IE7
	-ms-interpolation-mode:bicubic 