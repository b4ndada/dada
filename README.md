## yuicompressor压缩js css配置批处理

 ```
 * yuicompressor 需配置java 环境
 * type为文件类型
 * o 为输出文件
 * 可保存为批处理文件a.bat
 * 下载地址: http://yui.github.io/yuicompressor/
 *  java -jar "yuicompressor.jar"  --charset utf-8 --type css css.css -o css-min.css
```

##  CSS 技巧
* css文字溢出 ...
    ```css
        {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;
            word-break:keep-all;
        }
    ```
* ie 6 7 在使用滤镜后 文字不清晰, 添加背景颜色可以解决
* IE6 下图片缩小失真bug 变得很模糊 出现锯齿
    *  一、处理符合大小的图片
    *  二、引入命名空间
        ```html
            <html xmlns:v="urn:schemas-microsoft-com:vml">
              <style type="text/css">
                v\:image{ behavior: url(#default#VML); width:900px;height:200px;}
              </style>
            <v:image src="1.jpg"/>
           <style>
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
           </style>
        ```
	* IE7
	```
	-ms-interpolation-mode:bicubic 
	```
	
## js常用函数
* 深拷贝js代码
```js
   function merge() {
       var i, args = arguments, len, ret = {},
           doCopy = function (copy, original) {
               var value, key;
               // An object is replacing a primitive
               if (typeof copy !== 'object') {
                   copy = {};
               }
   
               for (key in original) {
                   if (original.hasOwnProperty(key)) {
                       value = original[key];
                       // Copy the contents of objects, but not arrays or DOM nodes
                       if (
                           value && typeof value === 'object' &&
                           Object.prototype.toString.call(value) !== '[object Array]' &&
                           key !== 'renderTo' && typeof value.nodeType !== 'number'
                       ) {
                           copy[key] = doCopy(copy[key] || {}, value);
                           // Primitives and arrays are copied over directly
                       } else {
                           copy[key] = original[key];
                       }
                   }
               }
               return copy;
           };
   
       if (args[0] === true) {
           ret = args[1];
           args = Array.prototype.slice.call(args, 2);
       }
   
       len = args.length;
       for (i = 0; i < len; i++) {
           ret = doCopy(ret, args[i]);
       }
       return ret;
   }
```
    
* 格式化输出，比如 100000000 => 100,000,000

    ```js
   var formatNumber = function (n) {
       var b = parseInt(n).toString();
       var len = b.length;
       if (len <= 3) {
           return b;
       }
       var r = len % 3;
       return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
   }
   var commafy = function (num) {
       var decimalPart = '';
       num = num.toString();
   
       if (num.indexOf('.') != -1) {
           decimalPart = '.' + num.split('.')[1];
           num = parseInt(num.split('.')[0]);
       }
       var array = num.toString().split('')， index = -3;
   
       while (array.length + index > 0) {
           array.splice(index, 0, ',');
           index -= 4;
       }
       return array.join('') + decimalPart;
   }  
    ```
* 随机数
```js
    	var random = function (a, b) {
            return a + Math.random() * (b - a);
        }
```
