define(["jquery"],function(e){return{isSmallScreen:function(){var t=e(window).width()<=570;return t},isMediumScreen:function(){var t=e(window).width()<=1024;return t},isLargeScreen:function(){var t=e(window).width()>=1025;return t}}});