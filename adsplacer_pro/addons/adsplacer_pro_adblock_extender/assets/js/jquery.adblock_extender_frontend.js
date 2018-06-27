jQuery(document).ready(function($) {
    setTimeout(function() {
        var ad = document.querySelector("ins.adsbygoogle");
        if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
            var elements = jQuery("ins.adsbygoogle");
            elements.prop('style', 'display:block!important;');
        }

        var ad2 = jQuery("div").filter(function() {
            return this.id.match(/(yandex_rtb_R-A|yandex_ad)/);
        });
        if (ad2.length && ad2.html().replace(/\s/g, "").length == 0) {
            var elements2 = jQuery("div").filter(function() {
                return this.id.match(/(yandex_rtb_R-A|yandex_ad)/);
            });
            elements2.prop('style', 'display:block!important;');
        }
        if(typeof elements === 'undefined'){
            elements = [];
        }
        if(typeof elements2 === 'undefined'){
            elements2 = [];
        }
        elements = jQuery.merge(elements, elements2);
        if(!elements){
            return;
        }
        elements.sort(function (a,b){
            if (a.getBoundingClientRect().top < b.getBoundingClientRect().top)
                return -1;
            if (a.getBoundingClientRect().top > b.getBoundingClientRect().top)
                return 1;
            return 0;
        });
        if(typeof adsplacerProAdblockExtendMessages[0] !== 'undefined'){
            var standardAd = adsplacerProAdblockExtendMessages[0];
        }
        else {
            var standardAd = '';
        }
        for(var m = 0; m < elements.length; m++){
            if(typeof adsplacerProAdblockExtendMessages[m] !== 'undefined'){
                jQuery(elements[m]).html(adsplacerProAdblockExtendMessages[m]);
            }
            else {
                jQuery(elements[m]).html(standardAd);
            }
            if(jQuery(elements[m]).hasClass('adsbygoogle')){
                jQuery(elements[m]).css({'text-decoration' : 'none'});
                jQuery(elements[m]).removeClass('adsbygoogle');
            }
        }
    }, adsplacerProAdblockAppearTime * 1000);
});