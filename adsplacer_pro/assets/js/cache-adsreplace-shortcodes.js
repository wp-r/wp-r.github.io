if(typeof AdsplacerProNeedToGetShortcodes === 'undefined'){
    function AdsplacerProNeedToGetShortcodes() {
        return !!$('html').html().match( /<sc>[a-z0-9-]*<\/sc>/g );
        // return !!jQuery('noindex[data-shortcode]').length;
    }
}
if(typeof AdsplacerProFindComments === 'undefined'){
    var AdsplacerProFindComments = function(el) {
        var arr = [];
        for(var i = 0; i < el.childNodes.length; i++) {
            var node = el.childNodes[i];
            if(node.nodeType === 8) {
                arr.push(node);
            } else {
                arr.push.apply(arr, AdsplacerProFindComments(node));
            }
        }
        return arr;
    };
}
if(typeof AdsplacerProVersionCompare === 'undefined'){
    function AdsplacerProVersionCompare(v1, v2, options) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push("0");
            while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            if (v1parts[i] == v2parts[i]) {
                continue;
            }
            else if (v1parts[i] > v2parts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
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
                    var commentNodes = AdsplacerProFindComments(document);
                    for (var number in shortcodes) {
                        if (!shortcodes.hasOwnProperty(number)) continue;
                        if(AdsplacerProVersionCompare(adsplacerProVersion, '2.8.0') >= 0){
                            commentNodes.forEach(function(node){
                                if(node.nodeValue === '<sc>adsp-pro-' + number + '</sc>'){
                                    jQuery(node).replaceWith(shortcodes[number]);
                                }
                            });
                        }
                        else {
                            jQuery('noindex[data-shortcode=adsp-pro-' + number + ']').replaceWith(shortcodes[number]);
                        }
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
                        var commentNodes = AdsplacerProFindComments(document);
                        for (var number in shortcodes) {
                            if (!shortcodes.hasOwnProperty(number)) continue;
                            if(AdsplacerProVersionCompare(adsplacerProVersion, '2.8.0') >= 0) {
                                commentNodes.forEach(function (node) {
                                    if (node.nodeValue === '<sc>adsp-pro-' + number + '</sc>') {
                                        jQuery(node).replaceWith(shortcodes[number]);
                                    }
                                });
                            }
                            else {
                                jQuery('noindex[data-shortcode=adsp-pro-' + number + ']').replaceWith(shortcodes[number]);
                            }
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