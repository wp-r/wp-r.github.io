jQuery(document).ready(function(){
    var tranparency = adsplacerProMobileTransparency ? 'background: transparent;' : '';
    jQuery('body').append('<div style="' + tranparency + '" id="adsplacer_pro_mobile_popup_container"><div id="adsplacer_pro_mobile_popup_close_button"></div><div id="adsplacer_pro_mobile_popup_centered">' + adsplacerProMobilePopupContent.message + '</div></div>');
    jQuery('#adsplacer_pro_mobile_popup_close_button').on('click', function(){
        jQuery('#adsplacer_pro_mobile_popup_container').remove();
        AdsplacerProSetCookie('adsplacer_pro_mobile_popup_clicked', 1, 1);
    });
});