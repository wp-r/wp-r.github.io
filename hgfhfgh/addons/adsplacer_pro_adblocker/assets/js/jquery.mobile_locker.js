function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if(!newHeight)
            return ;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

function adsplacerProShowContentMobileBlocker()
{
    jQuery('#adsplacer_pro_blocker_ad_container').remove();
    jQuery('#adsplacer_pro_blocker_container>*').unwrap();
    jQuery('#adsplacer_pro_blocker_container').remove();
}

function adsplacerProGoTopMobileBlocker()
{
    top.location.href = '#' + window.firstElement.attr('id');
}
jQuery(document).ready(function(){

    var p = jQuery();
    var current = jQuery('.adplacer_pro_adblock_start_post_content');
    if(current.length){
        do{
            current = current.next();
            if(current.prop('tagName') == 'P'){
                p.push.apply(p, current);
            }
        } while(current.length && jQuery('.adplacer_pro_adblock_end_post_content').length && !current.hasClass('adplacer_pro_adblock_end_post_content'));
    }

    //var p = jQuery('.entry-content p:eq(' + adsplacerProAdblockerParagraph + ')');
    if(jQuery(p[adsplacerProAdblockerParagraph - 1]).length){
        var rect = p[adsplacerProAdblockerParagraph - 1];
        if(adsplacerProAdblockerShowGoTop){
            window.firstElement = jQuery('body>*:visible').first();
            if(typeof window.firstElement.attr('id') === 'undefined' || !window.firstElement.attr('id').length){
                window.firstElement.attr('id', 'adsplacerProAdblockerID');
            }
        }
        var _ADSP_pPosition = (rect.getBoundingClientRect().bottom - (parseInt(jQuery(rect).css('margin-bottom'))) + window.scrollY) + 30;
        jQuery('body>*').wrapAll('<div id="adsplacer_pro_blocker_container" style="height:' + (_ADSP_pPosition) + 'px">');
        var interval = null;
        var _ADSP_Container = jQuery('#adsplacer_pro_blocker_container');
        interval = setInterval(function(){
            _ADSP_Container.height(_ADSP_pPosition);
        }, 50);
        if(adsplacerProAdblockerShowGoTop){
            if(adsplacerProAdblockerSwapButtons){
                _ADSP_Container.after('<div id="adsplacer_pro_blocker_ad_container" style=""><div id="adsplacer_pro_blocker_ad"></div>' +
                    '<span onclick="adsplacerProShowContentMobileBlocker()" id="adsplacer_pro_blocker_ad_button" style="color:' + adsplacerProAdblockerFontColor + ';background: ' + adsplacerProAdblockerButtonColor + ';">' + adsplacerProAdblockerButtonText + '&#8595;</span>' +
                    '<span onclick="adsplacerProGoTopMobileBlocker()" id="adsplacer_pro_blocker_ad_button_top" style="color:' + adsplacerProAdblockerFontColor + ';background: ' + adsplacerProAdblockerButtonColor + ';">Наверх</span>' +
                    '</div>');
            }
            else {
                _ADSP_Container.after('<div id="adsplacer_pro_blocker_ad_container" style=""><div id="adsplacer_pro_blocker_ad"></div>' +
                    '<span onclick="adsplacerProGoTopMobileBlocker()" id="adsplacer_pro_blocker_ad_button_top" style="color:' + adsplacerProAdblockerFontColor + ';background: ' + adsplacerProAdblockerButtonColor + ';">Наверх</span>' +
                    '<span onclick="adsplacerProShowContentMobileBlocker()" id="adsplacer_pro_blocker_ad_button" style="color:' + adsplacerProAdblockerFontColor + ';background: ' + adsplacerProAdblockerButtonColor + ';">' + adsplacerProAdblockerButtonText + '&#8595;</span>' +
                    '</div>');
            }
        }
        else {
            _ADSP_Container.after('<div id="adsplacer_pro_blocker_ad_container" style=""><div id="adsplacer_pro_blocker_ad"></div><span onclick="adsplacerProShowContentMobileBlocker()" id="adsplacer_pro_blocker_ad_button" style="color:' + adsplacerProAdblockerFontColor + ';background: ' + adsplacerProAdblockerButtonColor + ';">' + adsplacerProAdblockerButtonText + '&#8595;</span></div>');
        }
        var ad = jQuery('#adsplacer_pro_blocker_ad');
        ad.html(adsplacerProAdblockerContent.message);
        setTimeout(function(){
            clearInterval(interval);
        }, 8000);
    }
});