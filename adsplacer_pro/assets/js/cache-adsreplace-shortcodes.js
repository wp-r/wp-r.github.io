if(typeof AdsplacerProNeedToGetShortcodes === 'undefined'){
    function AdsplacerProNeedToGetShortcodes() {
        return !!jQuery('noindex[data-shortcode]').length;
    }
}
if(typeof adsplacer_show_ads_ajax_timeout == 'undefined' || !adsplacer_show_ads_ajax_timeout){
    jQuery(document).ready(function(){
        if(AdsplacerProNeedToGetShortcodes()){
            if(typeof adsplacerProPostId == 'undefined'){
                var adsplacerProPostId = 0;
            }
            jQuery.ajax({
                url: '/wp-admin/admin-ajax.php',
                data: {
                    action: 'adsplacer_pro_get_ads_shortcode',
                    referrer: AdsplacerProReadCookie('adsplacerProReferrer'),
                    id: adsplacerProPostId
                },
                type: 'POST',
                dataType: 'json',
                success: function (shortcodes) {
                    for (var number in shortcodes) {
                        if (!shortcodes.hasOwnProperty(number)) continue;
                        jQuery('noindex[data-shortcode=adsp-pro-' + number + ']').replaceWith(shortcodes[number]);
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
                if(typeof adsplacerProPostId == 'undefined'){
                    var adsplacerProPostId = 0;
                }
                jQuery.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    data: {
                        action: 'adsplacer_pro_get_ads_shortcode',
                        referrer: AdsplacerProReadCookie('adsplacerProReferrer'),
                        id: adsplacerProPostId
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (shortcodes) {
                        for (var number in shortcodes) {
                            if (!shortcodes.hasOwnProperty(number)) continue;
                            jQuery('noindex[data-shortcode=adsp-pro-' + number + ']').replaceWith(shortcodes[number]);
                        }
                    }
                });
            }
        });
    }, adsplacer_show_ads_ajax_timeout);
}