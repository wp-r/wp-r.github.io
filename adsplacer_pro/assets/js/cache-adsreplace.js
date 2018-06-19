if(typeof AdsplacerProReadCookie === 'undefined') {
    function AdsplacerProReadCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}
jQuery(document).ready(function(){
    jQuery.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: {
            action: 'adsplacer_pro_get_ads',
            referrer : AdsplacerProReadCookie('adsplacerProReferrer'),
            id : adsplacerProPostId
        },
        type: 'POST',
        success: function(data) {
            var beforeContent = data.before;
            var afterContent = data.after;
            var insideContent = data.inside;
            for (var tag in insideContent) {
                if (!insideContent.hasOwnProperty(tag)) continue;
                for (var tagNumber in insideContent[tag]) {
                    if (!insideContent[tag].hasOwnProperty(tagNumber)) continue;
                    if(tagNumber == 'quarter'){
                        jQuery('[data-tag="' + tag + '"][data-firstquad=1]').replaceWith(insideContent[tag][tagNumber]);
                    }
                    else if(tagNumber == 'center') {
                        jQuery('[data-tag="' + tag + '"][data-center=1]').replaceWith(insideContent[tag][tagNumber]);
                    }
                    else if(tagNumber == 'three_quads'){
                        jQuery('[data-tag="' + tag + '"][data-thirdquad=1]').replaceWith(insideContent[tag][tagNumber]);
                    }
                    else {
                        jQuery('[data-tag="' + tag + '"][data-number=' + tagNumber + ']').replaceWith(insideContent[tag][tagNumber]);
                    }
                }

            }
            jQuery('[data-position=before]').replaceWith(beforeContent);
            jQuery('[data-position=after]').replaceWith(afterContent);
            jQuery('[data-plugin=adsplacer_pro]').remove();
            adsplacerTrackIframeClick();
            adsplacerTrackAdClick();
            adsplacerInitExternalScripts();
            var ads = jQuery('.adsplaser_pro_abtest');
            for(var i = 0; i < ads.length; i++){
                adsplacerViewAd(ads[i]);
            }
        },
        dataType: 'json'
    });
});
jQuery(document).ready(function(){
    jQuery(window).scroll(function(){
        if (window.adsplacerScrollTimeout) clearTimeout(window.adsplacerScrollTimeout);
        window.adsplacerScrollTimeout = setTimeout(function(){
            var ads = jQuery('.adsplaser_pro_abtest');
            for(var i = 0; i < ads.length; i++){
                adsplacerViewAd(ads[i]);
            }
        }, 500);
    });
});