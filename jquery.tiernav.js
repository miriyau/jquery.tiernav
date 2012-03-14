/*!
 * TierNav - jQuery Plugin
 * https://github.com/miriyau/jquery.tiernav
 *
 * Version: 1.0.4 (2012/03/14)
 * Requires: jQuery v1.3+
 *
 * Copyright ©2012, miriyau
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
;(function($, window, document, undefined){
	
	//var isIE = /*@cc_on!@*/false;
	var isIE = $.browser.msie && $.browser.version < 9;
	var isIE6 = $.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest; // Quote from jquery.fancybox-1.3.4.js.
	
	var pluginName = 'TierNav'.toLowerCase(),
		defaults = {
			width      : '150px',
			upper      : false,
			fadeIn     : true,	// If false, use the show() function instead.
			fadeOut    : true,	// If false, use the hide() function instead.
			fadeSpeed  : 'fast',
			hoverClass : 'hover',
			nextClass  : 'next',
			nextMark   : true,
			nextText   : '&nbsp;&raquo;',	// "&amp;nbsp;&amp;raquo;"
			margin     : '2px',
			padding    : '5px 10px',
			color      : '#000',
			bgcolor    : '#eee',
			opacity    : 0.7,
			firstClass : 'first',
			interval   : 500	// Monitoring interval of hidden menu. If 0, do not monitor.
		};
	var instCount = 0;
	
	function Plugin(element, options){
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}
	
	Plugin.prototype.init = function(){
		
		if (this.element.nodeName.toLowerCase() != 'ul') return;
		
		var $$ = this.options;
		var nav = $(this.element);
		var id = nav.attr('id') || this._name + (++instCount);
		nav.attr('id', id);
		var sid = '#' + id;
		
		nav.find('ul').hide();
		
		var css = [
			sid + ':after { content:"."; display:block; height:0; clear:both; visibility:hidden; }',
			sid + ' { display:inline-block; }',
			sid + ' { display:block; }',
			sid + ' { list-style:none; position:relative; margin:0; padding:0; }',
			sid + ' a { margin-right:' + $$.margin + '; margin-' + ($$.upper ? 'bottom:' : 'top:') + $$.margin + '; }',
			sid + ' ul { list-style:none; width:' + $$.width + '; position:absolute; margin:0; padding:0; }',
			sid + ' li { position:relative; width:' + $$.width + '; float:left; margin:0; padding:0; }',
			sid + ' ul li { float:none; width:inherit; }',
			sid + ' li a { display:block; color:' + $$.color + '; padding:' + $$.padding + '; background-color:' + $$.bgcolor + '}'
		].concat(isIE6 ? [
			sid + ' li { display:inline; }',
			sid + ' ul li { line-height:0; }',
			sid + ' li a { zoom:1; line-height:normal; }'
		] : [
			sid + ' ul li { display:block; }',
			sid + ' li li a { opacity:' + $$.opacity + '; filter:alpha(opacity=' + ($$.opacity * 100) + '); }'
		]).join('\n');
		
		var style = $('<style id="plugin_' + this._name + '_css" type="text/css">' + css + '</style>');
		
		$('head').prepend(style);
		
		// First-tier.
		nav.find('>li').each(function(i, val){
			
			var li = $(this);
			var fcls = $$.firstClass + ' ' + $$.firstClass + i;
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
				
				var ul = li.find('ul:first:not(:animated)');
				if (!ul.length) return;
				
				$$.fadeIn && !isIE ? ul.fadeIn($$.fadeSpeed) : ul.show();
			},
			function(){
				
				var li = $(this);
				li.removeClass(hcls).find('>a').removeClass(hcls);
				
				var ul = li.find('ul:first');
				if (!ul.length) return;
				
				$$.fadeOut && !isIE ? ul.fadeOut($$.fadeSpeed) : ul.hide();
			}
		);
		
		if ($$.interval) {
			setInterval(function(){
				var ul = nav.find('li.' + $$.hoverClass).find('ul:first:not(:visible)');
				if (!ul.length) return;
				
				$$.fadeIn && !isIE ? ul.fadeIn($$.fadeSpeed) : ul.show();
			}, $$.interval);
		}
	};
	
	$.fn[pluginName] = function(options){
		$.extend(options, {selector:this.selector});
		return this.each(function(){
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};
	
})(jQuery, window, document);
