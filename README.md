# TierNav - jQuery Plugin

*Was translated by [http://translate.google.co.jp/](http://translate.google.co.jp/).*

This plugin will generate a simple menu navigation.

## Feature

* It supports multi-stage hierarchy.
* You can view the menu in an upward direction.

## Usage

```javascript
$(function(){
    $('#nav').tiernav({
        // Default Options
        width      : '150px',
        upper      : false,
        fadeIn     : true,        // If false, use the show() function instead.
        fadeOut    : true,        // If false, use the hide() function instead.
        fadeSpeed  : 'fast',
        hoverClass : 'hover',
        nextClass  : 'next',
        nextMark   : true,
        nextText   : '&nbsp;&raquo;',        // "&amp;nbsp;&amp;raquo;"
        margin     : '2px',
        padding    : '5px 10px',
        color      : '#000',
        bgcolor    : '#eee',
        opacity    : 0.7,
        firstClass : 'first',
        interval   : 500          // Monitoring interval of hidden menu. If 0, do not monitor.
    });
});
```

*For more information and demos, please see the [doc.html](https://github.com/miriyau/jquery.tiernav/doc.html).*
