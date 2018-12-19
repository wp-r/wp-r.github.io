jQuery(document).ready(function($) {
	setTimeout(function() {
		var ad = document.querySelector("ins[data-ad-client]");
		if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
			if(!adsplacerProAdblockFirstOnly){
				var selector = jQuery("ins[data-ad-client]");
				selector.prop('style', 'display:block!important;visibility:visible!important;');
				selector.html(adsplacerProAdblockMessage.message);
				selector.removeClass('adsbygoogle');
				selector.css({'text-decoration' : 'none'});
			}
		}
	}, adsplacerProAdblockAppearTime * 1000);


	setTimeout(function() { //Яндекс Директ
		var ad = jQuery("div").filter(function() {
			return this.id.match(/(yandex_rtb_R-A|yandex_ad)/);
		});
		if (ad.length && ad.html().replace(/\s/g, "").length == 0) {
			if(!adsplacerProAdblockFirstOnly){
				var selector = jQuery("div").filter(function() {
					return this.id.match(/(yandex_rtb_R-A|yandex_ad)/);
				});
				selector.prop('style', 'display:block!important;visibility:visible!important;');
				selector.html(adsplacerProAdblockMessage.message);
			}
		}
	}, adsplacerProAdblockAppearTime * 1000);

	setTimeout(function(){
		if(adsplacerProAdblockFirstOnly){
			var selector = jQuery("ins[data-ad-client]").first();
			var selector2 = jQuery("div").filter(function() {
				return this.id.match(/(yandex_rtb_R-A|yandex_ad)/);
			}).first();
			if(
				(
					(selector.length == 1 && selector2.length == 0) ||
					(selector.length == 1 && selector2.length == 1 && selector.position().top > selector2.position().top)
				) && selector.html().replace(/\s/g, "").replace(/&nbsp;/g, "").length == 0
			)
			{
				selector.prop('style', 'display:block!important;visibility:visible!important;');
				selector.html(adsplacerProAdblockMessage.message);
				selector.removeClass('adsbygoogle');
				selector.css({'text-decoration' : 'none'});
			}
			else {
				if(selector2.length > 0 && selector2.html().replace(/\s/g, "").replace(/&nbsp;/g, "").length == 0){
					selector2.prop('style', 'display:block!important;visibility:visible!important;');
					selector2.html(adsplacerProAdblockMessage.message);
				}
			}
		}
	}, adsplacerProAdblockAppearTime * 1000);
});