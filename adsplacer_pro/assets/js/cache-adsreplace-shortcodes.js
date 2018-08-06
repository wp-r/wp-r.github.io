if(typeof AdsplacerProNeedToGetShortcodes === 'undefined'){
    function AdsplacerProNeedToGetShortcodes() {
        return !!jQuery('noindex[data-shortcode]').length;
    }
}
if(typeof adsplacer_show_ads_ajax_timeout == 'undefined' || !adsplacer_show_ads_ajax_timeout){
    jQuery(document).ready(function(){
        if(AdsplacerProNeedToGetShortcodes()){
            if(typeof window.adsplacerProPostId == 'undefined'){
                window.adsplacerProPostId = 0;
            }
            jQuery.ajax({
                url: '/wp-admin/admin-ajax.php',
                data: {
                    action: 'adsplacer_pro_get_ads_shortcode',
                    referrer: AdsplacerProReadCookie('adsplacerProReferrer'),
                    id: window.adsplacerProPostId
                },
                type: 'POST',
                dataType: 'json',
                success: function (shortcodes) {
                    for (var number in shortcodes) {
                        if (!shortcodes.hasOwnProperty(number)) continue;
                        jQuery('noindex[data-shortcode=adsp-pro-' + number + ']').replaceWith(shortcodes[number]);
                    }
                    adsplacerTrackIframeClick(true);
                    adsplacerTrackAdClick(true);
                    var ads = jQuery('.adsplaser_pro_abtest[data-shortcode]');
                    for(var i = 0; i < ads.length; i++){
                        adsplacerViewAd(ads[i]);
                    }
                }
            });
        }
    });
}
else {
    setTimeout(function(){
        jQuery(document).ready(function(){
            if(AdsplacerProNeedToGetShortcodes()){
                if(typeof window.adsplacerProPostId == 'undefined'){
                    window.adsplacerProPostId = 0;
                }
                jQuery.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    data: {
                        action: 'adsplacer_pro_get_ads_shortcode',
                        referrer: AdsplacerProReadCookie('adsplacerProReferrer'),
                        id: window.adsplacerProPostId
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (shortcodes) {
                        for (var number in shortcodes) {
                            if (!shortcodes.hasOwnProperty(number)) continue;
                            jQuery('noindex[data-shortcode=adsp-pro-' + number + ']').replaceWith(shortcodes[number]);
                        }
                        adsplacerTrackIframeClick(true);
                        adsplacerTrackAdClick(true);
                        var ads = jQuery('.adsplaser_pro_abtest[data-shortcode]');
                        for(var i = 0; i < ads.length; i++){
                            adsplacerViewAd(ads[i]);
                        }
                    }
                });
            }
        });
    }, adsplacer_show_ads_ajax_timeout);
}
jQuery(document).ready(function(){
    jQuery(window).scroll(function(){
        if (window.adsplacerScrollTimeout) clearTimeout(window.adsplacerScrollTimeout);
        window.adsplacerScrollTimeout = setTimeout(function(){
            var ads = jQuery('.adsplaser_pro_abtest[data-shortcode]');
            for(var i = 0; i < ads.length; i++){
                adsplacerViewAd(ads[i]);
            }
        }, 500);
    });
});