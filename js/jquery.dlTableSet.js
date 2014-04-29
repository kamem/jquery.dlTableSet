/**
 *	jQuery dlTableSet.
 *	jQuery required.
 *	
 *	* Copyright 2014 (c) kamem
 *	* http://develo.org/
 *	* Licensed Under the MIT.
 *	
 *	Date: 2014.04.29
 *
 * dlを使ったtableでdtが改行しddより高くなってしまうのを揃えてくれるjQuery Plugin 
 *	
 *	@class dlTableSet
 */

(function($,global){

$.fn.dlTableSet = function (options) {
	var $content = this;

	function dlTableSet() {
		$content.each(function() {
			var dd = [],
				dtNum = 0;

			//dt1つに対してのddタグの配列を作る
			$(this).find('> *').each(function(i){
				var isDt = $(this)[0].tagName === 'DT';
				
				$(this).height('auto');
				
				if(isDt) {
					dtNum++;
					dd[dtNum - 1] = [];
				} else {
					dd[dtNum - 1].push($(this));
				};
			});

			$(this).find('> dt').each(function(i){
				var ddHeight = 0,
					ddOverHeight = 0;
					ddOverLength = 0;
					dtHeight = $(this).outerHeight(),
					ddAry = dd[i];
				
				//dt1つに対してのddの高さの合計を求めddHeightに代入
				for(var j = 0; j < ddAry.length; j++) {
					var ddOne = ddAry[j],
					paddingBorderHeight = ddOne.outerHeight() - ddOne.height();
					ddHeight += ddOne.outerHeight();
					if(dtHeight / ddAry.length < ddOne.outerHeight()) {
						ddOverHeight += ddOne.outerHeight();
						ddOverLength++;
					}
				};
				
				//dtよりddの高さが大きい時 ddの高さが足りない分をddに高さを加える
				if(dtHeight > ddHeight) {
					for(var j = 0; j < ddAry.length; j++) {
						var ddOne = ddAry[j],
						paddingBorderHeight = ddOne.outerHeight() - ddOne.height(),
						ddOneHeight = (dtHeight - ddOverHeight) / (ddAry.length - ddOverLength) - paddingBorderHeight;
	
						if(ddOne.height() < ddOneHeight) {
							ddOne.height(ddOneHeight);
						}
					};
				};
			});
		});
	}

	$(window).bind(('orientationchange resize load'), function(){
		dlTableSet();
	});
};

}(jQuery,this));