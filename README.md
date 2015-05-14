#前端的的一些技术笔记
==================

###yuicompressor压缩js css配置批处理
- yuicompressor 需配置java 环境
- type为文件类型
- o 为输出文件
- 可保存为批处理文件a.bat
- 下载地址: http://yui.github.io/yuicompressor/</p>
- java -jar "E:\wamp\www\creativejs\source\dcreative\yuicompressor.jar"  --charset utf-8 --type css css-debug.css -o css-min.css

### 深拷贝js代码

	function merge(){
		var i,
			args = arguments,
			len,
			ret = {},
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