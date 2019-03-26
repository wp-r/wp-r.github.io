// JavaScript Document
(function() {
    tinymce.create('tinymce.plugins.adsplacerPlugin', {
        init : function(ed, url) {

            // Register button and click event
            ed.addButton('adsplacerPlugin', {
                title : adsplacerTinyMceTranslations.buttonTitle,
                image: url + '/icon.png',
                onClick : function(){
                    ed.windowManager.open( {
                        title: adsplacerTinyMceTranslations.title,
                        width: 400,
                        height: 100,
                        body: [
                            {
                                type: 'listbox',
                                name: 'listboxName',
                                label: adsplacerTinyMceTranslations.label,
                                values: tinyMCE.DOM.adsplacerShortcodes
                            }
                        ],
                        onsubmit: function( e ) {
                            ed.insertContent('[' + e.data.listboxName + ']');
                        }
                    });
                }});
        }
    });
    // Register plugin
    tinymce.PluginManager.add('adsplacerPlugin', tinymce.plugins.adsplacerPlugin);
})();
