# javasccript 一些常用函数
==================

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

### 格式化输出，比如 100000000 => 100,000,000

    var formatNumber =  function (n){
        var b=parseInt(n).toString();
        var len=b.length;
        if(len<=3){return b;}
        var r=len%3;
        return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
    }

    var commafy = function (num){  
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

### 随机数

	var random = function(a,b){
        return a + Math.random()*(b-a);
    }