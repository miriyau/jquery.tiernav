# TierNav - jQuery Plugin

*Was translated by Google.*

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
        nextText   : '&nbsp;&raquo;',
        padding    : '5px 10px',
        bgcolor    : '#eee',
        opacity    : 0.7
    });
});
```

*For more information, please see the [doc.html](https://github.com/miriyau/jquery.tiernav/doc.html).*
