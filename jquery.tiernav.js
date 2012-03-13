/*!
 * TierNav - jQuery Plugin
 * https://github.com/miriyau/jquery.tiernav
 *
 * Version: 1.0.0 (2012/03/09)
 * Requires: jQuery v1.3+
 *
 * Copyright ©2012, miriyau
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
;(function($, window, document, undefined){
	
	var isIE6 = $.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest; // Quote from jquery.fancybox-1.3.4.js.
	
	var pluginName = 'TierNav'.toLowerCase(),
		defaults = {
			width      : '150px',
			upper      : false,
			fadeIn     : true,
			fadeOut    : true,
			fadeSpeed  : 'fast',
			hoverClass : 'hover',
			nextClass  : 'next',
			nextMark   : true,
			nextText   : '&nbsp;&raquo;',
			padding    : '5px 10px',
			bgcolor    : '#eee',
			opacity    : 0.7
		};
	var instCount = 0;
	
	function Plugin(element, options){
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	
	Plugin.prototype.init = function(){
		
		if (this.element.nodeName.toLowerCase() != 'ul') return;
		
		var nav = $(this.element);
		var id = nav.attr('id') || this._name + (++instCount);
		nav.attr('id', id);
		var sid = '#' + id;
		var $$ = this.options;
		
		var css = [
			sid + ':after { content:"."; display:block; height:0; clear:both; visibility:hidden; }',
			sid + ' { display:inline-block; }',
			sid + ' { display:block; }',
			sid + ' { list-style:none; position:relative; margin:0; padding:0; }',
			sid + ' ul { list-style:none; width:' + $$.width + '; position:absolute; margin:0; padding:0; }',
			sid + ' li { position:relative; width:' + $$.width + '; float:left; margin:0; padding:0; }',
			sid + ' ul li { float:none; width:inherit; }',
			sid + ' li a { display:block; padding:' + $$.padding + '; background-color:' + $$.bgcolor + '}'
		].concat(isIE6 ? [
			sid + ' li { display:inline; }',
			sid + ' ul li { line-height:0; }',
			sid + ' li a { zoom:1; line-height:normal; }'
		] : [
			sid + ' ul li { display:block; }',
			sid + ' li a { opacity:' + $$.opacity + '; filter:alpha(opacity=' + ($$.opacity * 10) + '); }'
		]).join('\n');
		
		var style = $('<style id="' + this._name + '-css" type="text/css">' + css + '</style>');
		
		$('head').prepend(style);
		
		// First-tier.
		nav.find('>li').each(function(){
			
			var li = $(this);
			var fcls = id + '1st';
			li.addClass(fcls).find('>a').addClass(fcls);
		});
		
		// Second-tier.
		nav.find('>li>ul').each(function(){
			
			var ul = $(this);
			var li = ul.parent('li');
			var top = $$.upper ? -1* ul.height() : li.height();
			
			ul.css({
				'top': top + 'px'
			});
		});
		
		// Other-tier.
		nav.find('>li>ul').find('ul').each(function(){
			
			var ul = $(this);
			var li = ul.parent('li');
			
			if (isIE6) ul.find('li').css('display','block');
			
			var top = $$.upper ? -1* (ul.height() - li.height()) : 0;
			
			ul.css({
				'top': top + 'px',
				'left': li.position().left + li.width() + 'px'
			});
			
			var a = li.addClass($$.nextClass).find('>a').addClass($$.nextClass);
			if ($$.nextMark) a.append($$.nextText);
		});
		
		var hcls = $$.hoverClass;
		
		nav.find('li').hover(
			function(){
				
				var li = $(this);
				li.addClass(hcls).find('>a').addClass(hcls);
				
				//var ul = li.find('ul:first:not(:animated)');
				var ul = li.find('ul:first');
				if (!ul.length) return;
				
				$$.fadeIn ? ul.fadeIn($$.fadeSpeed) : ul.show();
			},
			function(){
				
				var li = $(this);
				li.removeClass(hcls).find('>a').removeClass(hcls);
				
				var ul = li.find('ul:first');
				if (!ul.length) return;
				
				$$.fadeOut ? ul.fadeOut($$.fadeSpeed) : ul.hide();
			}
		);
		
		nav.find('ul').hide();
	};
	
	$.fn[pluginName] = function(options){
		return this.each(function(){
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
	
})(jQuery, window, document);
