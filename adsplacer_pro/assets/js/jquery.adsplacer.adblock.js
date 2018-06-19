jQuery(document).ready(function($) {
	setTimeout(function() {
		var ad = document.querySelector("ins.adsbygoogle");
		if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
			if(!adsplacerProAdblockFirstOnly){
				var selector = jQuery("ins.adsbygoogle");
				selector.prop('style', 'display:block!important;');
				selector.html(adsplacerProAdblockMessage.message);
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
				selector.prop('style', 'display:block!important;');
				selector.html(adsplacerProAdblockMessage.message);
			}
		}
	}, adsplacerProAdblockAppearTime * 1000);

	setTimeout(function(){
		if(adsplacerProAdblockFirstOnly){
			var selector = jQuery("ins.adsbygoogle").first();
			var selector2 = jQuery("div").filter(function() {
				return this.id.match(/(yandex_rtb_R-A|yandex_ad)/);
			}).first();
			if(
				(
					(selector.length == 1 && selector2.length == 0) ||
					(selector.length == 1 && selector2.length == 1 && selector.position().top > selector2.position().top)
				) && selector.html().replace(/\s/g, "").length == 0
			)
			{
				selector.prop('style', 'display:block!important;');
				selector.html(adsplacerProAdblockMessage.message);
			}
			else {
				if(selector2.length > 0 && selector2.html().replace(/\s/g, "").length == 0){
					selector2.prop('style', 'display:block!important;');
					selector2.html(adsplacerProAdblockMessage.message);
				}
			}
		}
	}, adsplacerProAdblockAppearTime * 1000);
});