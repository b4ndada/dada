/**
 *  size 160 * 600 显示2个图片
 *	for vip
 *	author simon
 */

;(function(){
	var _window = window, 
		_document = document,
		_toString = Object.prototype.toString,
		_factoryName,
		_tool;
		_lib = _window['_DMLib'];

	if(!_lib || isObject(_lib)){
		_lib = _window['_DMLib'] = {T:{}};
	}

	if(!_lib['T'] && !isObject(_lib['T'])){
		_tool = _lib['T'] = {};
	}

	_tool = _lib['T'];
	
	// 工具
	_tool.setOption = function(obj,callblack,flag){
		var options = flag ? obj : window["_DMoptions"] || {};
		var result = flag ? [] : {};
		
		for(i in options){
			if(typeof(options[i]) === "object"){
				result[i] = _tool.setOption(options[i],undefined,true);
			}else{
				result[i] = options[i];
			}
    		if(i === "logoImg" && typeof obj["_DMlogo"] !== "undefined"){
    			result[i] = obj["_DMlogo"];
    		};
    		if(typeof obj["_DM"+i] !== "undefined"){
    			result[i] = obj["_DM"+i];
    		};
		}
		if(callblack){
			result = callblack.call(result);
		}
		return result;
	};

	_tool.domReady = ( function () {

		    var isTop, testDiv, scrollIntervalId,
		        isBrowser = typeof _window !== "undefined" && _document,
		        isPageLoaded = !isBrowser,
		        doc = isBrowser ? _document : null,
		        readyCalls = [];
		    function runCallbacks(callbacks) {
		        var i;
		        for (i = 0; i < callbacks.length; i += 1) {
		            callbacks[i](doc);
		        }
		    }
		    function callReady() {
		        var callbacks = readyCalls;

		        if (isPageLoaded) {
		            //Call the DOM ready callbacks
		            if (callbacks.length) {
		                readyCalls = [];
		                runCallbacks(callbacks);
		            }
		        }
		    }
		    /**
		     * Sets the page as loaded.
		     */
		    function pageLoaded() {
		        if (!isPageLoaded) {
		            isPageLoaded = true;
		            if (scrollIntervalId) {
		                clearInterval(scrollIntervalId);
		            }

		            callReady();
		        }
		    }
		    if (isBrowser) {
		        if (_document.addEventListener) {
		            _document.addEventListener("DOMContentLoaded", pageLoaded, false);
		            _window.addEventListener("load", pageLoaded, false);
		        } else if (_window.attachEvent) {
		            _window.attachEvent("onload", pageLoaded);

		            testDiv = _document.createElement('div');
		            try {
		                isTop = _window.frameElement === null;
		            } catch (e) {}

		            if (testDiv.doScroll && isTop && _window.external) {
		                scrollIntervalId = setInterval(function () {
		                    try {
		                        testDiv.doScroll();
		                        pageLoaded();
		                    } catch (e) {}
		                }, 30);
		            }
		        }
		        if (_document.readyState === "complete") {
		            pageLoaded();
		        }
		    }

		    function domReady(callback) {
		        if (isPageLoaded) {
		            callback(doc);
		        } else {
		            readyCalls.push(callback);
		        }
		        return domReady;
		    }
		    // return function handler.
		    return domReady;
	} )();

	/**
    * Checks for translate3d support
    * @return boolean
    * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
    */
	_tool.support3d = function () {
            var el = document.createElement('p'),
                has3d,
                transforms = {
                    'webkitTransform':'-webkit-transform',
                    'OTransform':'-o-transform',
                    'msTransform':'-ms-transform',
                    'MozTransform':'-moz-transform',
                    'transform':'transform'
                };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);
            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }
            document.body.removeChild(el);
            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
    }

	function $(id){
		return document.getElementById(id);
	};
	
	function isObject(obj){
		return _toString.call(obj) === '[object Object]';
	}
	function extend(obj, target) {
		for(var i in obj){
			target[i] = obj[i];
		}
		return target;
	}

	function contains(str, substr){
		return str.indexOf(substr) > -1;
	}

	function addEvent(evnt, elem, func){
		if (elem.addEventListener)  // W3C DOM
	          elem.addEventListener(evnt,func,false);
        else if (elem.attachEvent) { // IE DOM
          elem.attachEvent("on"+evnt, func);
        }
        else { // No much to do
          elem["on"+evnt] = func;
       }
	}
	function removeEvent(evnt,elem,func){
        if (elem.removeEventListener) {
            elem.removeEventListener(evnt, func, false);
        } else if (elem.detachEvent) {
            elem.detachEvent("on" + evnt, func);
        } else {
            elem["on" + evnt] = null;
        }
    }
	function getStyle(obj,attr){
		var a;
		if(!obj) return;
	    if(obj.currentStyle) {
	    	a = obj.currentStyle[attr];
	    }else {
	    	a = getComputedStyle(obj,false)[attr];
	    }
	    return parseFloat(a);
	}

	var defaults = {
		contSize: "rectangle728x90",
		container: "div",
		logoImg: "logo.png",
		logolink: "http://baidu.com",
		playStep: 5000,
		sellsNum:0,
		stopPlay:3e4,
		KlassName:'',
		passport:'\u5168\u573A\u5305\u90AE'
	}

	var Ad = function(settings){
		this.settings = extend(settings,defaults);
		this.currentImg = 0;
		this.playNums = 2;
		this.autoTime = null;
		this.stopPlays = true;
		this.Klass = this.settings.KlassName;
	};

	var Adproto = Ad.prototype;

	Adproto.init = function(){
		var _this = this, _html, _body, _items,
			settings = this.settings;
		
		_this.dataLength = settings['items'].length;

		$element = $(settings['container']);

		if(!$element){
			$element = _document.createElement('div');
			_document.body.appendChild($element);
		}

		var wh = settings['contSize'].match(/\d+/g);
		$element.style.width = (wh[0] - 2) + 'px';
		$element.style.height = (wh[1] - 2) + 'px';

		$element.className = 'dmui recvertical '+ settings['contSize'] + ' ' +this.Klass;
		//业务
		_body = _this.getBoby();

		_items = _this.getItems(settings['items']);
		//console.log(_items);

		_html = _body.replace(/\{logo\}/g,settings['logoImg'])
					 .replace(/\{logolink\}/g,settings['logolink'])
					 .replace(/\{items\}/g,_items);
		
		$element.innerHTML = _html;
		
		_this.$element = $element;
		
		_this.events();	

		_this.invoke(_this.currentImg)

		_this.autoPaly();

		setTimeout(function(){

			_this.stopPlays = false; 
			clearInterval(_this.autoTime);
			_this.autoPaly = function(){};

		}, settings.stopPlay);
	};

	Adproto.getBoby = function(){
		var _html = [];
		_html.push('<div class=\"dmui-content\" style="" target=\"_blank\">');
		_html.push(		'<div class="dmui-logo" style=""><a href="{logolink}"><img src="{logo}" alt="logo" /></a></div>');
		_html.push(		'<div class="dmui-btn dmui-left-btn" title="left">');
		//_html.push(			'<img src="img/left-btn.png" alt="left">');
		_html.push(		'</div>');
		_html.push(		'<ul>{items}</ul>');
		_html.push(		'<div class="dmui-btn dmui-right-btn" title="right">');
		//_html.push(			'<img src="img/right-btn.png" alt="right">');
		_html.push(		'</div>');
		_html.push('</div>');
		
		return _html.join('');
	}

	Adproto.getItems = function(items){
		if(!items) return '';
		var _html = [], 
			_settings = this.settings,
			_len = items.length,
			i = 0;

		for(; i<_len; i++){
			var _title = items[i]["itemInfo"];
			_html.push('<li>');
			_html.push(		'<div class="dmui-img"><a href=\"'+items[i]['linkUrl']+'\" title=\"'+_title+'\" target="_blank"><span></span><img src=\"'+items[i]['mediaSrc']+'\" alt=\"'+_title+'\"></a></div>');
			_html.push(		'<div class="dmui-item">');
			_html.push(			'<div class="dmui-item-content">');
			_html.push(				'<div class="dmui-item-price">\uFFE5'+items[i]['itemPrice']+'</div>');
			_html.push(				'<div class="dmui-item-sells">\u5DF2\u552E'+(items[i]['sellsNum'] || 0)+'\u4EF6</div>');
			_html.push(			'</div>');
			_html.push(			'<div class="dmui-passport"><a href=\"'+items[i]['linkUrl']+'\" target="_blank">'+_settings['passport']+'</a></div>');
			_html.push(		'</div>');
			_html.push('</li>');
		}
		
		return _html.join('');
	}

	Adproto.events = function(){
		var _this = this, 
			$element = _this.$element,
			curimg,
			dataLen;

		curimg  = _this.currentImg;
		dataLen = this.dataLength;
		//左右点击
		addEvent('click',$element, function(e){
			var ev = e || window.event, _classname,
				_tagert = ev.target || ev.srcElement;

				_classname = _tagert.className;

			// 左
			if(contains(_classname,'dmui-left-btn')){
				curimg -=  _this.playNums;
				if (curimg < 0) {
					curimg = dataLen-_this.playNums;
				};
				_this.invoke(curimg);
				_this.preventDefault(ev);
				return false;
			};
			//右
			if(contains(_classname,'dmui-right-btn')){
				curimg +=  _this.playNums;
				if (curimg >= dataLen) {
					curimg = 0;
				};
				_this.invoke(curimg);
				_this.preventDefault(ev);
				return false;
			};

			
		});
		addEvent('mouseover',$element, function(e){
			clearInterval(_this.autoTime);
		});

		addEvent('mouseout',$element, function(e){
			_this.autoPaly();
		});
		addEvent('selectstart',$element, function(e){
			return false;
		});
		
	};

	Adproto.preventDefault = function(ev){

		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			window.event.returnValue  = false;
		}
	 	return false;
	}
	Adproto.resetItme = function(j){
		var $element = this.$element, 
			i = 0,
			_len = 0,
			_li;

		_li = $element.getElementsByTagName('li');

		_len = _li.length;

		for(;i<_len;i++){
			_li[i].style.display = 'none';
			_li[i].style.opacity = 0.01;
		}

	}

	Adproto.animation = function(obj,json,sv,fnEnd){
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var isAllCompleted = true;
			for (attr in json) {
				var attrValue = 0;
				switch (attr) {
					case 'opacity':
						attrValue = Math.round(parseFloat(getStyle(obj, attr)) * 100);
						break;
					default:
						attrValue = parseInt(getStyle(obj, attr));
				}
				var speed = (json[attr] - attrValue) / (sv || 4);
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (attrValue != json[attr]) isAllCompleted = false;
				switch (attr) {
					case 'opacity':
						{
							obj.style.filter = "alpha(opacity=" + (attrValue + speed) + ")";
							obj.style.opacity = (attrValue + speed) / 100;
						};
						break;
					default:
						obj.style[attr] = attrValue + speed + 'px';
				}
			}
			if (isAllCompleted) {
				clearInterval(obj.timer);
				if (fnEnd) fnEnd();
			}
		}, 30);
	}

	Adproto.autoPaly = function(){

		var _this = this, curimg, dataLen;

		curimg  = _this.currentImg;
		dataLen = _this.dataLength;
		_this.autoTime = setInterval(function(){
			curimg +=  _this.playNums;
			if (curimg >= dataLen) {
				curimg = 0;
			};
			_this.invoke(curimg);
		}, _this.settings.playStep);
	}

	Adproto.invoke = function(i){
		var _this = this;

		var $element = _this.$element,
			prefixes = [],
			cssfixes,
			_li, 
			ali,
			playNums;

		this.resetItme(i);

		ali = $element.getElementsByTagName('li');

		playNums = i + _this.playNums;

		prefixes = ['Webkit','Moz','O','ms','Khtml',''];

		for(; i< playNums; i++){

			_li = ali[i];

			if(!_li) {
				continue;
			}
			_li.style.display = 'block';
			_this.animation(_li,{opacity:100});
		}
	}

	_lib.recvertical2 = function(settings){
		var ad = new Ad(settings);
		ad.Klass = '';
		ad.init();
	};

	_lib.recvertical1 = function(settings){

		var A = function(settings){
			settings.KlassName = "recvertical-single";
			Ad.call(this,settings);
			this.playNums = 1;
		}

		A.prototype = new Ad();

		var ad = new A(settings);
		
		ad.init();
	};
})(window);