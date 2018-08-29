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
if(typeof AdsplacerProSetCookie === 'undefined') {
    function AdsplacerProSetCookie(name, value) {
        var date = new Date(),
            expires = 'expires=';
        date.setTime(date.setDate(date.getDate() + 30));
        expires += date.toGMTString();
        document.cookie = name + '=' + value + '; ' + expires + '; path=/';
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
setTimeout(function(){
    jQuery.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: {
            action: 'adsplacer_pro_get_ads',
            referrer : AdsplacerProReadCookie('adsplacerProReferrer'),
            id : adsplacerProPostId
        },
        type: 'POST',
        success: function(data) {
            var commentNodes = AdsplacerProFindComments(document);
            var beforeContent = data.before;
            var afterContent = data.after;
            var insideContent = data.inside;
            for (var tag in insideContent) {
                if (!insideContent.hasOwnProperty(tag)) continue;
                for (var tagNumber in insideContent[tag]) {
                    if (!insideContent[tag].hasOwnProperty(tagNumber)) continue;
                    if(AdsplacerProVersionCompare(adsplacerProVersion, '2.8.0') >= 0){
                        /**
                        [0-9]*,[0,1],1,[0,1],[0,1] -
                        1) номер абзаца,
                        2) центральный,
                        3) первая четверть,
                        4) третья четверть,
                        5) последний
                         */
                        if(tagNumber == 'center') {
                            commentNodes.forEach(function(node){
                                if(node.nodeValue.match('<dt>' + tag + '<\/dt> <dp>[0-9]*,1,[0,1],[0,1],[0,1]<\/dp>')){
                                    jQuery(node).replaceWith(insideContent[tag][tagNumber]);
                                }
                            });
                        }
                        else if(tagNumber == 'quarter'){
                            commentNodes.forEach(function(node){
                                if(node.nodeValue.match('<dt>' + tag + '<\/dt> <dp>[0-9]*,[0,1],1,[0,1],[0,1]<\/dp>')){
                                    jQuery(node).replaceWith(insideContent[tag][tagNumber]);
                                }
                            });
                        }
                        else if(tagNumber == 'three_quads'){
                            commentNodes.forEach(function(node){
                                if(node.nodeValue.match('<dt>' + tag + '<\/dt> <dp>[0-9]*,[0,1],[0,1],1,[0,1]<\/dp>')){
                                    jQuery(node).replaceWith(insideContent[tag][tagNumber]);
                                }
                            });
                        }
                        else if(tagNumber == 'last'){
                            commentNodes.forEach(function(node){
                                if(node.nodeValue.match('<dt>' + tag + '<\/dt> <dp>[0-9]*,[0,1],[0,1],[0,1],1<\/dp>')){
                                    jQuery(node).replaceWith(insideContent[tag][tagNumber]);
                                }
                            });
                        }
                        else {
                            commentNodes.forEach(function(node){
                                if(node.nodeValue.match('<dt>' + tag + '<\/dt> <dp>' + tagNumber + ',[0,1],[0,1],[0,1],[0,1]<\/dp>')){
                                    jQuery(node).replaceWith(insideContent[tag][tagNumber]);
                                }
                            });
                        }
                    }
                    else {
                        if(tagNumber == 'quarter'){
                            jQuery('[data-tag="' + tag + '"][data-firstquad=1]').replaceWith(insideContent[tag][tagNumber]);
                        }
                        else if(tagNumber == 'center') {
                            jQuery('[data-tag="' + tag + '"][data-center=1]').replaceWith(insideContent[tag][tagNumber]);
                        }
                        else if(tagNumber == 'three_quads'){
                            jQuery('[data-tag="' + tag + '"][data-thirdquad=1]').replaceWith(insideContent[tag][tagNumber]);
                        }
                        else if(tagNumber == 'last'){
                            jQuery('[data-tag="' + tag + '"][data-last=1]').replaceWith(insideContent[tag][tagNumber]);
                        }
                        else {
                            jQuery('[data-tag="' + tag + '"][data-number=' + tagNumber + ']').replaceWith(insideContent[tag][tagNumber]);
                        }
                    }
                }

            }
            if(AdsplacerProVersionCompare(adsplacerProVersion, '2.8.0') >= 0){
                commentNodes.forEach(function(node){
                    if(node.nodeValue === '<dp>before</dp>'){
                        console.log(beforeContent);
                        jQuery(node).replaceWith(beforeContent);
                    }
                    if(node.nodeValue === '<dp>after</dp>'){
                        jQuery(node).replaceWith(afterContent);
                    }
                });
            }
            else {
                jQuery('[data-position=before]').replaceWith(beforeContent);
                jQuery('[data-position=after]').replaceWith(afterContent);
                jQuery('[data-plugin=adsplacer_pro]').remove();
            }
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
}, adsplacer_show_ads_ajax_timeout);
setTimeout(function(){
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
}, adsplacer_show_ads_ajax_timeout);